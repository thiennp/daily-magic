# Agent context and script map

How coding agents (Cursor, Claude, Codex, etc.) should **reveal** system knowledge without loading the whole repo. This repo already wires context through **entry files → harness → feature knowledge → module docs**.

## Recommended reveal order (token-efficient)

Use the **smallest** source that answers the question; stop when you have enough to edit safely.

| Step | Source                                                                      | When                                                                                                 |
| ---- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 1    | [AGENTS.md](../../AGENTS.md)                                                | Every task — product name, harness paths, Cloud VM DB caveats                                        |
| 2    | [CLAUDE.md](../../CLAUDE.md)                                                | Stack, main routes, Agent Witch local commands                                                       |
| 3    | `npm run harness:bootstrap -- --match="<user intent excerpt>"`              | Attach the matched `.cursor/commands/*.md` playbook and/or run a workflow (`verify`, `commit`, `pr`) |
| 4    | `npm run feature-knowledge:query -- "<symptom or area>" [--feature=<slug>]` | Before substantive edits under `src/features/`                                                       |
| 5    | `src/features/<slug>/README.md`, `KNOWN_ISSUES.md`, `AGENTS.md`             | Feature-specific behavior and landmines                                                              |
| 6    | `docs/` topic page                                                          | Architecture, deploy, product glossary                                                               |
| 7    | ADR under `docs/adr/`                                                       | **Why** a constraint exists (WebSocket server, hosting, dispatch outbox)                             |
| 8    | Source code                                                                 | Implementation detail after the above                                                                |

**Slug** for cross-cutting docs in feature-knowledge is `docs` (all markdown under `docs/` is indexed). Example:

```bash
npm run feature-knowledge:query -- "Railway WebSocket production" --feature=docs
npm run feature-knowledge:query -- "dispatch approvals queue" --feature=dispatch
```

Path-scoped Cursor rules load from `.cursor.json` when you touch matching paths — no extra step.

## What gets indexed

| Location          | Files indexed                                                       |
| ----------------- | ------------------------------------------------------------------- |
| `docs/**/*.md`    | All markdown (chunked by heading → `.feature-knowledge/index.json`) |
| `src/features/*/` | `README.md`, `AGENTS.md`, `KNOWN_ISSUES.md` per feature folder      |

Rebuild after edits: `npm run feature-knowledge:index`. Scaffold missing feature docs from registry: `npm run feature-knowledge:scaffold-docs`.

## npm scripts — what they reveal

Scripts **do not** replace docs; they **validate** or **route** agents to the right workflow.

### Context and documentation

| Script                            | Reveals / does                                                           |
| --------------------------------- | ------------------------------------------------------------------------ |
| `feature-knowledge:query`         | Ranked doc chunks (docs + features) for a natural-language question      |
| `feature-knowledge:index`         | Rebuilds TF-IDF index from docs + feature markdown                       |
| `feature-knowledge:scaffold-docs` | Creates stub `README.md` / `AGENTS.md` / `KNOWN_ISSUES.md` from registry |
| `harness:bootstrap`               | Manifest routing: which command playbook and workflow match user text    |
| `harness:sync`                    | Writes git-hooks doc from manifest (commit workflow reference)           |

### Application runtime (Agent Witch product)

| Script                                                          | Reveals / does                                    |
| --------------------------------------------------------------- | ------------------------------------------------- |
| `dev`                                                           | Custom server + Next + WebSocket (`server.ts`)    |
| `dev:next`                                                      | Next only — **no** Mac WS bridge                  |
| `agent-witch`                                                   | Local Mac bridge client entry                     |
| `agent-witch:install`                                           | Install bundle to `~/.agent-witch`                |
| `agent-witch:watchdog` / `self-update` / `automation-scheduler` | macOS maintenance CLIs                            |
| `build:agent-witch`                                             | Regenerates install bundle consumed by production |

### Quality and structure (before commit/PR)

| Script                                   | Reveals / does                               |
| ---------------------------------------- | -------------------------------------------- |
| `harness:bootstrap -- --workflow=verify` | Lists verify steps (see manifest)            |
| `cursor:verify`                          | Rule/policy checks (barrels, naming, etc.)   |
| `cursor:architecture`                    | Layer import rules + staged file size limits |
| `validate:staged` / `validate:all`       | `structure-validation.config.json` layout    |
| `lint` / `typecheck` / `test`            | Standard TS/React/Vitest gates               |
| `test:e2e` / `test:e2e:shipped-install`  | Playwright; shipped install blackbox         |

### Database

| Script                 | Reveals / does                         |
| ---------------------- | -------------------------------------- |
| `db:migrate`           | Applies `db/migrations` (deploy path)  |
| `db:schema`            | Full `db/schema.sql` via `psql`        |
| `db:migrate:bootstrap` | One-time `schema_migrations` bootstrap |

### Scaffolding

| Script          | Reveals / does                                              |
| --------------- | ----------------------------------------------------------- |
| `pnpm scaffold` | New components/hooks/utils per `.agents/scaffold/README.md` |

## Harness files (static context)

| Path                                            | Role                                            |
| ----------------------------------------------- | ----------------------------------------------- |
| `.cursor/harness/agent-bootstrap.manifest.json` | Command + workflow routing                      |
| `.cursor/rules/*.mdc`                           | Always-on or path-scoped invariants             |
| `.cursor/commands/`                             | Step-by-step playbooks (verify, commit, PR)     |
| `.cursor/skills/`                               | Optional SOPs referenced by rules               |
| `.agents/scripts/`                              | Implementations for architecture/verify/harness |
| `.agents/diagrams/`                             | Supplementary architecture notes                |

## Anti-patterns

- Reading entire `src/features/` or `src/lib/` trees before querying feature knowledge.
- Duplicating ADR or `docs/` content into chat — link and query instead.
- Skipping `feature-knowledge:index` after doc edits on a PR branch.
- Using injected Cloud `DATABASE_URL` without sourcing `.env.local` — see AGENTS.md (VM only).
