# Bergamota on Contabo VPS (Docker)

## Build and run

```bash
export CURSOR_API_KEY="..."   # server-side only, never commit
export BERGAMOTA_PORT=3027    # do not use 9885

docker compose build
docker compose up -d
```

Health: `curl -fsS http://127.0.0.1:3027/`

## Environment variables

| Variable | Where | Purpose |
| --- | --- | --- |
| `CURSOR_API_KEY` | VPS / `docker-compose` env | Cursor SDK + `agent acp` auth |
| `ACP_ENABLED` | Container (`true` on VPS) | Long-lived ACP bridge |
| `NITRO_PRESET` | Build + runtime (`node-server`) | Node server instead of Vercel functions |
| `BERGAMOTA_PORT` | Host / `.env` | Published host port (see `.env.example`; required for `verify-docker.sh`) |
| `COMPOSE_PROJECT_NAME` | Host / `.env` | Optional Docker Compose project name (isolates stacks on shared VPS) |
| `PORT` | Container | Internal listen port (`3027`) |
| `TOKEN_LAB_PER_IP_PER_MIN` | Docker | SDK/ACP calls per IP per minute |
| `TOKEN_LAB_GLOBAL_PER_MIN` | Docker | Global SDK/ACP calls per minute |
| `TOKEN_LAB_DAILY_CAP` | Docker | Global daily cap on billed lab routes (`0` = unlimited) |

Vercel preview builds keep `NITRO_PRESET=vercel` (default) and typically run with `ACP_ENABLED` unset.

## TLS reverse proxy

- Caddy: `deploy/Caddyfile.example`
- nginx: `deploy/nginx.conf.example`

SDK/ACP doc verification: `deploy/CURSOR-SDK-ACP.md`

## Container route check

`scripts/verify-docker.sh` reads **`BERGAMOTA_PORT`** and **`COMPOSE_PROJECT_NAME`** from the process environment first, then from **`.env`** in the repo root (existing env vars win). It prints which project name and port it uses, runs `docker compose build` / `up -d`, and hits the same routes as `verify-routes.sh`.

```bash
cp .env.example .env
# edit .env: BERGAMOTA_PORT=3027, optional COMPOSE_PROJECT_NAME=my-stack
export CURSOR_API_KEY=...   # optional for fallback demos
bash scripts/verify-docker.sh
```

Example output:

```text
verify-docker: COMPOSE_PROJECT_NAME=my-stack  BERGAMOTA_PORT=3027  base=http://127.0.0.1:3027
```

Same checks without Docker (node-server artifact), using your port:

```bash
bash scripts/verify-routes.sh "http://127.0.0.1:${BERGAMOTA_PORT}"
```

Routes exercised:

- `/`
- `/token-optimization`
- `/projects/tangerina`
- `/projects/cursor-sync`
- `/projects/cursor-ca-orchestrator`
- `/projects/agentic-browser-ai`
- `GET /api/token-optimization/config`
- `POST /api/token-optimization/run` (smoke)

## Vercel build (unchanged workflow)

```bash
NITRO_PRESET=vercel npm run build
```
