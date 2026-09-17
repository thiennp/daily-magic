# Agent Witch local bridge

**AWI** (Mac runtime) connects to **AWC** (`www.agentwitch.com` or local `npm run dev`), receives tasks, and streams writer output back to the browser. **AWL** (`:43347`) is the Mac-local app; **AWB** (`47892`/`47893`) serves browser-on-same-Mac APIs.

Deployables: [agent-witch-deployables.md](../product/agent-witch-deployables.md).

## Install

Production:

```bash
curl -fsSL https://www.agentwitch.com/install/agent-witch.sh | bash
```

Against local app:

```bash
npm run agent-witch:install
```

## Run

```bash
npm run agent-witch
```

## Dev server requirement

Use `npm run dev` (custom `server.ts`) so `/api/agent-witch/ws` WebSocket upgrades work. Use `npm run dev:next` only when you do not need the bridge.

## Test UI

http://localhost:3000/ws-test — send a task to the local agent.

## Server implementation

**AWC** cloud logic: `src/lib/agentWitch/`. **AWC** UI: `src/features/agent-witch/`. **AWL** / **AWB** / **AWI**: `scripts/` (target `apps/live`, `apps/bridge`, `apps/install`).

Presence tiers, dispatch outbox, and writer vs queued work: **ADR 0005** (`docs/adr/0005-shared-mac-presence-and-dispatch-outbox.md`). Production hosting: **ADR 0006**.
