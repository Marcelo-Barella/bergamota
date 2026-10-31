#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

SENTINEL="${NUXT_ACP_BEARER_SENTINEL:-SENTINEL_DO_NOT_SHIP_123}"

unset ACP_BEARER_TOKEN || true
export NUXT_ACP_BEARER_TOKEN="$SENTINEL"
export CURSOR_API_KEY="probe-cursor-key-not-real"
export NITRO_PRESET=node-server

npm run build:node

if [[ ! -d .output ]]; then
  echo "FAIL: .output directory missing after build" >&2
  exit 1
fi

if rg -F --quiet "$SENTINEL" .output/; then
  echo "FAIL: NUXT_ACP_BEARER_TOKEN sentinel appears under .output/ (token must be runtime-only)" >&2
  rg -F --files-with-matches "$SENTINEL" .output/ >&2 || true
  exit 1
fi

echo "PASS: sentinel not found anywhere under .output/ (runtime-only acpBearerToken)"
