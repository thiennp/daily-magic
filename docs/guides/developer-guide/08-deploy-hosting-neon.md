# Chapter 8 — Deploy, hosting, and Neon

Production **Agent Witch** is **`https://www.agentwitch.com`** (repo folder **daily-magic**). Mac clients use a **hardcoded** WebSocket URL — not CHECK24 `daily-magic.*` hosts unless a human explicitly deploys there. Canonical detail: [repo-name-and-hosting.md](../../product/repo-name-and-hosting.md), ADR **0006**.

---

## Why Railway + custom server (not serverless-only)

Writer dispatch and the Mac bridge need a **long-lived Node process** with `getAgentWitchHub()` on `globalThis` (ADR **0005**). The same process that accepts `POST /api/agent-runs/dispatch` must hold the live hub WebSocket for that Mac (or use hub dispatch relay).

| Requirement              | Implementation                                       |
| ------------------------ | ---------------------------------------------------- |
| WebSocket upgrade        | Root `server.ts` — `/api/agent-witch/ws`             |
| Production start         | `npm start` → `NODE_ENV=production tsx server.ts`    |
| Shipped host             | **Docker on Railway** — `Dockerfile`, `railway.toml` |
| Health                   | `GET /api/health`                                    |
| Migrations before deploy | `preDeployCommand`: `npm run db:migrate`             |

Local dev: `npm run dev` (same upgrade path on `http://localhost:3000`). Use `npm run dev:next` only when you explicitly do not need the WebSocket bridge.

`vercel.json` is a minimal Next.js stub — **Vercel alone does not replace** `server.ts` for Mac bridge testing unless you run an equivalent long-lived Node entry on the **same origin** the Mac uses.

---

## Neon database

- **Driver:** `@neondatabase/serverless` via `DATABASE_URL`.
- **Schema:** `db/schema.sql`, incremental `db/migrations/*`.
- **Apply locally:** `npm run db:schema` (needs `psql`) or `npm run db:migrate` (Neon driver, no `psql`).
- **Legacy DBs without `schema_migrations`:** `npm run db:migrate:bootstrap`.

Runbook: [deployment.md](../../development/deployment.md).

### Docker image note

Production image must include `apps/` and `packages/` so `tsx` resolves `@agent-witch/*` path aliases at runtime (`tsconfig.json` `paths`).

---

## Origins, cookies, OAuth

- **Canonical browser origin:** `AGENT_WITCH_DEFAULT_ORIGIN` → `https://www.agentwitch.com`.
- **Mac production WS:** `wss://www.agentwitch.com/api/agent-witch/ws` (`AGENT_WITCH_PRODUCTION_WS_URL`; install bundle **103+** ignores user `config.json` `wsUrl` on production installs).
- **Cursor Cloud dispatch:** production requires allowed app origin (ADR **0004**).
- Base URL helpers: `resolveAppBaseUrl()` — used for OAuth, cookies, links.

---

## Multi-instance production

Railway (or any horizontal scale) may run **multiple replicas**. Writer dispatch must land on the replica that owns the Mac socket, or use **hub dispatch relay** and optional sticky cookie **`aw_hub_instance`** from `GET /api/agent-witch/devices`.

Operational caveats: [Chapter 9](09-known-issues-and-regressions.md) (OPEN-002), ADR **0005**.

---

## Vercel previews (optional)

Acceptable for UI/DB experiments when you do not expect Mac `wsUrl` to match preview URLs. Neon integration can inject `DATABASE_URL` for Preview; `vercel-build` may run migrations before `next build`. See [deployment.md](../../development/deployment.md).

**Cursor Cloud VM:** injected `DATABASE_URL` may point at an unrelated database; export `.env.local` into the shell before `npm run dev` or `psql`. VM-only — not production Agent Witch ops. See root `AGENTS.md`.

---

## Deployables on the Mac (not Railway)

| Abbr    | Role                           | Origin            |
| ------- | ------------------------------ | ----------------- |
| **AWI** | Install bundle, WS client, PTY | `~/.agent-witch`  |
| **AWL** | Local UI                       | `127.0.0.1:43347` |
| **AWB** | Loopback bridge                | `47892` / `47893` |

AWC ships on Railway; AWI/AWL/AWB ship via install bundle version (`AGENT_WITCH_INSTALL_BUNDLE_VERSION`, `GET /install/agent-witch/version`). See [agent-witch-deployables.md](../../product/agent-witch-deployables.md).

---

## Operator checklist

1. Confirm DNS/TLS for `www.agentwitch.com` and WS path `/api/agent-witch/ws`.
2. Set `DATABASE_URL`, `AUTH_SECRET`, OAuth, email keys on Railway.
3. Run or rely on `preDeployCommand` migrations.
4. For multi-replica: enable sticky sessions on `aw_hub_instance` or accept brief relay/handoff windows.
5. After Mac-facing changes: bump install bundle version and verify self-update path.

---

## Query aliases

- Agent Witch production Railway Docker Neon deploy
- server.ts WebSocket www.agentwitch.com not Vercel only
- DATABASE_URL db:migrate railway.toml preDeployCommand
- triển khai Agent Witch Railway Neon migration
- production agentwitch.com wsUrl hardcoded Mac
- Cursor Cloud VM DATABASE_URL env.local override
