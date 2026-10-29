import time
from collections import defaultdict
from dataclasses import dataclass, field
from threading import Lock


@dataclass
class RateLimitState:
    ip_windows: dict[str, list[float]] = field(default_factory=lambda: defaultdict(list))
    session_windows: dict[str, list[float]] = field(default_factory=lambda: defaultdict(list))
    global_daily: list[float] = field(default_factory=list)
    global_day_start: float = field(default_factory=time.time)
    lock: Lock = field(default_factory=Lock)


class RateLimiter:
    def __init__(
        self,
        ip_per_minute: int,
        session_per_minute: int,
        global_daily: int,
    ) -> None:
        self.ip_per_minute = ip_per_minute
        self.session_per_minute = session_per_minute
        self.global_daily = global_daily
        self._state = RateLimitState()

    def _prune_window(self, timestamps: list[float], window_sec: float, now: float) -> list[float]:
        cutoff = now - window_sec
        return [t for t in timestamps if t > cutoff]

    def _prune_daily(self, now: float) -> None:
        if now - self._state.global_day_start >= 86400:
            self._state.global_daily.clear()
            self._state.global_day_start = now

    def check(self, ip: str, session_id: str | None = None) -> int | None:
        now = time.time()
        with self._state.lock:
            self._prune_daily(now)
            self._state.global_daily = self._prune_window(self._state.global_daily, 86400, now)
            if len(self._state.global_daily) >= self.global_daily:
                return max(1, int(86400 - (now - self._state.global_day_start)))

            ip_key = ip or "unknown"
            ip_ts = self._prune_window(self._state.ip_windows[ip_key], 60, now)
            self._state.ip_windows[ip_key] = ip_ts
            if len(ip_ts) >= self.ip_per_minute:
                oldest = min(ip_ts)
                return max(1, int(60 - (now - oldest)))

            if session_id:
                s_ts = self._prune_window(self._state.session_windows[session_id], 60, now)
                self._state.session_windows[session_id] = s_ts
                if len(s_ts) >= self.session_per_minute:
                    oldest = min(s_ts)
                    return max(1, int(60 - (now - oldest)))

            self._state.global_daily.append(now)
            self._state.ip_windows[ip_key].append(now)
            if session_id:
                self._state.session_windows[session_id].append(now)
            return None
