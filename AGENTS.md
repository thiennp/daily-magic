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
- **`DATABASE_URL` currently points at an UNRELATED database.** The injected `DATABASE_URL` secret resolves to a different product's Neon database (Wishees/greeting-card/Amazon-affiliate app: ~50 tables, real `users` rows). Do **NOT** run `npm run db:schema` or apply `db/migrations/*` against it — daily-magic's `users`/`accounts`/`groups`/etc. schema conflicts with the existing `users` table (`bigint` id vs `text`) and applying it risks other data. The `notes` table there happens to be schema-compatible, so `/api/db/health` and `/api/notes` (the README hello-world) work safely without any schema changes. Full auth + DB-backed features (login, `/admin/*`, groups, agent runs, capabilities) require a **dedicated empty Neon database** — set `DATABASE_URL` to that, then `npm run db:schema` + apply `db/migrations/*` (needs the `psql` client, a system dependency not in the update script).
- **Auth is unconfigured by default:** no `AUTH_GOOGLE_ID/SECRET` and no `AUTH_RESEND_KEY`+`EMAIL_FROM` are set, so NextAuth boots with zero providers and interactive login is impossible. A dev `AUTH_SECRET` is generated into `.env.local` (gitignored) so the server boots cleanly. For UI work without login, use the `/demo/*` routes (`/demo/agent`, `/demo/reports`, `/demo/marketplace`, `/demo/home`, `/demo/admin/groups`) — they render the real product UI from mock fixtures with no DB or auth.
