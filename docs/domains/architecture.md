# Domain: Architecture & platform

**Scope:** How the app is hosted and layered — custom Node server, Next.js App Router, `src/features` vs `src/app` vs `src/lib`, Neon, import rules.

**Not in this domain:** Product vocabulary ([product.md](product.md)), step-by-step deploy commands ([development.md](development.md)).

## Registry

Cross-cutting — no single feature slug. Feature list: `src/features/_registry/features.registry.json`.

## Skim (L1)

- Production needs **long-lived `server.ts`** for Mac WebSocket on the same origin as the UI.
- UI in `src/features/`, HTTP routes in `src/app/`, shared server code in `src/lib/`.
- Layer imports enforced by `npm run cursor:architecture`.

## Read next if…

| If you need…                                    | Open                                                                                    |
| ----------------------------------------------- | --------------------------------------------------------------------------------------- |
| Runtime diagram (browser, hub, Mac, DB)         | [architecture/system-map.md](../architecture/system-map.md)                             |
| Feature slugs, routes, APIs table               | [architecture/codebase-map.md](../architecture/codebase-map.md)                         |
| Why WebSocket is not on plain Vercel serverless | [adr/0002](../adr/0002-custom-server-for-agent-witch-websocket.md)                      |
| Why UI/lib split                                | [adr/0003](../adr/0003-feature-ui-with-server-lib.md)                                   |
| Railway / agentwitch.com / Neon                 | [adr/0006](../adr/0006-production-hosting-and-neon.md)                                  |
| Presence, outbox, multi-instance                | [adr/0005](../adr/0005-shared-mac-presence-and-dispatch-outbox.md)                      |
| Onboarding task path                            | [conventions/load-context.md](../conventions/load-context.md) § Understand architecture |

**L2:** only open feature `README.md` for slugs you will edit.
