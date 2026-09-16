# ADR 0002: Custom Node server for Agent Witch WebSocket

## Status

Accepted

## Context

Agent Witch needs a long-lived WebSocket from browser and Mac client. Vercel serverless routes and plain `next dev` do not provide the same upgrade path as the production custom server.

Production Mac clients connect to a **fixed** WebSocket URL on `www.agentwitch.com` (ADR 0006), not an operator-edited `wsUrl` in `~/.agent-witch/config.json`.

## Decision

- Production and local `npm run dev` use `tsx server.ts`: HTTP for Next.js, dedicated upgrade handler for `/api/agent-witch/ws`.
- Production start: `npm start` → `NODE_ENV=production tsx server.ts` (Railway `Dockerfile` / `railway.toml`).
- Origin checks apply on upgrade (`isAllowedAgentWitchOrigin`).
- Production install bundle resolves WebSocket to `AGENT_WITCH_PRODUCTION_WS_URL` (`wss://www.agentwitch.com/api/agent-witch/ws`).

## Consequences

- Do not assume `next dev` or `npm run dev:next` alone is sufficient for full Agent Witch testing.
- Deployment runbooks must mention the custom server entry (`npm run start` / `npm run dev`), not only `next build`.
- Mac and browser must target the **same** origin for HTTP and WebSocket (see `docs/product/repo-name-and-hosting.md`).

## Related

- ADR 0005 — hub presence and dispatch on this process
- ADR 0006 — Railway production deployment
