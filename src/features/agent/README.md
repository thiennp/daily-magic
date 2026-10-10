# Task composer

Compose and send tasks to Mac via AgentWitch.

## Registry

- **Slug:** `agent`
- **Feature path:** `src/features/agent`
- **Migration:** migrated

## Routes

- `/agent`
- `/ws-test`

## APIs

- `/api/agent-runs`

## Dependencies

- `dispatch`
- `capabilities`
- `workflows`
- `agent-witch`

## Send readiness (AW-READY-2)

New task composer banners and Send disabling: `src/features/agent/send-readiness/` (public API: `send-readiness/public-api/{types,presentation}`). Contract and priority order: [docs/agent-witch/send-readiness-reason-codes.md](../../docs/agent-witch/send-readiness-reason-codes.md).

Query: `npm run feature-knowledge:query -- "..." --feature=agent`

Public API (`icons`): outside code imports `HarnessWriterAgentMark` from `@/features/agent/icons/public-api/presentation`.

Public API (`hooks/types`): outside code imports `UseWsTestTaskComposerResult` from `@/features/agent/hooks/types/public-api/types`.

Public API (`hooks/utils`): outside code imports `fetchUserProjectsForLoader` from `@/features/agent/hooks/utils/public-api/presentation`.

Public API (`hooks`): outside code imports hooks and loaders from `@/features/agent/hooks/public-api/presentation`, hook types from `.../public-api/types`, and hooks that reach React in files without `"use client"` from `.../public-api/client`.

`constants/public-api/types.ts` is the public API of the agent constants unit (send-task query params, storage keys).
