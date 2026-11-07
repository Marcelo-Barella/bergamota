import hashlib
import hmac

from starlette.requests import Request


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


def bearer_valid(authorization: str | None, expected_token: str) -> bool:
    token = extract_bearer_token(authorization)
    if not token:
        return False
    return tokens_equal(expected_token, token)


def bearer_fingerprint(authorization: str | None) -> str | None:
    token = extract_bearer_token(authorization)
    if not token:
        return None
    return hashlib.sha256(token.encode("utf-8")).hexdigest()[:32]


def authorization_from_websocket_headers(headers) -> str | None:
    auth_header = headers.get("authorization")
    if auth_header:
        return auth_header
    proto = headers.get("sec-websocket-protocol")
    if proto and proto.startswith("bearer."):
        return f"Bearer {proto.removeprefix('bearer.')}"
    return None
