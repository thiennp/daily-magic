# Legacy surfaces (Agent Witch deployables)

**Status:** Living inventory — update when shims move or slices absorb `scripts/`.

Canonical deployables: [agent-witch-deployables.md](../product/agent-witch-deployables.md) · Registries: `apps/*/features.registry.json`.

## Summary

| Area       | Target                    | Today                                                                                                | Policy                                                                |
| ---------- | ------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **AWC**    | `apps/console/`           | `src/app/`, `server.ts`, `src/features/`, `src/lib/`                                                 | Cloud hub + install script **generation** stay here until console FSA |
| **AWI**    | `apps/install/features/*` | Slices own contracts; **`scripts/`** + **`apps/install/entry/legacyScriptDeps.ts`** hold hub runtime | Entry must not import `scripts/` except via `legacyScriptDeps.ts`     |
| **AWL**    | `apps/live/features/*`    | `apps/live/entry/` + thin **`scripts/buildAgentWitchLocal*`** shims                                  | `npm run harness:script-shims` refreshes AWL re-exports               |
| **AWB**    | `apps/bridge/features/*`  | `apps/bridge/entry/` + **`scripts/agent-witch-wake-server.ts`** shim                                 | `apps/bridge/adapters/` may still reach `scripts/` during migration   |
| **Shared** | `packages/shared/`        | Active                                                                                               | No `src/` imports (enforced)                                          |

## Intentional shims (stable URLs)

| Shim                                 | Canonical                                |
| ------------------------------------ | ---------------------------------------- |
| `scripts/agent-witch.ts`             | `apps/install/entry/`                    |
| `scripts/agentWitchLocalApp.ts`      | `apps/live/entry/startLocalAppServer.ts` |
| `scripts/agent-witch-wake-server.ts` | `apps/bridge/entry/wake-server.ts`       |
| `public/install/agent-witch/`        | AWI `bundle` slice (shipped artifact)    |

## `scripts/` folder

Still required for:

- **npm** entrypoints (`agent-witch`, wake-server, watchdog, self-update, db-migrate, e2e helpers)
- **Hub orchestration** not yet moved into `runtime-client` (run sessions, PTY, machine lease, in-process AWL/AWB host)
- **AWC install bundle build** (`buildAgentWitchInstallBundle.ts`)
- **Co-located tests** for Mac runtime modules

Many files are **one-line re-exports** to `@agent-witch/install-*` or `@agent-witch/live-*`; prefer package imports in new code.

## AWC `src/lib/agentWitch/`

Owns cloud WebSocket hub, device registry, dispatch, harness catalog integration, and **install bash script assembly**. AWI slices own Mac runtime; AWC continues to **serve** install assets until `public-api` facades replace direct paths listed in `apps/install/features.registry.json` → `legacyPaths`.

## Verification

- `test/deployableBoundary.test.ts` — cross-deployable imports
- `npm run test:safety` — fast tier includes boundaries
- `npm run harness:script-shims` — regenerate AWL (and writerApi) script re-exports
