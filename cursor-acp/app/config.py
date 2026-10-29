from functools import lru_cache
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    acp_bridge_token: str = Field(..., alias="ACP_BRIDGE_TOKEN")
    cursor_api_key: str = Field(..., alias="CURSOR_API_KEY")

    acp_bridge_host: str = Field(default="127.0.0.1", alias="ACP_BRIDGE_HOST")
    acp_bridge_port: int = Field(default=8000, alias="ACP_BRIDGE_PORT")
    allowed_origins: str = Field(
        default="https://bergamota.dev,https://www.bergamota.dev",
        alias="ALLOWED_ORIGINS",
    )

    session_idle_timeout_sec: int = Field(default=900, alias="SESSION_IDLE_TIMEOUT_SEC")
    session_max_lifetime_sec: int = Field(default=3600, alias="SESSION_MAX_LIFETIME_SEC")
    max_concurrent_sessions: int = Field(default=10, alias="MAX_CONCURRENT_SESSIONS")
    session_workdir_root: str = Field(default="/tmp/cursor-acp-sessions", alias="SESSION_WORKDIR_ROOT")
    reaper_interval_sec: float = Field(default=5.0, alias="REAPER_INTERVAL_SEC")

    rate_limit_ip_per_minute: int = Field(default=60, alias="RATE_LIMIT_IP_PER_MINUTE")
    rate_limit_session_per_minute: int = Field(default=30, alias="RATE_LIMIT_SESSION_PER_MINUTE")
    rate_limit_global_daily: int = Field(default=10000, alias="RATE_LIMIT_GLOBAL_DAILY")

    acp_agent_command: str = Field(default="agent", alias="ACP_AGENT_COMMAND")
    acp_agent_args: str = Field(default="acp", alias="ACP_AGENT_ARGS")

    @property
    def allowed_origin_set(self) -> frozenset[str]:
        return frozenset(o.strip() for o in self.allowed_origins.split(",") if o.strip())

    @property
    def acp_agent_argv(self) -> list[str]:
        parts = [p for p in self.acp_agent_args.split() if p]
        return [self.acp_agent_command, *parts]


@lru_cache
def get_settings() -> Settings:
    return Settings()
