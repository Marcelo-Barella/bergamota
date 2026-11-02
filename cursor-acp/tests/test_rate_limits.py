from fastapi.testclient import TestClient

from app.main import app

AUTH = {"Authorization": "Bearer test-bearer-token"}


def test_session_prompt_rate_limit_429():
    with TestClient(app) as client:
        r = client.post("/sessions", headers=AUTH)
        assert r.status_code == 201
        session_id = r.json()["id"]

        saw_429 = False
        for i in range(12):
            r = client.post(
                f"/sessions/{session_id}/prompt",
                headers=AUTH,
                json={"prompt": f"msg {i}", "stream": False},
            )
            if r.status_code == 429:
                saw_429 = True
                assert r.headers.get("retry-after") or r.headers.get("Retry-After")
                break
        assert saw_429


def test_concurrency_cap_429():
    with TestClient(app) as client:
        client.app.state.session_manager.settings.max_concurrent_sessions = 2
        ids = []
        for _ in range(2):
            r = client.post("/sessions", headers=AUTH)
            assert r.status_code == 201
            ids.append(r.json()["id"])
        r = client.post("/sessions", headers=AUTH)
        assert r.status_code == 429
        assert r.headers.get("retry-after") or r.headers.get("Retry-After")
        for sid in ids:
            client.delete(f"/sessions/{sid}", headers=AUTH)
