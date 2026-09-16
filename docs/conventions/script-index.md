# Script index (observe the system)

**Load this page** when you need to know which **npm run** command exposes which part of the repo — without pasting logs into docs. Full task paths: [load-context.md](load-context.md).

There is **no Makefile** in this repo. Primary surface: **`package.json` scripts** + **`scripts/`** (Agent Witch CLIs) + **`.agents/scripts/`** (harness/verify).

## Learn by running (after L1 docs)

Use docs to pick a **hypothesis**, then run **one** script or probe to confirm behavior. Prefer short commands and read exit codes / JSON — do not dump full test output into chat.

| Goal                  | Command                                                       | What you learn                                                  |
| --------------------- | ------------------------------------------------------------- | --------------------------------------------------------------- |
| App + WebSocket entry | `npm run dev`                                                 | `server.ts` serves Next and upgrades `/api/agent-witch/ws`      |
| Next without bridge   | `npm run dev:next`                                            | UI-only; Mac WS **absent** (contrast with ADR 0002)             |
| Process up            | `curl -sS http://localhost:3000/api/health`                   | Custom server health (deploy probe)                             |
| DB configured         | `curl -sS http://localhost:3000/api/db/health`                | Neon connectivity from app env                                  |
| Doc search (RAG)      | `npm run feature-knowledge:query -- "topic" [--feature=slug]` | Which markdown chunks matter                                    |
| Harness routing       | `npm run harness:bootstrap -- --match="commit"`               | Which playbook/workflow applies                                 |
| Unit behavior         | `npm run test`                                                | Vitest contracts (runs `build:agent-witch` first via `pretest`) |
| Browser flows         | `npm run test:e2e`                                            | Playwright against running app (install Chromium once)          |
| Mac bridge client     | `npm run agent-witch`                                         | Local client process (needs install + `dev`)                    |
| Install bundle        | `npm run build:agent-witch`                                   | What ships in `public/install/agent-witch/`                     |

On **Cursor Cloud VM**: export `.env.local` before `dev`/`db:*` — [AGENTS.md](../../AGENTS.md). Mac-only scripts below may not apply on Linux.

## macOS automation (not a general “osascript harness”)

- **`osascript`** appears only for **folder-picker UI** (`scripts/pickMacOsFolderDialog.ts`) and related Mac client paths — not for docs or agent context loading.
- **LaunchAgents** (watchdog, updater, client autostart) are installed via **`npm run agent-witch:install`** and managed by scripts under `scripts/` (e.g. `agent-witch:watchdog`, `agent-witch:self-update`). See [agent-witch/local-bridge.md](../agent-witch/local-bridge.md).

Agent-oriented automation in this repo means **`AGENTS.md`**, **`.agents/scripts/`**, and **`harness:*`** — not AppleScript runbooks.

## Index by system part

### Documentation & agent routing

| Script                            | Reveals                                                                       |
| --------------------------------- | ----------------------------------------------------------------------------- |
| `feature-knowledge:query`         | Ranked chunks from `docs/` + feature README/AGENTS/KNOWN_ISSUES               |
| `feature-knowledge:index`         | Rebuild `.feature-knowledge/index.json` after doc edits                       |
| `feature-knowledge:scaffold-docs` | Stub feature markdown from registry                                           |
| `harness:bootstrap`               | Match user intent → `.cursor/commands` + workflows (`verify`, `commit`, `pr`) |
| `harness:sync`                    | Refresh git-hooks doc from manifest                                           |

### App runtime & build

| Script                         | Reveals                                                        |
| ------------------------------ | -------------------------------------------------------------- |
| `dev`                          | Production-like Node entry: Next + Agent Witch hub + WS        |
| `start` / `start:with-migrate` | Production `server.ts`; migrate variant before boot            |
| `build`                        | Next production build + install bundle                         |
| `build:agent-witch`            | Install bundle artifacts under `public/install/`               |
| `vercel-build`                 | CI-style migrate + build (still not a WS host on Vercel alone) |

### Agent Witch (Mac bridge)

| Script                                   | Reveals                                             |
| ---------------------------------------- | --------------------------------------------------- |
| `agent-witch`                            | Main local client (`scripts/agentWitchAppEntry.ts`) |
| `agent-witch:install`                    | `~/.agent-witch` layout + LaunchAgents              |
| `agent-witch:wake-server`                | Local wake API on port 47892                        |
| `agent-witch:watchdog`                   | Stale client detection / revive                     |
| `agent-witch:self-update`                | Install bundle update check                         |
| `agent-witch:automation-scheduler`       | Scheduled automations runner                        |
| `agent-witch:test-writer-session-stream` | Writer PTY stream local test                        |
| `e2e:agent-witch:setup`                  | Localhost E2E Agent Witch setup helper              |

### Database

| Script                             | Reveals                                         |
| ---------------------------------- | ----------------------------------------------- |
| `db:migrate`                       | Applied migration set (`scripts/db-migrate.ts`) |
| `db:migrate:bootstrap`             | `schema_migrations` bootstrap for legacy DBs    |
| `db:schema`                        | Raw `db/schema.sql` via `psql`                  |
| `db:migrate:onboarding-first-task` | One-off SQL migration helper                    |

### Quality, structure, CI-shaped checks

| Script                                                                   | Reveals                                                      |
| ------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `lint` / `typecheck`                                                     | ESLint + `tsc` (typecheck needs prior `build` on clean tree) |
| `test` / `test:watch`                                                    | Vitest unit/integration                                      |
| `test:e2e`                                                               | Default Playwright suite                                     |
| `test:e2e:shipped-install`                                               | Shipped install script E2E config                            |
| `test:shipped-install-blackbox`                                          | Blackbox install validation driver                           |
| `cursor:verify`                                                          | Cursor rule/barrel/naming policies                           |
| `cursor:architecture` / `ci:architecture`                                | Import layers + file size limits                             |
| `validate:staged` / `validate:all` / `validate:fix` / `validate:preview` | `structure-validation.config.json`                           |

### Tooling & assets (secondary)

| Script                    | Reveals                                           |
| ------------------------- | ------------------------------------------------- |
| `showcase:capture`        | Marketing screenshot capture (`.agents/scripts/`) |
| `e2e:capture-screenshots` | Playwright capture config                         |
| `prepare`                 | Husky install (local git hooks)                   |

Scaffolding new **source files**: see **`.agents/scaffold/README.md`** (invoked per that doc; not a top-level `npm run scaffold`).

## Suggested observe paths (by task type)

| Task type    | Read (L1)               | Then run                                                     |
| ------------ | ----------------------- | ------------------------------------------------------------ |
| Bugfix       | Domain + `KNOWN_ISSUES` | `test` or targeted `vitest` file; optional `dev` + reproduce |
| Feature      | Domain + registry       | `dev` + manual route; `test`                                 |
| Refactor     | `codebase-map`          | `cursor:architecture -- --staged`, `validate:staged`         |
| Deploy       | `domains/development`   | `db:migrate` (dry on staging), `build`, `start` smoke        |
| Architecture | `domains/architecture`  | `dev` + `curl` health endpoints; compare `dev` vs `dev:next` |

## Anti-patterns

- Running `test:e2e` or full `validate:all` to “understand” a one-line doc fix.
- Treating `osascript` as the agent entrypoint — use **AGENTS.md** and **feature-knowledge:query**.
- Copying multi-page CI logs into markdown — link scripts and record **what** they validate only.
