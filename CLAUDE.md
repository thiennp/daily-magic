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
npm run validate:all
npm run cursor:architecture -- --all
npm run build
```

Pre-commit runs Prettier, ESLint, `structure-validation`, architecture checks, and typecheck on staged `src/` files.

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

## What not to apply from EnergyCenter

Do **not** assume React Router, Vite, Zustand-only state, SCSS modules, `enrg-frontend-styleguide`, Jira PRE tickets, Bitbucket PR workflows, or Redis — this repo is a standalone Next.js app.
