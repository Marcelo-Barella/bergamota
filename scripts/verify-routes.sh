#!/usr/bin/env bash
set -euo pipefail
BASE="${1:-http://127.0.0.1:3027}"

routes=(
  "/"
  "/token-optimization"
  "/projects/tangerina"
  "/projects/cursor-sync"
  "/projects/cursor-ca-orchestrator"
  "/projects/agentic-browser-ai"
  "/api/token-optimization/config"
)

echo "Verifying routes on ${BASE}"
for route in "${routes[@]}"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "${BASE}${route}")
  echo "${code} ${route}"
  if [[ "${code}" != "200" ]]; then
    exit 1
  fi
done

echo "POST /api/token-optimization/run"
curl -fsS -X POST "${BASE}/api/token-optimization/run" \
  -H 'Content-Type: application/json' \
  -d '{"scenarioId":"concise"}' | head -c 120
echo

echo "POST /api/token-optimization/chat"
curl -fsS -X POST "${BASE}/api/token-optimization/chat" \
  -H 'Content-Type: application/json' \
  -d '{"levelId":3,"userMessage":"teste"}' | head -c 120
echo

echo "OK"
