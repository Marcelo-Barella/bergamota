import os
from pathlib import Path

FAKE_ACP = str(Path(__file__).resolve().parent / "fake_acp.py")

os.environ["ACP_BEARER_TOKEN"] = "test-bearer-token"
os.environ["CURSOR_API_KEY"] = "test-cursor-key"
os.environ["ACP_AGENT_COMMAND"] = "python3"
os.environ["ACP_AGENT_ARGS"] = FAKE_ACP
os.environ["SESSION_IDLE_TIMEOUT_SEC"] = "2"
os.environ["SESSION_MAX_LIFETIME_SEC"] = "30"
os.environ["MAX_CONCURRENT_SESSIONS"] = "3"
os.environ["RATE_LIMIT_IP_PER_MINUTE"] = "100"
os.environ["RATE_LIMIT_TOKEN_PER_MINUTE"] = "100"
os.environ["RATE_LIMIT_SESSION_PER_MINUTE"] = "5"
os.environ["RATE_LIMIT_GLOBAL_DAILY"] = "10000"
os.environ["SESSION_WORKDIR_ROOT"] = "/tmp/cursor-acp-test-workdirs"
os.environ["REAPER_INTERVAL_SEC"] = "1"

import pytest


@pytest.fixture(scope="session", autouse=True)
def clear_settings_cache():
    from app.config import get_settings

    get_settings.cache_clear()
    yield
    get_settings.cache_clear()
