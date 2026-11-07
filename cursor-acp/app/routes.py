import asyncio
import json
import logging
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Request, WebSocket, WebSocketDisconnect
from fastapi.responses import JSONResponse, StreamingResponse
from pydantic import BaseModel, Field

from app.auth import authorization_from_websocket_headers, bearer_fingerprint, bearer_valid
from app.config import Settings, get_settings
from app.logging_config import session_id_var
from app.rate_limit import RateLimiter
from app.session_manager import SessionCapacityError, SessionManager

logger = logging.getLogger(__name__)

router = APIRouter()


def client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    if request.client:
        return request.client.host
    return "unknown"


class RateLimitDep:
    def __init__(self, limiter: RateLimiter) -> None:
        self.limiter = limiter

    def check_http(self, request: Request, session_id: str | None = None) -> None:
        fp = getattr(request.state, "bearer_fingerprint", None)
        retry = self.limiter.check(client_ip(request), session_id, fp)
        if retry is not None:
            raise HTTPException(
                status_code=429,
                detail="Rate limit exceeded",
                headers={"Retry-After": str(retry)},
            )


class PromptBody(BaseModel):
    prompt: str = Field(..., min_length=1)
    stream: bool = False


def get_manager(request: Request) -> SessionManager:
    return request.app.state.session_manager


def get_limiter_dep(request: Request) -> RateLimitDep:
    return request.app.state.rate_limit_dep


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@router.post("/sessions")
async def create_session(
    request: Request,
    manager: SessionManager = Depends(get_manager),
    rl: RateLimitDep = Depends(get_limiter_dep),
) -> JSONResponse:
    rl.check_http(request)
    try:
        session = await manager.create_session()
    except SessionCapacityError as exc:
        raise HTTPException(
            status_code=429,
            detail=str(exc),
            headers={"Retry-After": "60"},
        ) from exc
    except Exception as exc:
        logger.exception("create_session_failed", extra={"event": "create_failed"})
        raise HTTPException(status_code=502, detail="Failed to start ACP session") from exc

    return JSONResponse(
        status_code=201,
        content={
            "id": session.bridge_id,
            "acp_session_id": session.acp.acp_session_id,
        },
    )


@router.post("/sessions/{session_id}/prompt")
async def session_prompt(
    session_id: str,
    body: PromptBody,
    request: Request,
    manager: SessionManager = Depends(get_manager),
    rl: RateLimitDep = Depends(get_limiter_dep),
):
    rl.check_http(request, session_id)

    session = await manager.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    session_id_var.set(session_id)
    await manager.touch(session_id)

    logger.info("prompt_received length=%s", len(body.prompt), extra={"event": "prompt"})

    if body.stream:
        return await _stream_prompt(session, body.prompt, manager)

    try:
        async with session.lock:
            result = await session.acp.prompt(body.prompt)
    except Exception as exc:
        logger.exception("prompt_failed", extra={"event": "prompt_failed"})
        raise HTTPException(status_code=502, detail="ACP prompt failed") from exc

    return {"result": result}


async def _stream_prompt(session, prompt: str, manager: SessionManager) -> StreamingResponse:
    queue = manager.subscribe(session)

    async def event_gen():
        task = asyncio.create_task(_run_prompt(session, prompt))
        try:
            while True:
                if task.done() and queue.empty():
                    break
                try:
                    item = await asyncio.wait_for(queue.get(), timeout=0.5)
                except asyncio.TimeoutError:
                    if task.done():
                        break
                    continue
                yield f"data: {json.dumps(item)}\n\n"
            exc = task.exception() if task.done() else None
            if exc:
                yield f"data: {json.dumps({'type': 'error', 'detail': 'prompt failed'})}\n\n"
            else:
                result = task.result()
                yield f"data: {json.dumps({'type': 'done', 'result': result})}\n\n"
        finally:
            manager.unsubscribe(session, queue)

    return StreamingResponse(event_gen(), media_type="text/event-stream")


async def _run_prompt(session, prompt: str) -> Any:
    async with session.lock:
        return await session.acp.prompt(prompt)


@router.delete("/sessions/{session_id}")
async def delete_session(
    session_id: str,
    request: Request,
    manager: SessionManager = Depends(get_manager),
    rl: RateLimitDep = Depends(get_limiter_dep),
):
    rl.check_http(request, session_id)
    session_id_var.set(session_id)
    ok = await manager.destroy_session(session_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Session not found")
    return {"ok": True}


@router.websocket("/sessions/{session_id}/ws")
async def session_ws(
    websocket: WebSocket,
    session_id: str,
    settings: Settings = Depends(get_settings),
):
    auth_header = authorization_from_websocket_headers(websocket.headers)
    if not bearer_valid(auth_header, settings.acp_bearer_token):
        await websocket.close(code=4401, reason="Unauthorized")
        return

    manager: SessionManager = websocket.app.state.session_manager
    limiter: RateLimitDep = websocket.app.state.rate_limit_dep
    ip = websocket.client.host if websocket.client else "unknown"
    fp = bearer_fingerprint(auth_header)
    retry = limiter.limiter.check(ip, session_id, fp)
    if retry is not None:
        await websocket.close(code=4429, reason="Rate limit")
        return

    session = await manager.get_session(session_id)
    if not session:
        await websocket.close(code=4404, reason="Not found")
        return

    await websocket.accept()
    queue = manager.subscribe(session)
    session_id_var.set(session_id)
    try:
        while True:
            item = await queue.get()
            await websocket.send_json(item)
            if item.get("type") == "session/closed":
                break
    except WebSocketDisconnect:
        pass
    finally:
        manager.unsubscribe(session, queue)
        await manager.destroy_session(session_id, reason="ws_disconnect")
