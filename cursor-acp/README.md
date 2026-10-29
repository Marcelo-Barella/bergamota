# Cursor ACP Bridge

HTTP and WebSocket bridge from bergamota.dev server-side code to Cursor CLI ACP (`agent acp`, JSON-RPC 2.0 over newline-delimited stdio).

## Environment variables

| Variable | Description |
| --- | --- |
| `ACP_BRIDGE_TOKEN` | Shared bearer secret (held by the Nuxt server only, never in browser code) |
| `CURSOR_API_KEY` | Cursor API key passed to the `agent` subprocess |
| `ACP_BRIDGE_HOST` | Bind address (`127.0.0.1` for local/dev; container uses `0.0.0.0` internally) |
| `ACP_BRIDGE_PORT` | Host port published by Docker Compose (default `8000`) |
| `ALLOWED_ORIGINS` | Comma-separated Origin allowlist (default bergamota.dev hosts) |
| `SESSION_IDLE_TIMEOUT_SEC` | Idle reaper threshold |
| `SESSION_MAX_LIFETIME_SEC` | Max session age before reaper |
| `MAX_CONCURRENT_SESSIONS` | Cap on concurrent ACP subprocesses |
| `SESSION_WORKDIR_ROOT` | Per-session working directories |
| `RATE_LIMIT_IP_PER_MINUTE` | Per-IP limit (authenticated routes) |
| `RATE_LIMIT_SESSION_PER_MINUTE` | Per-bridge-session limit |
| `RATE_LIMIT_GLOBAL_DAILY` | Global daily cap |
| `ACP_AGENT_COMMAND` / `ACP_AGENT_ARGS` | Override ACP command (tests use a fake script) |

Copy `.env.example` to `.env` and fill placeholders. `.env` is gitignored.

## Run locally (uvicorn)

```bash
cd cursor-acp
python3 -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
cp .env.example .env   # edit tokens
export $(grep -v '^#' .env | xargs)
uvicorn app.main:app --host 127.0.0.1 --port "${ACP_BRIDGE_PORT:-8000}"
```

## Run with Docker Compose

```bash
cd cursor-acp
export ACP_BRIDGE_TOKEN=... CURSOR_API_KEY=...
docker compose up --build
```

Published as `127.0.0.1:${ACP_BRIDGE_PORT:-8000}:8000` (localhost only on the host).

## Tests

```bash
cd cursor-acp
pip install -e ".[dev]"
pytest -q
```

Against a running instance (uvicorn or compose):

```bash
export ACP_BRIDGE_TOKEN=... BASE_URL=http://127.0.0.1:8000
bash scripts/test-auth.sh
```

## HTTP API

- `GET /health` — no auth; `{ status, active_sessions, version }`
- `POST /sessions` — create bridge session (spawns one `agent acp`); returns `{ id, acp_session_id }`
- `POST /sessions/{id}/prompt` — JSON `{ "prompt": "...", "stream": false }` or `stream: true` for SSE `session/update` events
- `DELETE /sessions/{id}` — tear down subprocess and workdir
- `WS /sessions/{id}/ws` — JSON events (`session/update`, `session/closed`); send `Authorization: Bearer …` header or `Sec-WebSocket-Protocol: bearer.<token>`

Auth: `Authorization: Bearer <ACP_BRIDGE_TOKEN>`. If `Origin` is sent, it must match `ALLOWED_ORIGINS` (403 otherwise). Missing `Origin` is allowed for server-side calls. Invalid/missing token → 401.

Rate limits return `429` with `Retry-After`.

## Nuxt server integration

Call the bridge only from Nitro/server routes (never expose `ACP_BRIDGE_TOKEN` to the client):

```ts
const bridgeBase = process.env.CURSOR_ACP_BRIDGE_URL ?? 'http://127.0.0.1:8000'
const token = process.env.ACP_BRIDGE_TOKEN!

const session = await $fetch(`${bridgeBase}/sessions`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

await $fetch(`${bridgeBase}/sessions/${session.id}/prompt`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: { prompt: userText, stream: false },
})
```

For live token streaming, open a WebSocket from the server (or proxy SSE from `stream: true`) and forward `session/update` payloads to the UI.

Planned production host: `cursor-acp.bergamota.dev` terminating TLS in front of this service bound on localhost.
