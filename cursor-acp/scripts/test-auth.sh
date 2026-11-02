#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:${ACP_BRIDGE_PORT:-8000}}"
GOOD_TOKEN="${ACP_BEARER_TOKEN:-${ACP_BRIDGE_TOKEN:-}}"
BAD_TOKEN="${BAD_TOKEN:-definitely-wrong-token}"

if [[ -z "${GOOD_TOKEN}" ]]; then
  echo "ACP_BEARER_TOKEN must be set in the environment" >&2
  exit 2
fi

fail() {
  echo "FAIL: $*" >&2
  exit 1
}

pass() {
  echo "PASS: $*"
}

echo "Testing auth against ${BASE_URL}"

code=$(curl -sS -o /dev/null -w "%{http_code}" "${BASE_URL}/health")
[[ "${code}" == "200" ]] || fail "health expected 200 got ${code}"
pass "/health -> 200"

code=$(curl -sS -o /dev/null -w "%{http_code}" \
  -X POST "${BASE_URL}/sessions" \
  -H "Content-Type: application/json")
[[ "${code}" == "401" ]] || fail "missing token expected 401 got ${code}"
pass "missing token -> 401"

code=$(curl -sS -o /dev/null -w "%{http_code}" \
  -X POST "${BASE_URL}/sessions" \
  -H "Authorization: Bearer ${BAD_TOKEN}" \
  -H "Content-Type: application/json")
[[ "${code}" == "401" ]] || fail "bad token expected 401 got ${code}"
pass "bad token -> 401"

code=$(curl -sS -o /dev/null -w "%{http_code}" \
  -X POST "${BASE_URL}/sessions" \
  -H "Authorization: Bearer ${GOOD_TOKEN}" \
  -H "Content-Type: application/json")
[[ "${code}" == "201" ]] || fail "good token expected 201 got ${code}"
pass "valid token -> 201"

echo "All auth checks passed."
