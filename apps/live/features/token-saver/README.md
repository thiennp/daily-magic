# token-saver (AWL)

Local pitfall registry cache + `check_context` MCP + `setup_project` CLI writers.

## Owns

- Profile SQLite DB: `~/.agent-witch/profiles/<email>/token-saver.db`
- Bundled seed pitfalls (11 rows from API 01)
- Ops: `listPitfalls`, `getPitfall`, `upsertPitfall`, `recordHit`, `matchPitfalls`
- `check_context` domain logic + tool definition (status `hit`|`miss`|`none`); HTTP `/api/local/check-context`
- MCP transport (stdio `agent-witch mcp`, HTTP `/mcp`) is in `apps/live/features/mcp`
- cwd → projectId via `@agent-witch/live-projects` `resolveAgentWitchProjectIdFromCwd`
- Decline store (D2): `…/profiles/<email>/declined-projects.json` (default `isDeclined` for check_context);
  DB + decline paths share `resolveProfileScopedPath`
- Global writers at install (`GlobalTriggersWritten`): Cursor `~/.cursor/mcp.json`,
  Codex `~/.codex/config.toml` + `~/.codex/AGENTS.md`, Claude `UserPromptSubmit`
- Claude hook runner `agent-witch mcp-hook check_context` (`runCheckContextHook`): reads the
  UserPromptSubmit stdin JSON (`cwd`, `prompt`, `session_id`), runs check_context, prints
  `hookSpecificOutput.additionalContext` (hit → tip; none+promptCreate → create prompt; else
  nothing). Always exits 0; errors go to stderr only
- Project fragments on accept: Cursor `.cursor/rules/agent-witch-check-context.mdc`
  - `.git/info/exclude` (D1, never commit); project flags `.agent-witch/token-saver.json`
    (`AGENT_WITCH_PROJECT_META_DIR_NAME` from live-projects) from `buildDefaultProjectFlags()`
    (`@agent-witch/shared/projects`); re-accept merges existing user flags over defaults
- `runSetupProject` never throws on a missing/blank projectId or a failing resolver
  (`ok:false` + reason; decline untouched)

## Aligns with

- Enums/limits, `oneLine`, `formatPitfallBotLine` (`id|avoidance`) from `@agent-witch/shared/pitfalls`
- check_context statuses/types, `CHECK_CONTEXT_TOOL_SCHEMA` and the ≤~120-token hit `tip`
  (`formatCheckContextTip`, ≤4 lines) from `@agent-witch/shared/token-saver`
- MCP tool results via `toMcpTextResult` from `@agent-witch/shared/mcp`
- Does **not** reuse preflight statuses (`pass|warn|block|…`); check_context stays `hit|miss|none`
- Project feature flags (`ProjectFeatureFlags`, `buildDefaultProjectFlags`) from `@agent-witch/shared/projects`
- Design: `awl-setup-project-cli-write.md` (Arch r2 SHIP)

## Deferred / TODO

- Cursor `sessionStart` hook — UNVERIFIED (do not implement)
- Codex project-scoped MCP — UNVERIFIED (do not implement)
- Claude `.claude/settings.local.json` + Codex repo `AGENTS.md` project fragments
- D3 git-common-dir decline key (v1 uses realpath(cwd))
- Cloud create/attach (injected into `runSetupProject`)

## Public API

- `@agent-witch/live-token-saver` — registry, `checkContext`, `createCheckContextRunner`, `AWL_CHECK_CONTEXT_TOOL`, HTTP tryHandle, setup writers
- `@agent-witch/live-token-saver/types` — DTOs, limits, `CheckContextResult` (re-exported shared type)
