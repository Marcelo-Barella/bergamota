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

Vercel preview builds keep `NITRO_PRESET=vercel` (default) and typically run with `ACP_ENABLED` unset.

## TLS reverse proxy

- Caddy: `deploy/Caddyfile.example`
- nginx: `deploy/nginx.conf.example`

## Vercel build (unchanged workflow)

```bash
NITRO_PRESET=vercel npm run build
```
