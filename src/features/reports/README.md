# Reports

Agent run history, live terminal, re-run.

## Registry

- **Slug:** `reports`
- **Feature path:** `src/features/reports`
- **Migration:** migrated

## Routes

- `/reports`
- `/reports/[runId]`

## APIs

- `/api/agent-runs`

## Dependencies

- `dispatch`
- `feedback`

Query: `npm run feature-knowledge:query -- "..." --feature=reports`

Public API (`types`): outside code imports `AgentRunDetailFetchOutcome` and `AgentRunSseEvent` from `@/features/reports/types/public-api/types`.

Public API (`utils`): outside code imports the agent-run helpers (status labels, continue href, history delete, SSE parsing, socket cache sync) from `@/features/reports/utils/public-api/presentation`.

## Public API

Outside code imports only `public-api/presentation` (run list/detail components, local run cache, `fetchAgentRunDetail`) and `public-api/types` (polling and timed-out copy constants). Sub-folders `hooks/`, `types/` and `utils/` have their own `public-api/`.
