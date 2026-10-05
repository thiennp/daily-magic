# token-saver (AWL)

Local pitfall registry cache + `check_context` MCP for Agent Witch Local.

## Owns

- Profile SQLite DB: `~/.agent-witch/profiles/<email>/token-saver.db`
- Bundled seed pitfalls (11 rows from API 01)
- Ops: `listPitfalls`, `getPitfall`, `upsertPitfall`, `recordHit`, `matchPitfalls`
- `check_context` domain logic + tool definition (status `hit`|`miss`|`none`); HTTP `/api/local/check-context`
- MCP transport (stdio `agent-witch mcp`, HTTP `/mcp`) is in `apps/live/features/mcp`
- cwd → projectId via `@agent-witch/live-projects` `resolveAgentWitchProjectIdFromCwd`

## Aligns with (step 2)

- Enums/limits, `oneLine`, `formatPitfallBotLine` (`id|avoidance`) from `@agent-witch/shared/pitfalls`
- check_context statuses/types, `CHECK_CONTEXT_TOOL_SCHEMA` and the ≤~120-token hit `tip`
  (`formatCheckContextTip`, ≤4 lines) from `@agent-witch/shared/token-saver`
- MCP tool results via `toMcpTextResult` from `@agent-witch/shared/mcp`
- Does **not** reuse preflight statuses (`pass|warn|block|…`); check_context stays `hit|miss|none`

## Does not own (later)

- `setup_project` / CLI config writers (step 4)
- Decline-store writer (step 4; `isDeclined` is injectable)
- Cloud sync (NRG AgentWitch)

## Public API

- `@agent-witch/live-token-saver` — registry, `checkContext`, `createCheckContextRunner`, `AWL_CHECK_CONTEXT_TOOL`, HTTP tryHandle
- `@agent-witch/live-token-saver/types` — DTOs, limits, `CheckContextResult` (re-exported shared type)
