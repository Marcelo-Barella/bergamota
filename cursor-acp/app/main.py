import asyncio
import logging
import time
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request

from app.config import get_settings
from app.logging_config import client_ip_var, configure_logging, new_request_id, request_id_var
from app.rate_limit import RateLimiter
from app.routes import RateLimitDep, client_ip, router
from app.session_manager import SessionManager, install_sigterm_handler

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    manager = SessionManager(settings)
    await manager.start()
    app.state.session_manager = manager
    app.state.rate_limit_dep = RateLimitDep(
        RateLimiter(
            settings.rate_limit_ip_per_minute,
            settings.rate_limit_session_per_minute,
            settings.rate_limit_global_daily,
        )
    )
    loop = asyncio.get_running_loop()
    install_sigterm_handler(manager, loop)
    yield
    await manager.shutdown()


configure_logging()
app = FastAPI(title="Cursor ACP Bridge", version="0.1.0", lifespan=lifespan)
app.include_router(router)


@app.middleware("http")
async def logging_middleware(request: Request, call_next):
    start = time.perf_counter()
    rid = request.headers.get("x-request-id") or new_request_id()
    request_id_var.set(rid)
    client_ip_var.set(client_ip(request))
    response = await call_next(request)
    latency_ms = round((time.perf_counter() - start) * 1000, 2)
    logger.info(
        "http_request",
        extra={
            "event": "http",
            "method": request.method,
            "path": request.url.path,
            "status": response.status_code,
            "latency_ms": latency_ms,
        },
    )
    response.headers["X-Request-Id"] = rid
    return response
