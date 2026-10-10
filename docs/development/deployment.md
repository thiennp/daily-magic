# Deploy Agent Witch (production + database)

## Production control plane (WebSocket + dispatch)

**Agent Witch production** runs as a **long-lived Node process** with the custom WebSocket server (`npm start` → `tsx server.ts`), typically on **Railway** using the repo `Dockerfile` and `railway.toml` (migrations in `preDeployCommand`, health check `/api/health`). The production image must include `apps/` and `packages/` so `tsx` can resolve `@agent-witch/*` path aliases at runtime (see `tsconfig.json` `paths`).

See **ADR 0006** (`docs/adr/0006-production-hosting-and-neon.md`) and **ADR 0002** for why serverless-only deploys do not host the computer bridge on `wss://www.agentwitch.com/api/agent-witch/ws`.

Canonical origin: `https://www.agentwitch.com` (`docs/product/repo-name-and-hosting.md`).

## Process health

Railway probes `GET /api/health` (`healthcheckPath` in `railway.toml`, timeout 300 seconds). `server.ts` answers that path with HTTP 200 as soon as the process is listening. The body is JSON from `buildAgentWitchHealthPayload`:

- `ok` is always `true` on this route. A database error does not fail the probe.
- `release.label` is `AGENT_WITCH_SERVER_RELEASE_LABEL` (`src/lib/release/agentWitchServerReleaseLabel.constant.ts`). Bump it when a user-visible server fix must be visible without opening Railway. The AWC nav shows the **install bundle** version (`AWL {AGENT_WITCH_INSTALL_BUNDLE_VERSION}`), not the server release label — compare deploys with `curl` / Railway metadata (see [awc-process-health.md](../qa/awc-process-health.md)).
- `release.commitSha` is the first non-empty of `RAILWAY_GIT_COMMIT_SHA`, `VERCEL_GIT_COMMIT_SHA`, and `GITHUB_SHA`.
- `deviceSupersessionMigrationApplied` is true when `schema_migrations` contains `026-agent-witch-device-supersession.sql`. The result is cached for 60 seconds. A lookup error is reported as `false`.

A 200 does not mean Next or the computer WebSocket is ready. Other routes return **503** `Service starting` until `next.prepare()` finishes, and WebSocket upgrades are dropped until then. Neon connectivity is `GET /api/db/health`, which is a Next route and can 503 during startup.

```bash
curl -sS https://www.agentwitch.com/api/health
```

Full contract and pitfalls: [docs/qa/awc-process-health.md](../qa/awc-process-health.md). Release steps and post-push smoke: [local-release-path.md](../agent-witch/local-release-path.md).

## Database (Neon)

Use Neon PostgreSQL. Set `DATABASE_URL` in the hosting provider (Railway, or Vercel for preview DB-only experiments).

### Migrations

```bash
npm run db:migrate
```

Railway production runs this before start via `preDeployCommand`. Locally, migrations use the `pg` driver (no `psql` required).

Overlapping deploys can run that command at the same time. `db:migrate` holds a transaction advisory lock on one database connection and skips a file already stored in `schema_migrations`, so the second deploy does not fail on a duplicate migration filename.

### Existing databases

If the database was created with `db/schema.sql` before `schema_migrations` existed:

```bash
npm run db:migrate:bootstrap
```

### Manual env var

Set `DATABASE_URL` in the provider’s environment settings, then redeploy.

## Vercel (optional / previews)

`vercel.json` is a minimal Next.js config. **Vercel alone does not replace** `server.ts` for Mac WebSocket upgrades unless you run an equivalent long-lived Node entry on the same origin the computer uses.

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
