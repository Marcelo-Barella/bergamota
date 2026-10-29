import asyncio
import time

import pytest
from fastapi.testclient import TestClient

from app.main import app

AUTH = {"Authorization": "Bearer test-bridge-token", "Origin": "https://bergamota.dev"}


def test_session_lifecycle_prompt_and_delete():
    with TestClient(app) as client:
        r = client.post("/sessions", headers=AUTH)
        assert r.status_code == 201
        body = r.json()
        session_id = body["id"]
        assert body["acp_session_id"] == "fake-acp-session-1"

        r = client.post(
            f"/sessions/{session_id}/prompt",
            headers=AUTH,
            json={"prompt": "Say hello", "stream": False},
        )
        assert r.status_code == 200
        assert r.json()["result"]["stopReason"] == "end_turn"

        r = client.delete(f"/sessions/{session_id}", headers=AUTH)
        assert r.status_code == 200

        r = client.post(
            f"/sessions/{session_id}/prompt",
            headers=AUTH,
            json={"prompt": "nope", "stream": False},
        )
        assert r.status_code == 404


def test_max_concurrent_sessions():
    with TestClient(app) as client:
        from app.config import get_settings

        get_settings().max_concurrent_sessions = 2
        client.app.state.session_manager.settings.max_concurrent_sessions = 2
        ids = []
        for _ in range(2):
            r = client.post("/sessions", headers=AUTH)
            assert r.status_code == 201
            ids.append(r.json()["id"])
        r = client.post("/sessions", headers=AUTH)
        assert r.status_code == 503
        for sid in ids:
            client.delete(f"/sessions/{sid}", headers=AUTH)


@pytest.mark.asyncio
async def test_reaper_idle_timeout():
    from app.config import get_settings
    from app.session_manager import SessionManager

    settings = get_settings()
    settings.session_idle_timeout_sec = 1
    settings.reaper_interval_sec = 1
    manager = SessionManager(settings)
    await manager.start()
    await manager.create_session()
    assert manager.active_count() == 1
    await asyncio.sleep(3.5)
    assert manager.active_count() == 0
    await manager.shutdown()
