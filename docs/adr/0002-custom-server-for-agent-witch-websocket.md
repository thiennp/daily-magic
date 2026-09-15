# ADR 0002: Custom Node server for Agent Witch WebSocket

## Status

Accepted

## Context

Agent Witch needs a long-lived WebSocket from browser and Mac client. Vercel serverless routes do not host the same upgrade path as local development.

## Decision

- Production and local `npm run dev` use `tsx server.ts`: HTTP for Next.js, dedicated upgrade handler for `/api/agent-witch/ws`.
- Origin checks apply on upgrade (`isAllowedAgentWitchOrigin`).

## Consequences

- Do not assume `next dev` alone is sufficient for full Agent Witch testing.
- Deployment docs must mention the custom server entry (`npm run start`).
