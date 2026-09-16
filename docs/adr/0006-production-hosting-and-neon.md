# ADR 0006: Production hosting (Railway, custom server, Neon)

## Status

Accepted

## Context

Agent Witch requires a **long-lived Node process** that holds the Agent Witch WebSocket hub in memory (`getAgentWitchHub` on `globalThis`). Interactive writer and shell dispatch read that hub on the same process that handles `POST /api/agent-runs/dispatch` (see ADR 0005).

The repository is named **daily-magic**; the production product is **Agent Witch** at `https://www.agentwitch.com` (see `docs/product/repo-name-and-hosting.md`). Mac clients use a **hardcoded** production WebSocket URL (`AGENT_WITCH_PRODUCTION_WS_URL` in `src/lib/agentWitch/constants.ts`), not per-user `config.json` `wsUrl`, so production must terminate WebSockets on that origin.

Historical docs described “Vercel + Neon” only. The shipped production path for the full control plane (including WebSocket upgrade) is **Docker on Railway** (`railway.toml`, `Dockerfile`, `npm start` → `tsx server.ts`). `vercel.json` remains a minimal Next.js stub and does **not** replace the custom server for Agent Witch.

## Decision

- **Production (Agent Witch):** Deploy via Railway using the repo `Dockerfile`. `startCommand` is `npm start` (`NODE_ENV=production tsx server.ts`). Run DB migrations in `preDeployCommand` (`npm run db:migrate`). Health check: `/api/health`.
- **Database:** Neon PostgreSQL via `DATABASE_URL` (shared across environments that point at the same project DB).
- **Canonical browser origin:** `https://www.agentwitch.com` (`AGENT_WITCH_DEFAULT_ORIGIN`). OAuth, cookies, and Cursor Cloud origin checks use `resolveAppBaseUrl()`.
- **Mac WebSocket:** `wss://www.agentwitch.com/api/agent-witch/ws` for production installs (install bundle **103+**). Local dev: `npm run dev` on `http://localhost:3000` with the same upgrade path.
- **Vercel:** Acceptable for experiments, previews, or UI-only work **without** expecting Mac bridge or writer dispatch to work unless the deployment runs `server.ts` with WebSocket support on the same origin the Mac uses. Do not document CHECK24 hosts (`daily-magic.d.energie.check24.de`) as Agent Witch production unless explicitly deployed there.

## Consequences

- Operators must scale or route **writer traffic** to instances that can hold Mac sockets, or accept `live_other_instance` / `mac_reconnecting` during handoff (OPEN-002 in `src/features/agent-witch/KNOWN_ISSUES.md`).
- Preview deployments on serverless-only platforms will not match Mac `wsUrl` unless deliberately configured; use Railway or local `npm run dev` for bridge testing.
- Deployment runbooks live in `docs/development/deployment.md` (Neon + migration) and this ADR (Railway + custom server).
