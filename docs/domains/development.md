# Domain: Development & ops

**Scope:** Local run, test, lint, CI, database migrations, production deploy — not product feature behavior.

## Skim (L1)

- Dev: `npm run dev` (`server.ts` + WebSocket). Typecheck may need a prior `npm run build` on clean checkouts.
- DB: `npm run db:migrate`; schema in `db/schema.sql`.
- Production control plane: long-lived Node (e.g. Railway) + Neon — not Vercel-only for Mac `wss`.

## Read next if…

| If you need…                        | Open                                                                                                |
| ----------------------------------- | --------------------------------------------------------------------------------------------------- |
| First-time machine setup            | [development/setup.md](../development/setup.md)                                                     |
| Deploy / Railway / Vercel notes     | [development/deployment.md](../development/deployment.md)                                           |
| CI and pre-commit                   | [development/quality-gates.md](../development/quality-gates.md)                                     |
| Agent script map                    | [conventions/agent-context.md](../conventions/agent-context.md)                                     |
| Architecture constraints for deploy | [domains/architecture.md](architecture.md) + [adr/0006](../adr/0006-production-hosting-and-neon.md) |

**Task path:** [conventions/load-context.md](../conventions/load-context.md) § Deploy.
