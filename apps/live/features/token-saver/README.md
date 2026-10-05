# token-saver (AWL)

Local pitfall registry cache for Agent Witch Local (token-saver step 1).

## Owns

- Profile SQLite DB: `~/.agent-witch/profiles/<email>/token-saver.db`
- Bundled seed pitfalls (11 rows from API 01)
- Ops: `listPitfalls`, `getPitfall`, `upsertPitfall`, `recordHit`, `matchPitfalls`
- Pure keyword match (no Ollama); bot payload ≤4 lines / ~200 tokens

## Does not own (later)

- Local MCP tools / `check_context` (step 3)
- `setup_project` / CLI config writers (step 4)
- Cloud sync (NRG AgentWitch)

## Public API

- `@agent-witch/live-token-saver` — `createPitfallRegistry`, path helper, pure match helpers
- `@agent-witch/live-token-saver/types` — DTOs and caps

Not imported from the AWL entrypoint yet so the install bundle stays unchanged.
