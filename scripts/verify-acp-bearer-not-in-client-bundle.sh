#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PROBE_VALUE="${VERIFY_ACP_BEARER_PROBE:-cursor-acp-bearer-probe-do-not-ship-9f3a2b1c}"
export ACP_BEARER_TOKEN="$PROBE_VALUE"
export CURSOR_API_KEY="probe-cursor-key-not-real"
export NITRO_PRESET=node-server

npm run build:node

CLIENT_PATHS=(
  ".output/public"
)

for path in "${CLIENT_PATHS[@]}"; do
  if [[ -d "$path" ]] && rg -F --quiet "$PROBE_VALUE" "$path"; then
    echo "FAIL: ACP_BEARER_TOKEN probe value appears in client bundle path: $path" >&2
    exit 1
  fi
done

if [[ -d ".nuxt/dist/client" ]] && rg -F --quiet "$PROBE_VALUE" ".nuxt/dist/client"; then
  echo "FAIL: ACP_BEARER_TOKEN probe value appears in .nuxt/dist/client" >&2
  exit 1
fi

echo "PASS: ACP bearer token not found in client bundle artifacts (.output/public)"
