# Neon → Railway Postgres cutover (one-off)

The app talks to Postgres through `pg` (`src/lib/db.ts`), so it works against Neon and Railway with only a `DATABASE_URL` change. Deploy the `pg` driver first (still on Neon), then cut over.

## 0. Prepare (no downtime)

1. Merge the `pg` driver PR and let Railway deploy it. Check `/api/db/health` is green (still on Neon).
2. In the Railway project, add **Postgres** (same project as the app, so the private network is used). Note the two URLs:
   - `RAILWAY_URL_PRIVATE` → `DATABASE_URL` reference variable (`${{Postgres.DATABASE_URL}}`), used by the app.
   - `RAILWAY_URL_PUBLIC` → the TCP proxy URL, used only from your Mac for restore.
3. Have `pg_dump` / `pg_restore` ≥ the Neon server version (`brew install libpq` or `postgresql@17`).

## 1. Cutover (about 5–15 min of downtime)

```bash
# Stop writers first: quit the local agent-witch client, then scale the Railway app to 0 replicas (or pause deploys).

export NEON_URL='postgresql://…neon.tech/…?sslmode=require'      # direct (non-pooled) endpoint
export RAILWAY_URL_PUBLIC='postgresql://…proxy.rlwy.net:PORT/railway'

pg_dump "$NEON_URL" -Fc --no-owner --no-acl -f agentwitch.dump
pg_restore --no-owner --no-acl --clean --if-exists -d "$RAILWAY_URL_PUBLIC" agentwitch.dump
```

Verify before switching:

```bash
for t in users project_task_records schema_migrations; do
  echo "$t  neon=$(psql "$NEON_URL" -Atc "select count(*) from $t")  railway=$(psql "$RAILWAY_URL_PUBLIC" -Atc "select count(*) from $t")"
done
```

Counts must match. Then:

1. Railway app service → Variables → set `DATABASE_URL` to the Railway Postgres **private** URL.
2. Scale the app back up / redeploy. `preDeployCommand` (`npm run db:migrate`) runs against the new DB and should report nothing pending.
3. Check `/api/db/health`, sign in, send one task from `/ws-test`, restart the local agent-witch client.
4. Update `.env.local` / any other place that holds the old `DATABASE_URL`.

## 2. Rollback (within the first days)

Set `DATABASE_URL` back to the Neon URL and redeploy. Neon still holds the pre-cutover data (writes after cutover are on Railway only, so roll back early). Keep Neon untouched for 1–2 weeks.

## 3. After 1–2 weeks

- Delete the Neon project(s) in the Neon console (manual, irreversible).
- Add a daily backup: a Railway cron service running `pg_dump "$DATABASE_URL" -Fc` to S3/R2. Railway Postgres has no point-in-time restore.

## Notes

- Use the Neon **direct** endpoint (not `-pooler`) for `pg_dump`.
- Railway private-network URLs do not work at build time, only at runtime and in `preDeployCommand`.
- Neon pools are gone: `pg` pool max is 10 per instance (`src/lib/db.ts`). Railway Postgres defaults to `max_connections=100`.
