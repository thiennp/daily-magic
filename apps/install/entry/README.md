# AWI entry (target)

Thin CLI and process bootstrap for Agent Witch Install.

**Today:** `scripts/agentWitchAppEntry.ts` remains the npm `agent-witch` CLI router. `apps/install/entry/agent-witch.ts` re-exports `startAgentWitchClient` from `scripts/agent-witch.ts` while config loading moves into `features/runtime-client/`.

See [awi-fsa-plan.md](../../docs/architecture/awi-fsa-plan.md).
