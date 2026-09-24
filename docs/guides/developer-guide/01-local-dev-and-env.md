# Chapter 1 — Local dev and environment

Engineers and coding agents need a **dedicated Neon database**, the **custom Node server**, and correct **`DATABASE_URL` sourcing** before changing AWC, dispatch, or auth. End users follow [user guide ch.1 — Getting started](../user-guide/01-getting-started.md) for first sign-in and Mac install; this chapter is the repo-side mirror.

Prior reading: [Chapter 0](00-philosophy-and-mismatch-traps.md) · [AGENTS.md](../../../AGENTS.md).

---

## Prerequisites

| Requirement           | Notes                                                                                                                                                                   |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Node.js 24**        | Matches CI (see root `package.json` / workflows)                                                                                                                        |
| **Neon PostgreSQL**   | Empty project DB for daily-magic schema — not a shared unrelated Neon                                                                                                   |
| **`psql`** (optional) | For `npm run db:schema`; migrations use `tsx` + Neon driver                                                                                                             |
| **Mac** (optional)    | AWL/AWB plus Mac AWI for the local Mac app. An x86_64 Linux host can run AWI for dispatch; cloud-only work skips both ([Q&A](../../qa/linux-browser-vs-linux-host.md)). |

---

## First-time setup

```bash
cd /path/to/daily-magic
npm install
cp .env.example .env.local
```

Edit **`.env.local`** (gitignored):

| Variable                                | Purpose                                              |
| --------------------------------------- | ---------------------------------------------------- |
| `DATABASE_URL`                          | Neon connection string for **this** product’s schema |
| `AUTH_SECRET`                           | Auth.js session signing (`openssl rand -base64 32`)  |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Google OAuth (optional if using test login only)     |
| `AUTH_RESEND_KEY` or `RESEND_API_KEY`   | Magic-link email (optional in dev with test login)   |
| `EMAIL_FROM`                            | Verified Resend sender domain                        |

Apply schema to the empty database:

```bash
set -a; . ./.env.local; set +a
npm run db:schema
# or migrations (closer to production deploy):
npm run db:migrate
```

If the DB predates `schema_migrations`:

```bash
npm run db:migrate:bootstrap
```

Health check:

```bash
curl -sS http://localhost:3000/api/db/health
```

Detail: [docs/development/setup.md](../../development/setup.md).

---

## Dev server (AWC)

**Always use the custom server** for Agent Witch work:

```bash
set -a; . ./.env.local; set +a
npm run dev
```

| Command            | Entry                               | WebSocket `/api/agent-witch/ws`       |
| ------------------ | ----------------------------------- | ------------------------------------- |
| `npm run dev`      | `tsx server.ts`                     | **Yes**                               |
| `npm run dev:next` | `next dev`                          | **No** — do not use for Mac bridge QA |
| `npm run start`    | `NODE_ENV=production tsx server.ts` | **Yes**                               |

- **URL:** `http://localhost:3000` (default `PORT=3000`, `HOST=0.0.0.0`)
- **Extra health:** `GET /api/health` on the Node server (not only Next routes)
- **Test send UI:** `http://localhost:3000/ws-test`

ADR: [0002 — Custom server for WebSocket](../../adr/0002-custom-server-for-agent-witch-websocket.md).

---

## Typecheck and build (fresh checkout)

`npm run typecheck` needs Next-generated types once:

```bash
npm run build   # or start dev once — creates next-env.d.ts (gitignored)
npm run typecheck
```

On Cursor Cloud and other clean VMs this step recurs every checkout.

---

## Cursor Cloud VM — `DATABASE_URL` caveats

These apply **only to the Cloud Agent VM** (see [AGENTS.md](../../../AGENTS.md)); do not treat them as production ops guidance for `www.agentwitch.com`.

### Wrong injected database

The environment may inject a **`DATABASE_URL`** that points at an **unrelated** Neon project (different product, conflicting `users` schema). daily-magic expects `users.id` as **text**; a foreign schema can break migrations and auth silently.

**Fix:** Put the correct daily-magic Neon URL in **`.env.local`** on that VM (dedicated empty DB).

### `.env.local` does not override injected env

Next.js / `@next/env` **will not overwrite** variables already in `process.env`. Injected `DATABASE_URL` (and sometimes `RESEND_API_KEY`) win unless you export `.env.local` into the shell **first**:

```bash
set -a; . ./.env.local; set +a
npm run dev
# or before psql / db:schema / test:auth:session:
psql "$DATABASE_URL" -c 'select 1'
```

Without this, `npm run dev` and `psql "$DATABASE_URL"` may talk to the **wrong** database even when `.env.local` looks correct.

### Schema on the dedicated DB

After `DATABASE_URL` is correct in the shell:

```bash
npm run db:schema
```

Migration `003-published-capabilities.sql` may log a harmless “constraint already exists” if `schema.sql` already created the FK — idempotent overlap is expected.

---

## Mac client (optional local loop)

Against local AWC:

```bash
npm run agent-witch:install   # ~/.agent-witch
npm run agent-witch           # AWI runtime (AWL + AWB in one process today)
```

Production install uses `https://www.agentwitch.com/install/agent-witch.sh` — see [user guide ch.4](../user-guide/04-mac-connect-and-bridge.md) and [developer ch.4](04-mac-bridge-awl-awb-awi.md).

---

## Verification scripts (agents)

After substantive code edits (not required for reading this chapter):

```bash
npm run harness:bootstrap -- --workflow=verify
```

Routing map for which guide chapter matches a path: [guide-maintenance.map.json](../guide-maintenance.map.json).

---

## Related

| Topic                | Link                                                                                                     |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| User first run       | [user guide ch.1](../user-guide/01-getting-started.md)                                                   |
| Test sign-in         | [Chapter 2](02-auth-and-test-login.md)                                                                   |
| Architecture         | [Chapter 3](03-architecture-map.md)                                                                      |
| Hosting / production | [Chapter 8](08-deploy-hosting-neon.md) (when present)                                                    |
| Domain: development  | [docs/domains/development.md](../../domains/development.md)                                              |
| AI self-registration | [ai-self-registration-webmcp.md](../../qa/ai-self-registration-webmcp.md) — optional `AGENTMAIL_API_KEY` |

---

## Query aliases

- local dev Agent Witch daily-magic npm run dev server.ts
- Neon DATABASE_URL schema db:migrate Cursor Cloud VM wrong database
- set -a env.local override injected DATABASE_URL
- localhost 3000 ws-test typecheck next-env.d.ts
- phát triển local Agent Witch, cơ sở dữ liệu Neon, Cursor Cloud DATABASE_URL
- Linux host AWI local dev, Linux browser console
