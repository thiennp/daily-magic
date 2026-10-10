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
