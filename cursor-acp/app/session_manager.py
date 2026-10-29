import asyncio
import logging
import shutil
import signal
import time
import uuid
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from app.acp_client import AcpProcess
from app.config import Settings

logger = logging.getLogger(__name__)


@dataclass
class BridgeSession:
    bridge_id: str
    workdir: Path
    acp: AcpProcess
    created_at: float = field(default_factory=time.time)
    last_activity: float = field(default_factory=time.time)
    subscribers: list[asyncio.Queue[dict[str, Any]]] = field(default_factory=list)
    lock: asyncio.Lock = field(default_factory=asyncio.Lock)


class SessionManager:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings
        self._sessions: dict[str, BridgeSession] = {}
        self._lock = asyncio.Lock()
        self._reaper_task: asyncio.Task[None] | None = None
        self._shutdown = False
        Path(settings.session_workdir_root).mkdir(parents=True, exist_ok=True)

    async def start(self) -> None:
        self._reaper_task = asyncio.create_task(self._reaper_loop())

    async def shutdown(self) -> None:
        self._shutdown = True
        if self._reaper_task:
            self._reaper_task.cancel()
            try:
                await self._reaper_task
            except asyncio.CancelledError:
                pass
        async with self._lock:
            ids = list(self._sessions.keys())
        for sid in ids:
            await self.destroy_session(sid, reason="shutdown")

    def active_count(self) -> int:
        return len(self._sessions)

    async def create_session(self) -> BridgeSession:
        async with self._lock:
            if len(self._sessions) >= self.settings.max_concurrent_sessions:
                raise SessionCapacityError("Max concurrent sessions reached")

        bridge_id = uuid.uuid4().hex
        workdir = Path(self.settings.session_workdir_root) / bridge_id
        workdir.mkdir(parents=True, exist_ok=False)

        async def on_update(params: dict[str, Any]) -> None:
            session = self._sessions.get(bridge_id)
            if not session:
                return
            session.last_activity = time.time()
            event = {"type": "session/update", "params": params}
            for q in list(session.subscribers):
                try:
                    q.put_nowait(event)
                except asyncio.QueueFull:
                    pass

        acp = AcpProcess(
            argv=self.settings.acp_agent_argv,
            cwd=str(workdir),
            env=AcpProcess.build_env(None, self.settings.cursor_api_key),
            on_update=on_update,
        )
        await acp.start()
        try:
            await acp.bootstrap()
        except Exception:
            await acp.stop()
            shutil.rmtree(workdir, ignore_errors=True)
            raise

        session = BridgeSession(bridge_id=bridge_id, workdir=workdir, acp=acp)
        async with self._lock:
            self._sessions[bridge_id] = session
        logger.info("session_created", extra={"event": "session_created", "session_id": bridge_id})
        return session

    async def get_session(self, bridge_id: str) -> BridgeSession | None:
        return self._sessions.get(bridge_id)

    async def touch(self, bridge_id: str) -> None:
        session = self._sessions.get(bridge_id)
        if session:
            session.last_activity = time.time()

    async def destroy_session(self, bridge_id: str, reason: str = "deleted") -> bool:
        async with self._lock:
            session = self._sessions.pop(bridge_id, None)
        if not session:
            return False
        await session.acp.stop()
        shutil.rmtree(session.workdir, ignore_errors=True)
        for q in session.subscribers:
            try:
                q.put_nowait({"type": "session/closed", "reason": reason})
            except asyncio.QueueFull:
                pass
        logger.info(
            "session_destroyed",
            extra={"event": "session_destroyed", "session_id": bridge_id, "reason": reason},
        )
        return True

    def subscribe(self, session: BridgeSession) -> asyncio.Queue[dict[str, Any]]:
        q: asyncio.Queue[dict[str, Any]] = asyncio.Queue(maxsize=256)
        session.subscribers.append(q)
        return q

    def unsubscribe(self, session: BridgeSession, q: asyncio.Queue[dict[str, Any]]) -> None:
        try:
            session.subscribers.remove(q)
        except ValueError:
            pass

    async def _reaper_loop(self) -> None:
        while not self._shutdown:
            await asyncio.sleep(self.settings.reaper_interval_sec)
            now = time.time()
            to_kill: list[tuple[str, str]] = []
            for sid, session in list(self._sessions.items()):
                idle = now - session.last_activity
                age = now - session.created_at
                if idle >= self.settings.session_idle_timeout_sec:
                    to_kill.append((sid, "idle_timeout"))
                elif age >= self.settings.session_max_lifetime_sec:
                    to_kill.append((sid, "max_lifetime"))
            for sid, reason in to_kill:
                await self.destroy_session(sid, reason=reason)


class SessionCapacityError(Exception):
    pass


def install_sigterm_handler(manager: SessionManager, loop: asyncio.AbstractEventLoop) -> None:
    def handler() -> None:
        asyncio.create_task(manager.shutdown())

    for sig in (signal.SIGTERM, signal.SIGINT):
        try:
            loop.add_signal_handler(sig, handler)
        except (NotImplementedError, RuntimeError, ValueError):
            pass
