import asyncio
import json
import logging
import os
from collections.abc import Awaitable, Callable
from typing import Any

logger = logging.getLogger(__name__)

UpdateHandler = Callable[[dict[str, Any]], Awaitable[None] | None]


class AcpProcess:
    def __init__(
        self,
        argv: list[str],
        cwd: str,
        env: dict[str, str],
        on_update: UpdateHandler | None = None,
    ) -> None:
        self.argv = argv
        self.cwd = cwd
        self.env = env
        self.on_update = on_update
        self._proc: asyncio.subprocess.Process | None = None
        self._reader_task: asyncio.Task[None] | None = None
        self._next_id = 1
        self._pending: dict[int, asyncio.Future[Any]] = {}
        self._closed = False
        self.acp_session_id: str | None = None

    async def start(self) -> None:
        self._proc = await asyncio.create_subprocess_exec(
            *self.argv,
            stdin=asyncio.subprocess.PIPE,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
            cwd=self.cwd,
            env=self.env,
        )
        self._reader_task = asyncio.create_task(self._read_loop())

    async def _read_loop(self) -> None:
        assert self._proc and self._proc.stdout
        while True:
            line = await self._proc.stdout.readline()
            if not line:
                break
            text = line.decode("utf-8", errors="replace").strip()
            if not text:
                continue
            try:
                msg = json.loads(text)
            except json.JSONDecodeError:
                logger.warning("acp_non_json_stdout", extra={"event": "acp_parse_error"})
                continue
            await self._dispatch(msg)

    async def _dispatch(self, msg: dict[str, Any]) -> None:
        if "id" in msg and ("result" in msg or "error" in msg):
            req_id = int(msg["id"])
            fut = self._pending.pop(req_id, None)
            if fut and not fut.done():
                if "error" in msg:
                    fut.set_exception(AcpRpcError(msg["error"]))
                else:
                    fut.set_result(msg.get("result"))
            return

        method = msg.get("method")
        if method == "session/update":
            if self.on_update:
                result = self.on_update(msg.get("params") or {})
                if asyncio.iscoroutine(result):
                    await result
            return

        if method == "session/request_permission" and "id" in msg:
            await self._respond(
                int(msg["id"]),
                {"outcome": {"outcome": "selected", "optionId": "allow-once"}},
            )
            return

        if method == "cursor/ask_question" and "id" in msg:
            await self._respond(
                int(msg["id"]),
                {"outcome": {"outcome": "skipped", "reason": "bridge_auto"}},
            )
            return

        if method == "cursor/create_plan" and "id" in msg:
            await self._respond(int(msg["id"]), {"outcome": {"outcome": "accepted"}})
            return

        if method and method.startswith("cursor/"):
            return

    async def _respond(self, msg_id: int, result: dict[str, Any]) -> None:
        await self._write({"jsonrpc": "2.0", "id": msg_id, "result": result})

    async def _write(self, payload: dict[str, Any]) -> None:
        if self._closed or not self._proc or not self._proc.stdin:
            raise RuntimeError("ACP process not running")
        data = (json.dumps(payload, separators=(",", ":")) + "\n").encode("utf-8")
        self._proc.stdin.write(data)
        await self._proc.stdin.drain()

    async def request(self, method: str, params: dict[str, Any] | None = None) -> Any:
        req_id = self._next_id
        self._next_id += 1
        fut: asyncio.Future[Any] = asyncio.get_running_loop().create_future()
        self._pending[req_id] = fut
        await self._write({"jsonrpc": "2.0", "id": req_id, "method": method, "params": params or {}})
        return await fut

    async def bootstrap(self) -> str:
        await self.request(
            "initialize",
            {
                "protocolVersion": 1,
                "clientCapabilities": {
                    "fs": {"readTextFile": False, "writeTextFile": False},
                    "terminal": False,
                },
                "clientInfo": {"name": "cursor-acp-bridge", "version": "0.1.0"},
            },
        )
        await self.request("authenticate", {"methodId": "cursor_login"})
        result = await self.request("session/new", {"cwd": self.cwd, "mcpServers": []})
        session_id = result.get("sessionId") if isinstance(result, dict) else None
        if not session_id:
            raise RuntimeError("session/new did not return sessionId")
        self.acp_session_id = str(session_id)
        return self.acp_session_id

    async def prompt(self, text: str) -> Any:
        if not self.acp_session_id:
            raise RuntimeError("ACP session not initialized")
        return await self.request(
            "session/prompt",
            {
                "sessionId": self.acp_session_id,
                "prompt": [{"type": "text", "text": text}],
            },
        )

    async def cancel(self) -> None:
        if self.acp_session_id:
            try:
                await self.request("session/cancel", {"sessionId": self.acp_session_id})
            except Exception:
                logger.exception("session_cancel_failed", extra={"event": "cancel_error"})

    async def stop(self) -> None:
        self._closed = True
        if self._proc and self._proc.stdin and not self._proc.stdin.is_closing():
            try:
                self._proc.stdin.close()
            except Exception:
                pass
        if self._proc and self._proc.returncode is None:
            try:
                self._proc.terminate()
                await asyncio.wait_for(self._proc.wait(), timeout=5)
            except asyncio.TimeoutError:
                self._proc.kill()
                await self._proc.wait()
        if self._reader_task:
            self._reader_task.cancel()
            try:
                await self._reader_task
            except asyncio.CancelledError:
                pass

    def build_env(base: dict[str, str] | None, cursor_api_key: str) -> dict[str, str]:
        env = dict(os.environ)
        if base:
            env.update(base)
        env["CURSOR_API_KEY"] = cursor_api_key
        return env


class AcpRpcError(Exception):
    def __init__(self, error: Any) -> None:
        self.error = error
        super().__init__(str(error))
