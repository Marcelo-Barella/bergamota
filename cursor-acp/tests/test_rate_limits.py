from fastapi.testclient import TestClient

from app.main import app

AUTH = {"Authorization": "Bearer test-bridge-token", "Origin": "https://bergamota.dev"}


def test_session_prompt_rate_limit():
    with TestClient(app) as client:
        r = client.post("/sessions", headers=AUTH)
        assert r.status_code == 201
        session_id = r.json()["id"]

        last_status = 200
        for i in range(8):
            r = client.post(
                f"/sessions/{session_id}/prompt",
                headers=AUTH,
                json={"prompt": f"msg {i}", "stream": False},
            )
            last_status = r.status_code
            if r.status_code == 429:
                assert r.headers.get("retry-after") or r.headers.get("Retry-After")
                break
        assert last_status == 429
