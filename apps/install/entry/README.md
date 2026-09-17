# AWI entry (target)

Thin CLI and process bootstrap for Agent Witch Install.

**Today:** `scripts/agentWitchAppEntry.ts` remains the npm `agent-witch` CLI router. `apps/install/entry/agent-witch.ts` exports `startAgentWitchClient` from `startAgentWitchClient.ts`; `scripts/agent-witch.ts` is a thin shim.

See [awi-fsa-plan.md](../../docs/architecture/awi-fsa-plan.md).
