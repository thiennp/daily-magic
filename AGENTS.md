# AGENTS.md — daily-magic

Canonical agent instructions for Codex, Cursor, Claude, and compatible tools.

Read **`CLAUDE.md`** for project overview, stack, and verification commands.

**Docs-first map:** [docs/README.md](docs/README.md) · **Task paths:** [docs/conventions/load-context.md](docs/conventions/load-context.md) · **Reveal order (L0–L4):** [docs/conventions/agent-context.md](docs/conventions/agent-context.md) · **Domains (L1):** [docs/domains/README.md](docs/domains/README.md) · **Script index:** [docs/conventions/script-index.md](docs/conventions/script-index.md) · **When behavior changes:** [docs/conventions/docs-first.md](docs/conventions/docs-first.md)

## Product vs repository name (read first)

- **Repo folder:** `daily-magic` — this git project.
- **Product / production:** **Agent Witch** at **`https://www.agentwitch.com`** (same codebase).
- **Not Agent Witch:** `daily-magic.d.energie.check24.de` and other CHECK24 hosts — do not use for Mac `wsUrl` or deploy recovery unless the user explicitly says so.

**Deployables (abbrev):** **AWC** Console (cloud) · **AWL** Live (`:43347`) · **AWB** Bridge (`47892`/`47893`) · **AWI** Install (Mac bundle). See **`docs/product/agent-witch-deployables.md`** · rule **`rules-agent-witch-deployables.mdc`**.

Details: **`docs/product/repo-name-and-hosting.md`** · rule **`rules-product-hosting-boundaries.mdc`**.

**Product pillars:** [docs/product/product-pillars.md](docs/product/product-pillars.md) · **Copy guideline (readable):** [docs/product/philosophy-and-copy-guideline.md](docs/product/philosophy-and-copy-guideline.md)

## Harness locations

- **Bootstrap:** `npm run harness:bootstrap` — manifest `.cursor/harness/agent-bootstrap.manifest.json`
- **Rule:** `.cursor/rules/rules-harness-bootstrap.mdc`
- **Invariants:** `.cursor/rules/rules-bundle-core.mdc`
- **Git hooks:** `npm run harness:bootstrap -- --workflow=commit` (doc: `npm run harness:sync`)
- **Rules:** `.cursor/rules/` (registered in `.cursor.json`)
- **Commands:** `.cursor/commands/`
- **Skills:** `.cursor/skills/`
- **Scripts:** `.agents/scripts/` (implementations; see [docs/conventions/script-index.md](docs/conventions/script-index.md) for `npm run` wrappers)
- **Husky:** `.husky/pre-commit`, `.husky/commit-msg`

**Context loading:** read this file → [load-context](docs/conventions/load-context.md) or one [domain](docs/domains/README.md) → optional [script-index](docs/conventions/script-index.md) observe step → `npm run feature-knowledge:query` → feature `README.md` / `KNOWN_ISSUES.md`. Details: [agent-context](docs/conventions/agent-context.md).

## Verification and commit

- Post-change: `@.cursor/commands/command-verify-post-change-lint-typecheck-tests.md`
- Commit: `@.cursor/commands/command-git-commit-quick.md` + `.cursor/harness/git-hooks.md`

Always stage and commit `.feature-knowledge/index.json` when it changed; do not exclude it as unrelated.

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
- **Auth + testing authenticated pages:** Prefer **test auth bypass** (no OAuth / magic link): sign in as `test*@agentwitch.com` via login UI (`npm run dev`), `POST /api/auth/test-login`, Playwright `e2e/helpers/signInTestAccount.ts`, or `npm run test:auth:session` (prints `authjs.session-token` for manual cookies). Gated by `ALLOW_TEST_AUTH=1`, `E2E=1`, or non-production `NODE_ENV`; **disabled on `www.agentwitch.com`**. For `/admin/users`, pass `--super-admin` to the seed script or use a configured super-admin email. Legacy manual path: seed `users` + `sessions` and set the session cookie yourself.
