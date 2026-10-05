# token-saver (AWL)

Local pitfall registry cache + `check_context` MCP for Agent Witch Local.

## Owns

- Profile SQLite DB: `~/.agent-witch/profiles/<email>/token-saver.db`
- Bundled seed pitfalls (11 rows from API 01)
- Ops: `listPitfalls`, `getPitfall`, `upsertPitfall`, `recordHit`, `matchPitfalls`
- MCP tool `check_context` (status `hit`|`miss`|`none`); HTTP `/api/local/check-context` + `/mcp`
- Stdio MCP via `agent-witch mcp`

## Does not own (later)

- `setup_project` / CLI config writers (step 4)
- Decline-store writer (step 4; `isDeclined` is injectable)
- Cloud sync (NRG AgentWitch)

## Public API

- `@agent-witch/live-token-saver` — registry, `checkContext`, MCP handler, HTTP tryHandle
- `@agent-witch/live-token-saver/types` — DTOs, caps, `CheckContextResult`
