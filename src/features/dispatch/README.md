# Dispatch & approvals

Team dispatch targets, approvals, run queue, policies.

## Registry

- **Slug:** `dispatch`
- **Feature path:** `src/features/dispatch`
- **Lib path:** `src/lib/dispatch`
- **Migration:** migrated

## Product concepts

Mac vs Cursor Cloud dispatch: [docs/product/concepts.md](../../../docs/product/concepts.md). API routes live under `src/app/api/` (see [MODULE_LAYOUT](../_registry/MODULE_LAYOUT.md)).

## Routes

_None wired in this feature folder._

## APIs

- `/api/dispatch`
- `/api/agent-runs`

## Dependencies

- `auth`
- `capabilities`
- `agent-witch`

Query: `npm run feature-knowledge:query -- "..." --feature=dispatch`

## Hooks public API

`hooks/public-api/types.ts` (dispatch target and approval-request types) and `hooks/public-api/presentation.ts` (dispatch React hooks) are the only entry points other code may import from `hooks/`.
