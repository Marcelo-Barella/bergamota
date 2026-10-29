import hmac
import secrets
from starlette.requests import Request
from starlette.responses import JSONResponse

from app.config import Settings


def extract_bearer_token(authorization: str | None) -> str | None:
    if not authorization:
        return None
    parts = authorization.split(None, 1)
    if len(parts) != 2 or parts[0].lower() != "bearer":
        return None
    token = parts[1].strip()
    return token or None


def tokens_equal(expected: str, provided: str) -> bool:
    return hmac.compare_digest(expected.encode("utf-8"), provided.encode("utf-8"))


def origin_allowed(origin: str | None, settings: Settings) -> bool:
    if not origin:
        return True
    return origin in settings.allowed_origin_set


def check_bridge_auth(request: Request, settings: Settings) -> JSONResponse | None:
    origin = request.headers.get("origin")
    if not origin_allowed(origin, settings):
        return JSONResponse(status_code=403, content={"detail": "Origin not allowed"})

    token = extract_bearer_token(request.headers.get("authorization"))
    if not token or not tokens_equal(settings.acp_bridge_token, token):
        return JSONResponse(status_code=401, content={"detail": "Unauthorized"})

    return None


def check_websocket_auth(origin: str | None, authorization: str | None, settings: Settings) -> tuple[int, str] | None:
    if not origin_allowed(origin, settings):
        return 403, "Origin not allowed"
    token = extract_bearer_token(authorization)
    if not token or not tokens_equal(settings.acp_bridge_token, token):
        return 401, "Unauthorized"
    return None
