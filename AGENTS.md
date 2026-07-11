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
