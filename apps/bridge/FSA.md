# AWB — Fractal Slice Architecture

Agent Witch **Bridge** loopback HTTP (`127.0.0.1:47892` / `47893`). Registry: [`features.registry.json`](./features.registry.json).

## Hierarchy

| Parent          | Leaf slices                                                                | Responsibility                                  |
| --------------- | -------------------------------------------------------------------------- | ----------------------------------------------- |
| **server**      | `http-server`                                                              | JSON/body helpers, `startBridgeServer`, routing |
| **discovery**   | `health-identity`                                                          | `GET /health`, `GET /identity`                  |
| **diagnostics** | `local-debug-page`                                                         | `GET /local`                                    |
| **operations**  | `watchdog-api`, `process-control`, `self-update-api`, `install-delete-api` | Side effects via `adapters/legacyScripts` → AWI |
| **awc-proxy**   | `harness-proxy`, `projects-proxy`, `automations-proxy`                     | Browser-initiated Mac writes                    |

## Boundaries

- Feature code under `features/**` imports **`adapters/legacyScripts`** only (not `scripts/` or `src/`).
- Route table: `features/server/internal/bridgeRouteCatalog.constant.ts` (contract tests).
- Entry: [`entry/wake-server.ts`](./entry/wake-server.ts) · shim: `scripts/agent-witch-wake-server.ts`.

## Tests

- `apps/bridge/features/server/internal/bridgeRouteCatalog.test.ts`
- `test/awbFeaturesRegistry.test.ts`
- `test/deployableBoundary.test.ts` (AWB import rules)
