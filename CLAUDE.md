# CLAUDE.md — daily-magic

Project guidance for Claude and other AI agents. Rules live in **`.cursor/rules/`**; scripts in **`.agents/scripts/`**.

---

## Project Overview

**daily-magic** is a Next.js 16 App Router application (React 19, TypeScript, Tailwind CSS 4) with Neon PostgreSQL and a TailAdmin-based UI styleguide.

**Stack:** Next.js · React 19 · TypeScript · Tailwind CSS 4 · Neon (`@neondatabase/serverless`) · Vercel

**Key routes:**

| Path             | Purpose                        |
| ---------------- | ------------------------------ |
| `/`              | Home                           |
| `/styleguide`    | TailAdmin component styleguide |
| `/ws-test`       | Agent Witch WebSocket test UI  |
| `/api/db/health` | Neon connection health check   |
| `/api/notes`     | Sample notes API               |

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

```bash
npm run lint
npm run typecheck
npm run test
npm run validate:all
npm run cursor:architecture -- --all
npm run build
```

Pre-commit runs Prettier, ESLint, `structure-validation`, architecture checks (including **max 100 effective lines** per `src/` file, excluding blank lines and imports), and typecheck on staged `src/` files.

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

## Database

Set `DATABASE_URL` in `.env.local` (Neon connection string). Apply schema with `npm run db:schema`.

---

## Agent Witch (local WebSocket bridge)

Runs Claude CLI on your computer when the app sends a task over WebSocket. Live Mac output uses a PTY shell session (`shell.*` messages; owner can type, requesters get a read-only view and answer `[[AWAITING_INPUT]]` checkpoints). Agent runs attach to that shell transport; pipe-based `terminal.stream.*` remains as a compatibility mirror.

```bash
# Start app with WebSocket upgrade (required — not plain next dev)
npm run dev

# Local agent client (one terminal)
npm run agent-witch

# Install to ~/.agent-witch with macOS login autostart
npm run agent-witch:install
```

- WebSocket: `ws://localhost:3000/api/agent-witch/ws`
- Test UI: http://localhost:3000/ws-test
- Status API: `GET /api/agent-witch/status`
- Config: `~/.agent-witch/config.json`
- Watchdog (macOS): `com.agent-witch-watchdog` LaunchAgent runs every 60s and kickstarts stale WebSocket connections (`npm run agent-witch:watchdog` for a manual check)
- Self-update (macOS): `com.agent-witch-updater` LaunchAgent checks hourly for install bundle updates (`npm run agent-witch:self-update` for a manual run)
- Install bundle version API: `GET /install/agent-witch/version` — bump `AGENT_WITCH_INSTALL_BUNDLE_VERSION` in `src/lib/agentWitch/agentWitchInstallBundleVersion.ts` whenever any install script changes
- Local version file: `~/.agent-witch/install-version.json`
- Local watchdog API (wake server): `GET http://127.0.0.1:47892/watchdog/status`, `GET /watchdog/logs`, `POST /watchdog/revive`
- Local harness install API (wake server): `POST http://127.0.0.1:47892/harness/install` — browser sends `{ appOrigin, profileEmail?, bundle: { name, slug, items[] } }` for deterministic writes to `~/.agent-witch/harness/`
- Local self-update API (wake server): `GET http://127.0.0.1:47892/update/status`, `GET /update/logs`, `POST /update/run`
- Server proxy (same Mac as wake server): `GET /api/agent-witch/local-watchdog`, `POST /api/agent-witch/local-watchdog`, `GET /api/agent-witch/local-update`, `POST /api/agent-witch/local-update`
- Mid-run input: agent outputs `[[AWAITING_INPUT]]` + question; browser answers over WS; Mac stores pending sessions in `pending-run-inputs.json` (see `.cursor/rules/agent-run-input-protocol.mdc`)

---

## What not to apply from EnergyCenter

Do **not** assume React Router, Vite, Zustand-only state, SCSS modules, `enrg-frontend-styleguide`, Jira PRE tickets, Bitbucket PR workflows, or Redis — this repo is a standalone Next.js app.
