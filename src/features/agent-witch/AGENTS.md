# Agent Witch — agent instructions

1. Device list is the source of truth for “Mac connected” UI — see `pairedDevicesApi.ts`.
2. Query `npm run feature-knowledge:query -- "..." --feature=agent-witch` before API/client changes.
3. Server logic stays in `src/lib/agentWitch/` until migration completes.
