# CLAUDE.md — daily-magic

Project guidance for Claude and other AI agents. Rules live in **`.cursor/rules/`**; scripts in **`.agents/scripts/`**.

---

## Project Overview

**daily-magic** (this repo) is the codebase for **AgentWitch** (`https://www.agentwitch.com`) — four deployables **AWC** (Cloud), **AWL** (Local Mac app), **AWB** (Bridge), **AWI** (Install); see `docs/product/agent-witch-deployables.md`. The git name is historical; production is **not** `daily-magic.d.energie.check24.de` unless you explicitly deploy there. See **`docs/product/repo-name-and-hosting.md`**. Product overview: root **`README.md`**. Documentation map: **`docs/README.md`**; agent context order: **`docs/conventions/agent-context.md`** (indexed via `npm run feature-knowledge:query`).

Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Neon PostgreSQL, Vercel.

**Stack:** Next.js · React 19 · TypeScript · Tailwind CSS 4 · Neon (`@neondatabase/serverless`) · Vercel

**Key routes:**

| Path             | Purpose                        |
| ---------------- | ------------------------------ |
| `/`              | Home                           |
| `/styleguide`    | TailAdmin component styleguide |
| `/ws-test`       | AgentWitch send-task test UI   |
| `/api/db/health` | Neon connection health check   |

**Top-level structure:**

- `src/app/` — Next.js routes, layouts, API route handlers
- `src/components/` — shared UI (TailAdmin components)
- `src/features/` — feature modules (e.g. styleguide sections)
- `src/lib/` — server utilities (database client)
- `src/hooks/` — React hooks
- `src/context/` — React context providers
- `src/icons/` — SVG icons
- `db/` — SQL schema
- `.cursor/` — Cursor rules, commands, skills, subagents
- `.agents/` — verification scripts and diagrams

---

## Core Principles

1. **Functional style** — pure functions, immutable data where practical.
2. **KISS / YAGNI / DRY** — simplest solution that meets the requirement.
3. **Self-documenting code** — meaningful names; comments only for non-obvious intent.

---

## Code Standards

- Prefer `const` over `let`.
- Avoid `any`; use explicit types or `unknown` with narrowing.
- Never commit with `--no-verify`.
- Co-locate tests with the code under test.
- Use `@/` path alias for imports from `src/`.
- Feature code belongs in `src/features/`; route wiring in `src/app/`.
- Shared UI in `src/components/`; framework utilities in `src/lib/`.

---

## Verification (after code changes)

**Testing policy (current):** the full unit suite is not part of the commit/push gate. No CI runs on GitHub (workflow is manual-only) or Railway — Railway only builds the image (CPU and deploy cost).

- Working on a feature: run only the tests related to it — `npm run test:related` (tests affected by your diff vs `origin/main`) or `npx vitest run <paths>`. Never the whole suite unless asked.
- UI-only change (presentational components, copy, styling): write and run no tests.
- Write tests only for logic with cyclomatic complexity > 3.
- Hooks: pre-commit runs prettier/ESLint/architecture on staged files + `tsc`; pre-push runs `npm run ci:fast` (architecture on your changes + `tsc`). Full gate on demand: `FULL_CI=1 git push` (= `npm run ci`).

The older full workflow is in **`.cursor/commands/command-verify-post-change-lint-typecheck-tests.md`** (use when explicitly asked for a full verification).

Husky **pre-commit** steps are listed in **`.cursor/harness/git-hooks.md`** (Prettier, ESLint, structure-validation, staged architecture checks, typecheck).

---

## Structure Validation

Configured in `structure-validation.config.json`. Run manually:

```bash
npm run validate:staged
npm run validate:all
npm run validate:preview
```

---

## Styling

This project uses **Tailwind CSS 4** (not SCSS modules). Follow TailAdmin utility patterns in `src/components/` and `src/features/`.

---

## UI / UX

Every change that touches the UI must consider UI/UX, not just make the feature work.

