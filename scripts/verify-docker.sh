#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "${ROOT}"

# Load .env without overriding variables already set in the environment.
if [[ -f "${ROOT}/.env" ]]; then
  while IFS= read -r line || [[ -n "${line}" ]]; do
    line="${line#"${line%%[![:space:]]*}"}"
    line="${line%"${line##*[![:space:]]}"}"
    [[ -z "${line}" || "${line}" == \#* ]] && continue
    if [[ "${line}" =~ ^([A-Za-z_][A-Za-z0-9_]*)=(.*)$ ]]; then
      key="${BASH_REMATCH[1]}"
      val="${BASH_REMATCH[2]}"
      val="${val#\"}"
      val="${val%\"}"
      if [[ -z "${!key:-}" ]]; then
        export "${key}=${val}"
      fi
    fi
  done < "${ROOT}/.env"
fi

PORT="${BERGAMOTA_PORT:-}"
if [[ -z "${PORT}" ]]; then
  echo "BERGAMOTA_PORT is unset. Set it in the environment or in ${ROOT}/.env (see deploy/README.md and .env.example)."
  exit 1
fi
if [[ "${PORT}" == "9885" ]]; then
  echo "BERGAMOTA_PORT must not be 9885"
  exit 1
fi

export BERGAMOTA_PORT="${PORT}"
if [[ -n "${COMPOSE_PROJECT_NAME:-}" ]]; then
  export COMPOSE_PROJECT_NAME
  PROJECT_LABEL="${COMPOSE_PROJECT_NAME}"
else
  PROJECT_LABEL="(unset — Docker Compose default for this directory)"
fi

echo "verify-docker: COMPOSE_PROJECT_NAME=${PROJECT_LABEL}  BERGAMOTA_PORT=${PORT}  base=http://127.0.0.1:${PORT}"

docker compose build
docker compose up -d
sleep 8
bash "$(dirname "$0")/verify-routes.sh" "http://127.0.0.1:${PORT}"
echo "Container route verification OK (project=${PROJECT_LABEL}, port=${PORT})"
