# AWB — Fractal Slice Architecture

Agent Witch **Bridge** loopback HTTP (`127.0.0.1:47892` / `47893`). Registry: [`features.registry.json`](./features.registry.json).

## Hierarchy

| Parent          | Leaf slices                                                                | Responsibility                                           |
| --------------- | -------------------------------------------------------------------------- | -------------------------------------------------------- |
| **server**      | `http-server`, `cors-origin`                                               | HTTP helpers, CORS, `startBridgeServer`, route dispatch  |
| **discovery**   | `health-identity`                                                          | `GET /health`, `GET /identity`                           |
| **diagnostics** | `local-debug-page`                                                         | `GET /local`                                             |
| **operations**  | `watchdog-api`, `process-control`, `self-update-api`, `install-delete-api` | Mac lifecycle (via `adapters/macLifecycle` → `scripts/`) |
| **awc-proxy**   | `harness-proxy`, `projects-proxy`, `automations-proxy`                     | Browser-initiated Mac writes                             |

## Boundaries

- `features/**` imports **`adapters/*`** or sibling **`public-api/*`** only — not `scripts/` or `src/`.
- Wake handler barrel for install bundle shims: [`public-api/wakeHandlers.ts`](./public-api/wakeHandlers.ts).
- Route catalog: `features/server/internal/bridgeRouteCatalog.constant.ts`.
- Dispatch: `features/server/internal/dispatchBridgeRoute.ts` + `bridgeRouteHandlers.constant.ts`.
- Entry: [`entry/wake-server.ts`](./entry/wake-server.ts) · shims: `scripts/agent-witch-wake-server.ts`, `scripts/agentWitchWakeHandlers.ts`.

## Tests

- `apps/bridge/features/server/internal/bridgeRouteCatalog.test.ts`
- `apps/bridge/features/server/internal/bridgeRouteHandlers.constant.test.ts`
- `test/awbFeaturesRegistry.test.ts`
- `test/deployableBoundary.test.ts` (AWB import rules)
