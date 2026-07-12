# AGENTS.md — daily-magic

Canonical agent instructions for Codex, Cursor, Claude, and compatible tools.

Read **`CLAUDE.md`** for project overview, stack, and verification commands.

## Harness locations

- **Rules:** `.cursor/rules/` (registered in `.cursor.json`)
- **Commands:** `.cursor/commands/`
- **Skills:** `.cursor/skills/`
- **Scripts:** `.agents/scripts/`
- **Husky:** `.husky/pre-commit`, `.husky/commit-msg`

## Required checks before commit

```bash
npm run validate:staged
npm run cursor:architecture -- --staged
npm run typecheck
```

## Commit message format

Conventional commits are preferred:

```
feat: add notes API pagination
fix(db): surface missing DATABASE_URL in health route
```

Ticket-prefixed commits are also accepted:

```
LIN-123: (feat) Add notes pagination
GH-42: (fix) Health route error handling
```

## Tech stack constraints

- Next.js App Router (`src/app/`)
- Tailwind CSS 4 — not SCSS modules
- Neon serverless driver for Postgres
- React Context is acceptable for theme/sidebar (TailAdmin pattern)

Do not introduce EnergyCenter-specific tooling (React Router, Vite, Zustand mandates, Bitbucket/Jira automation) unless explicitly requested.

## Cursor Cloud specific instructions

Standard commands live in `CLAUDE.md` / `README.md` / `package.json`. Notes below are non-obvious caveats for this environment (dependencies are already installed by the startup `npm install`).

- **Dev server:** `npm run dev` runs the custom `tsx server.ts` (not `next dev`) so the Agent Witch WebSocket upgrade works; it listens on `http://localhost:3000`. Use `npm run dev:next` only when you explicitly do not need the WebSocket bridge.
- **Typecheck needs a build first:** `npm run typecheck` (`tsc --noEmit`) fails on a fresh checkout with `Cannot find module './*.svg'` because Next.js has not yet generated `next-env.d.ts`. Run `npm run build` (or start `npm run dev`) once to generate it, then typecheck passes. `next-env.d.ts` is gitignored, so this recurs on every clean VM.
- **The injected `DATABASE_URL` secret points at an UNRELATED database.** It resolves to a different product's Neon database (Wishees/greeting-card/Amazon-affiliate app: ~50 tables, real `users` rows) whose `users` table conflicts with daily-magic's schema (`bigint` id vs `text`). The correct daily-magic Neon connection string (plus `AUTH_SECRET`, Google OAuth, and Resend keys) is kept in **`.env.local`** (gitignored, not in the repo, per-VM). Point at a **dedicated empty Neon database** before applying schema.
- **CRITICAL — `.env.local` does NOT override injected env vars.** Next.js/`@next/env` will not overwrite a variable already present in `process.env`, and the VM injects `DATABASE_URL` (and `RESEND_API_KEY`) as real env vars. So `npm run dev` and `psql "$DATABASE_URL"` use the WRONG (injected) database unless you first export `.env.local` into the shell: `set -a; . ./.env.local; set +a`. Do this before starting the dev server or running `psql`, or the app silently talks to the unrelated database.
- **Applying the schema:** once `DATABASE_URL` points at the dedicated empty DB, run `npm run db:schema` (needs the `psql` client — a system dependency, not in the update script). `db/migrations/*` largely overlap `db/schema.sql` and are idempotent; migration `003-published-capabilities.sql` throws a harmless "constraint ... already exists" error because `schema.sql` already created that FK.
- **Auth + testing authenticated pages:** Google OAuth and Resend are configured via `.env.local`, but real login needs external Google consent or an email inbox (not doable headlessly). NextAuth uses the **database** session strategy, so to test logged-in/`/admin/*` pages, seed a row in `users` (`global_role='super_admin'`) + `sessions`, then set the browser cookie `authjs.session-token=<sessions.session_token>` (plain `authjs.` prefix because `AUTH_URL` is `http://`). For UI work without any login, use the `/demo/*` routes (`/demo/agent`, `/demo/reports`, `/demo/marketplace`, `/demo/home`, `/demo/admin/groups`) — real product UI from mock fixtures, no DB or auth.
