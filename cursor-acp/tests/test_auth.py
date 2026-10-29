from fastapi.testclient import TestClient

from app.config import get_settings
from app.main import app

AUTH = {"Authorization": "Bearer test-bridge-token", "Origin": "https://bergamota.dev"}


def test_health_no_auth():
    with TestClient(app) as client:
        r = client.get("/health")
        assert r.status_code == 200
        body = r.json()
        assert body["status"] == "ok"
        assert "version" in body


def test_missing_token_401():
    with TestClient(app) as client:
        r = client.post("/sessions", headers={"Origin": "https://bergamota.dev"})
        assert r.status_code == 401


def test_bad_token_401():
    with TestClient(app) as client:
        r = client.post(
            "/sessions",
            headers={
                "Authorization": "Bearer wrong",
                "Origin": "https://bergamota.dev",
            },
        )
        assert r.status_code == 401


def test_disallowed_origin_403():
    with TestClient(app) as client:
        r = client.post(
            "/sessions",
            headers={
                "Authorization": "Bearer test-bridge-token",
                "Origin": "https://evil.example",
            },
        )
        assert r.status_code == 403


def test_server_side_no_origin_allowed():
    with TestClient(app) as client:
        r = client.post(
            "/sessions",
            headers={"Authorization": "Bearer test-bridge-token"},
        )
        assert r.status_code == 201