- Decide first who sees it and what they can do. Hide controls and status text that the viewer cannot act on.
- Make it easy to find: put the action where the person already is (for example an Overview prompt), not only in a deep settings tab.
- Check alignment and spacing against neighbouring rows, and cover empty, loading and error states.
- Confirm risky actions (block, delete); keep copy short and plain.
- For non-trivial UI, agree a short mockup before building, and re-check the rendered result afterwards.

---

## Database

Set `DATABASE_URL` in `.env.local` (Neon connection string). Apply schema with `npm run db:schema`.

---

## AgentWitch (local HTTP bridge)

Runs writer CLIs on your computer when the app dispatches a task. The computer client heartbeats and long-polls over HTTP; the browser receives live updates over SSE. Live Mac output uses a PTY shell session (`shell.*` messages; owner can type, requesters get a read-only view and answer `[[AWAITING_INPUT]]` checkpoints).

```bash
# Start app (custom server — not plain next dev)
npm run dev

# Local agent client (one terminal)
npm run agent-witch

# Install to ~/.agent-witch with macOS login autostart
npm run agent-witch:install
```

- HTTP APIs: `/api/agent-witch/heartbeat`, `/commands/poll`, `/messages`, `/events` (SSE)
- Test UI: http://localhost:3000/ws-test
- Status API: `GET /api/agent-witch/status`
- Config: `~/.agent-witch/config.json`
- Watchdog: runs in-process (`startAgentWitchInProcessServices`) and restarts a stale client; `npm run agent-witch:watchdog` for a manual check. There is no separate watchdog LaunchAgent on current installs
- Self-update: triggered when the heartbeat ack reports a newer install bundle (`npm run agent-witch:self-update` for a manual run). There is no hourly updater LaunchAgent on current installs
- A revoked/unlinked device gets `device_not_linked` and retries every 5 minutes (not every 2s); `unknown_identity` still wipes the local connection
- Logs under the profile `logs/` dir are trimmed at 5 MB (keep last 1 MB) on each heartbeat
- Install bundle version API: `GET /install/agent-witch/version` — bump `AGENT_WITCH_INSTALL_BUNDLE_VERSION` in `src/lib/agentWitch/agentWitchInstallBundleVersion.ts` whenever any install script changes
- Local version file: `~/.agent-witch/install-version.json`
- Local watchdog API (wake server): `GET http://127.0.0.1:47892/watchdog/status`, `GET /watchdog/logs`, `POST /watchdog/revive`
- Local harness install API (wake server): `POST http://127.0.0.1:47892/harness/install` — browser sends `{ appOrigin, profileEmail?, bundle: { name, slug, items[] } }` for deterministic writes to `~/.agent-witch/harness/`
- Local knowledge report API (wake server): `POST http://127.0.0.1:47892/knowledge/update` — `{ projectId, lesson, sourceRunId? }`; token-saver documents this for Cursor (`~/.cursor/rules/agent-witch-knowledge-report.mdc`), Codex (`~/.codex/AGENTS.md`), and Claude (`~/.claude/CLAUDE.md`)
- Local self-update API (wake server): `GET http://127.0.0.1:47892/update/status`, `GET /update/logs`, `POST /update/run`
- Server proxy (same computer as wake server): `GET /api/agent-witch/local-watchdog`, `POST /api/agent-witch/local-watchdog`, `GET /api/agent-witch/local-update`, `POST /api/agent-witch/local-update`
- Mid-run input: agent outputs `[[AWAITING_INPUT]]` + question; browser answers over WS; Mac stores pending sessions in `pending-run-inputs.json` (see `.cursor/rules/agent-run-input-protocol.mdc`)

---

## What not to apply from EnergyCenter

Do **not** assume React Router, Vite, Zustand-only state, SCSS modules, `enrg-frontend-styleguide`, Jira PRE tickets, Bitbucket PR workflows, or Redis — this repo is a standalone Next.js app.
