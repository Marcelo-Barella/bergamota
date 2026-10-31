# Cursor ACP Gateway (Contabo / production)

HTTP and WebSocket bridge to Cursor CLI ACP (`agent acp`, JSON-RPC 2.0 over newline-delimited stdio). Bind **127.0.0.1 only**; terminate TLS and reverse-proxy with nginx on the host.

## Environment variables

| Variable | Description |
| --- | --- |
| `ACP_BEARER_TOKEN` | Shared bearer secret (Nitro server env only) |
| `CURSOR_API_KEY` | Cursor API key for the `agent acp` subprocess |
| `ACP_BRIDGE_HOST` | Must stay `127.0.0.1` |
| `ACP_BRIDGE_PORT` | Host port published by Compose (default `8000`) |
| `SESSION_IDLE_TIMEOUT_SEC` / `SESSION_MAX_LIFETIME_SEC` | Reaper thresholds |
| `MAX_CONCURRENT_SESSIONS` | Global concurrency cap (`429` when full) |
| `SESSION_WORKDIR_ROOT` | Session scratch directory (tmpfs in Compose) |
| `RATE_LIMIT_*` | Per-IP, per-token, per-session, and daily caps |
| `ACP_AGENT_COMMAND` / `ACP_AGENT_ARGS` | Override ACP command (tests use fake script) |

Copy `.env.example` to `.env` locally. Never log or echo `ACP_BEARER_TOKEN` or `CURSOR_API_KEY`.

## Run locally

```bash
cd cursor-acp
python3 -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
cp .env.example .env
export $(grep -v '^#' .env | xargs)
uvicorn app.main:app --host 127.0.0.1 --port "${ACP_BRIDGE_PORT:-8000}"
```

## Docker Compose (hardened)

```bash
cd cursor-acp
export ACP_BEARER_TOKEN=... CURSOR_API_KEY=...
docker compose up --build
```

- `read_only` root filesystem
- `tmpfs` for `/tmp` and session workdir
- `cap_drop: [ALL]`, `security_opt: no-new-privileges`
- `cpus: 1.0`, `mem_limit: 512m`
- Ports: `127.0.0.1:${ACP_BRIDGE_PORT:-8000}:8000`

## API

- `GET /health` — no auth; `{ "status": "ok" }` only
- All other routes require `Authorization: Bearer <ACP_BEARER_TOKEN>`
- `POST /sessions`, `POST /sessions/{id}/prompt`, `WS /sessions/{id}/ws`, `DELETE /sessions/{id}`

WebSocket disconnect destroys the session and ACP child process.

## Bergamota (Nuxt / Nitro)

Server-only proxy routes (token from `runtimeConfig.acpBearerToken`, never `public`):

- `POST /api/token-optimization/acp/gateway/sessions`
- `POST /api/token-optimization/acp/gateway/sessions/:id/prompt`

Nitro env (runtime process environment on Contabo — **not** Vercel build env, Docker build args, or `nuxt.config`):

- `NUXT_ACP_BEARER_TOKEN` — maps to private `runtimeConfig.acpBearerToken` at runtime only
- `CURSOR_ACP_GATEWAY_URL` (e.g. `http://127.0.0.1:8000`)

The gateway container still uses `ACP_BEARER_TOKEN` (same secret value, server-side only).

Verify the bearer is not baked into Nitro output at build time:

```bash
bash scripts/verify-acp-bearer-not-in-client-bundle.sh
```

## Tests

```bash
cd cursor-acp && pip install -e ".[dev]" && pytest -q
bash scripts/test-auth.sh   # against a running instance
```
