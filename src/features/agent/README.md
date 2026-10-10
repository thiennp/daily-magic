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

New task composer banners and Send disabling: `src/features/agent/send-readiness/`. Contract and priority order: [docs/agent-witch/send-readiness-reason-codes.md](../../docs/agent-witch/send-readiness-reason-codes.md).

Query: `npm run feature-knowledge:query -- "..." --feature=agent`

Public API (`icons`): outside code imports `HarnessWriterAgentMark` from `@/features/agent/icons/public-api/presentation`.

Public API (`hooks/types`): outside code imports `UseWsTestTaskComposerResult` from `@/features/agent/hooks/types/public-api/types`.
