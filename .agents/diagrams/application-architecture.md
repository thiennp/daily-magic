# Application architecture (daily-magic)

Next.js 16 App Router application.

## Layers

| Layer      | Path              | Responsibility                           |
| ---------- | ----------------- | ---------------------------------------- |
| Routes     | `src/app/`        | Pages, layouts, API route handlers       |
| Features   | `src/features/`   | Feature-specific UI sections and logic   |
| Components | `src/components/` | Shared TailAdmin UI                      |
| Lib        | `src/lib/`        | Database client, shared server utilities |
| Hooks      | `src/hooks/`      | Reusable React hooks                     |
| Context    | `src/context/`    | Theme and layout providers               |

## Data

- Neon PostgreSQL via `@neondatabase/serverless`
- Schema in `db/schema.sql`
- `DATABASE_URL` in `.env.local` / Vercel env

## Import rules (enforced)

- `src/features/` must not import `src/app/` routes
- `src/components/` must not import `src/features/` or `src/app/`
- `src/lib/` must not import UI or route modules

See `.agents/scripts/lib/srcLayerImportRules.ts`.
