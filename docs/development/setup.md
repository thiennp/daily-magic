# Local setup

## Prerequisites

- Node.js 24 (see CI)
- Neon PostgreSQL `DATABASE_URL` (or local Postgres with the project schema)
- Optional: `psql` for `npm run db:schema`

## Install

```bash
npm install
cp .env.example .env.local
```

Set `DATABASE_URL` and auth-related variables in `.env.local` (Google OAuth, `AUTH_SECRET`, Resend for email login).

## Database

Apply schema:

```bash
psql "$DATABASE_URL" -f db/schema.sql
```

Or use migrations (matches Vercel deploy):

```bash
npm run db:migrate
```

If the database predates `schema_migrations`, bootstrap once:

```bash
npm run db:migrate:bootstrap
```

## Dev server

```bash
npm run dev
```

Open http://localhost:3000. This runs `tsx server.ts` (not plain `next dev`) so Agent Witch WebSocket upgrades work.

## Health check

```bash
curl http://localhost:3000/api/db/health
```

## Agent Witch locally

```bash
npm run agent-witch:install
npm run agent-witch
```

Test UI: http://localhost:3000/ws-test

## Sample notes API

Legacy tutorial endpoint (optional):

```bash
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello","body":"Note"}'
```
