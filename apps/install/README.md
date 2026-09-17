# AWI — Agent Witch Install

Mac install bundle, runtime (`agent-witch.js`), LaunchAgents, and self-update.

**Today:** `public/install/agent-witch/`, `scripts/agent-witch.ts`, client/runtime code under `src/lib/agentWitch/` and `scripts/`.

**Target:** FSA slices under `apps/install/features/`; thin `entry/` CLI; cross-app types in `@agent-witch/shared`.

## FSA

- Plan: [docs/architecture/awi-fsa-plan.md](../../docs/architecture/awi-fsa-plan.md)
- Short pointer: [FSA.md](./FSA.md)
- Registry: [features.registry.json](./features.registry.json)

## Boundaries

| Owns (AWI)                                                                                            | Not AWI (other deployables)                                                                                   |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Install bundle, runtime process, LaunchAgents, self-update, WS client to AWC, `~/.agent-witch` layout | **AWB** wake HTTP (`47892`/`47893`) · **AWL** UI (`43347`) · **AWC** cloud UI + install script **generation** |

Boundary tests: `test/awiFeaturesRegistry.test.ts`, `test/deployableBoundary.test.ts` (included in `npm run test:safety`).

## Verification

```bash
npm test -- test/awiFeaturesRegistry.test.ts test/deployableBoundary.test.ts
npm run test:safety -- --deployable=AWI
```
