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
| `BERGAMOTA_PORT` | Host port mapping | Published port (default `3027`) |
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

```bash
export CURSOR_API_KEY=...   # optional for fallback demos
bash scripts/verify-docker.sh
```

Same checks without Docker (node-server artifact): `bash scripts/verify-routes.sh http://127.0.0.1:3027`

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
