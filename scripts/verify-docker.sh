#!/usr/bin/env bash
set -euo pipefail
PORT="${BERGAMOTA_PORT:-3027}"
if [[ "${PORT}" == "9885" ]]; then
  echo "BERGAMOTA_PORT must not be 9885"
  exit 1
fi
export BERGAMOTA_PORT="${PORT}"
docker compose build
docker compose up -d
sleep 8
bash "$(dirname "$0")/verify-routes.sh" "http://127.0.0.1:${PORT}"
echo "Container route verification OK on port ${PORT}"
