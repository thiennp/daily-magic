# Deploy to Vercel + Neon

## Vercel + Neon integration (recommended)

1. Import the GitHub repository in Vercel.
2. Add Neon via **Storage** → **Create Database** → **Neon**.
3. Vercel injects `DATABASE_URL` for Production and Preview.
4. Deploy. `vercel-build` runs pending SQL migrations from `db/migrations/` (tracked in `schema_migrations`) before `next build`.

Locally: `npm run db:migrate` (Neon over the network; no `psql` required).

## Existing databases

If the database was created with `db/schema.sql` before `schema_migrations` existed:

```bash
npm run db:migrate:bootstrap
```

## Manual env var

Set `DATABASE_URL` in Vercel → **Project Settings** → **Environment Variables**, then redeploy.

## CLI

```bash
npx vercel link
npx vercel env pull .env.local
```

## References

- [Neon + Vercel](https://neon.tech/docs/guides/vercel)
- [Neon serverless driver](https://neon.tech/docs/serverless/serverless-driver)
- [Next.js on Vercel](https://nextjs.org/docs/app/building-your-application/deploying)
