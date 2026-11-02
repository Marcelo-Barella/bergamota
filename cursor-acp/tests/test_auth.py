from fastapi.testclient import TestClient
from starlette.websockets import WebSocketDisconnect

import pytest

from app.main import app

AUTH = {"Authorization": "Bearer test-bearer-token"}


def test_health_returns_200_status_only():
    with TestClient(app) as client:
        r = client.get("/health")
        assert r.status_code == 200
        assert r.json() == {"status": "ok"}


def test_unauthenticated_http_401():
    with TestClient(app) as client:
        r = client.post("/sessions")
        assert r.status_code == 401


def test_bad_token_401():
    with TestClient(app) as client:
        r = client.post("/sessions", headers={"Authorization": "Bearer wrong-token"})
        assert r.status_code == 401


def test_authenticated_create_session():
    with TestClient(app) as client:
        r = client.post("/sessions", headers=AUTH)
        assert r.status_code == 201


def test_ws_unauthenticated_rejected():
    with TestClient(app) as client:
        with pytest.raises(WebSocketDisconnect):
            with client.websocket_connect("/sessions/does-not-exist/ws"):
                pass
