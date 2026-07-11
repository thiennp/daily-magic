# Daily Magic

Next.js app connected to [Neon](https://neon.tech) PostgreSQL and deployable on [Vercel](https://vercel.com).

## Stack

- Next.js 16 (App Router)
- Neon serverless Postgres (`@neondatabase/serverless`)
- Vercel deployment

## 1. Local setup

```bash
npm install
cp .env.example .env.local
```

Add your Neon connection string to `.env.local`:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DB?sslmode=require"
```

Create the starter schema in Neon (SQL Editor or `psql`):

```bash
psql "$DATABASE_URL" -f db/schema.sql
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 2. Verify Neon connection

Health check:

```bash
curl http://localhost:3000/api/db/health
```

Expected response:

```json
{ "connected": true, "connectedAt": "..." }
```

Sample notes API:

```bash
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello Neon","body":"First note"}'

curl http://localhost:3000/api/notes
```

## 3. Deploy to Vercel

### Option A: Vercel + Neon integration (recommended)

1. Push this repo to GitHub.
2. In [Vercel](https://vercel.com/new), import the `daily-magic` repository.
3. In the Vercel project, open **Storage** → **Create Database** → **Neon**.
4. Vercel injects `DATABASE_URL` automatically for Production and Preview.
5. Deploy.

### Option B: Manual env var

1. Create a Neon project and copy the connection string.
2. In Vercel → **Project Settings** → **Environment Variables**, add:
   - `DATABASE_URL` = your Neon connection string
3. Redeploy.

### Link from CLI

```bash
npx vercel link
npx vercel env pull .env.local
```

## Project layout

- `src/lib/db.ts` — Neon SQL client
- `src/app/api/db/health/route.ts` — connection health check
- `src/app/api/notes/route.ts` — sample CRUD endpoint
- `db/schema.sql` — starter Postgres schema

## AI harness & quality gates

- `.cursor/` — AI rules, commands, skills (GitHub / Linear friendly)
- `.agents/scripts/` — architecture checks for `src/`
- `.husky/` — pre-commit hooks
- `structure-validation.config.json` — folder layout rules

```bash
npm run validate:staged
npm run cursor:architecture -- --staged
npm run typecheck
```

Agent docs: `CLAUDE.md`, `AGENTS.md`

## Agent Witch (local Claude bridge)

Use the custom server so WebSocket upgrades work (`npm run dev`).

```bash
curl -fsSL https://your-domain.com/install/agent-witch.sh | bash
```

Or locally:

```bash
npm run agent-witch:install  # fetches from http://localhost:3000/install/agent-witch.sh
```

Open http://localhost:3000/ws-test, type a task, and send it to the local agent.

## Useful links

- [Neon + Vercel guide](https://neon.tech/docs/guides/vercel)
- [Neon serverless driver](https://neon.tech/docs/serverless/serverless-driver)
- [Next.js deployment on Vercel](https://nextjs.org/docs/app/building-your-application/deploying)
