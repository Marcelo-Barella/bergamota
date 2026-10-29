# Cursor SDK & ACP — docs verification (workshop reference)

Last reviewed against Cursor public docs (Oct 2026). Re-check URLs before teaching billing/usage edge cases.

## Cursor TypeScript SDK (`@cursor/sdk`)

| Topic | Status | Source |
| --- | --- | --- |
| Package & install | **Confirmed** | https://cursor.com/docs/sdk/typescript |
| Auth via `CURSOR_API_KEY` | **Confirmed** | https://cursor.com/docs/sdk/typescript , https://cursor.com/docs/cli/reference/authentication |
| Create **local** agents (`local: { cwd }`) | **Confirmed** | https://cursor.com/docs/sdk/typescript |
| Create **cloud** agents (`cloud: { repos: [...] }`) | **Confirmed** | https://cursor.com/docs/sdk/typescript |
| No-repo cloud (`cloud: { repos: [] }`) | **Confirmed** (gated per account/team) | https://cursor.com/docs/sdk/typescript , npm `@cursor/sdk` readme |
| Launch/manage runs (`agent.send`, `Agent.prompt`, dispose) | **Confirmed** | https://cursor.com/docs/sdk/typescript |
| Per-run **token usage** (`result.usage`, `run.usage`, stream `usage` events) | **Confirmed** | https://cursor.com/docs/sdk/typescript (Token usage) |
| Billed **cost** (`agent.getUsage()`) | **Confirmed** (may lag; cloud vs local gates) | https://cursor.com/docs/sdk/typescript |
| `totalTokens` on run objects vs cache fields | **Unconfirmed / caveat** | Community report: prefer `inputTokens + outputTokens` for display — https://forum.cursor.com/t/run-usage-totaltokens-double-counts-cache-read-and-cache-write-tokens/174871 |

**Not an inference API:** SDK is for agent runs (tools, workspace), not arbitrary chat-completions-only HTTP — **Confirmed** in SDK docs (Router / model sections).

## ACP (Agent Client Protocol) via Cursor CLI

| Topic | Status | Source |
| --- | --- | --- |
| Entry command `agent acp` | **Confirmed** | https://cursor.com/docs/cli/acp , https://cursor.com/docs/cli/reference/parameters |
| Transport **stdio**, **JSON-RPC 2.0**, newline-framed | **Confirmed** | https://cursor.com/docs/cli/acp |
| Flow: `initialize` → `authenticate` → `session/new` → `session/prompt` | **Confirmed** | https://cursor.com/docs/cli/acp |
| Pre-auth with `CURSOR_API_KEY` / `--api-key` | **Confirmed** | https://cursor.com/docs/cli/acp , https://cursor.com/docs/cli/reference/parameters |
| Stream via `session/update` (e.g. `agent_message_chunk`) | **Confirmed** (minimal client example) | https://cursor.com/docs/cli/acp |
| Modes `agent` / `plan` / `ask` | **Confirmed** | https://cursor.com/docs/cli/acp |
| Permissions `session/request_permission` | **Confirmed** | https://cursor.com/docs/cli/acp |
| Open protocol (IDE integrations) | **Confirmed** | https://agentclientprotocol.com , https://cursor.com/docs/integrations/jetbrains |
| **Token usage** fields on ACP `session/update` | **Unconfirmed** | Not documented on https://cursor.com/docs/cli/acp — bergamota parses `usage` / `tokenUsage` if present and labels **estimate / não confirmado** |
| Exact `sessionUpdate` enum for thinking / edits / tools | **Partially confirmed** | Docs show `agent_message_chunk`; thinking/tools seen in examples and integrations — treat additional kinds as **best-effort** in UI |

## How bergamota.dev uses both

- **SDK:** `POST /api/token-optimization/run` (local agent, `tools: []`), `POST /api/token-optimization/cloud-run` (cloud `repos: []`).
- **ACP:** long-lived `agent acp` when `ACP_ENABLED=true` (Docker); SSE `GET /api/token-optimization/acp/events`; prompts `POST /api/token-optimization/acp/prompt`.
