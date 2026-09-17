# Deploy Agent Witch (production + database)

## Production control plane (WebSocket + dispatch)

**Agent Witch production** runs as a **long-lived Node process** with the custom WebSocket server (`npm start` → `tsx server.ts`), typically on **Railway** using the repo `Dockerfile` and `railway.toml` (migrations in `preDeployCommand`, health check `/api/health`). The production image must include `apps/` and `packages/` so `tsx` can resolve `@agent-witch/*` path aliases at runtime (see `tsconfig.json` `paths`).

See **ADR 0006** (`docs/adr/0006-production-hosting-and-neon.md`) and **ADR 0002** for why serverless-only deploys do not host the Mac bridge on `wss://www.agentwitch.com/api/agent-witch/ws`.

Canonical origin: `https://www.agentwitch.com` (`docs/product/repo-name-and-hosting.md`).

## Database (Neon)

Use Neon PostgreSQL. Set `DATABASE_URL` in the hosting provider (Railway, or Vercel for preview DB-only experiments).

### Migrations

```bash
npm run db:migrate
```

Railway production runs this before start via `preDeployCommand`. Locally, migrations use the Neon driver (no `psql` required).

### Existing databases

If the database was created with `db/schema.sql` before `schema_migrations` existed:

```bash
npm run db:migrate:bootstrap
```

### Manual env var

Set `DATABASE_URL` in the provider’s environment settings, then redeploy.

## Vercel (optional / previews)

`vercel.json` is a minimal Next.js config. **Vercel alone does not replace** `server.ts` for Mac WebSocket upgrades unless you run an equivalent long-lived Node entry on the same origin the Mac uses.

For Vercel + Neon integration (preview UI, env pull):

1. Import the GitHub repository in Vercel.
2. Add Neon via **Storage** → **Create Database** → **Neon**.
3. Vercel injects `DATABASE_URL` for Production and Preview.
4. Deploy. `vercel-build` runs pending SQL migrations from `db/migrations/` before `next build`.

```bash
npx vercel link
npx vercel env pull .env.local
```

## References

- [Neon + Vercel](https://neon.tech/docs/guides/vercel)
- [Neon serverless driver](https://neon.tech/docs/serverless/serverless-driver)
- [Next.js on Vercel](https://nextjs.org/docs/app/building-your-application/deploying)
- ADR index: `docs/adr/README.md`
