# Agent Witch local bridge

Agent Witch is the Mac client that heartbeats to Daily Magic, receives tasks, and streams writer CLI output back to the browser.

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

Cloud-side logic: `src/lib/agentWitch/`. UI: `src/features/agent-witch/`.
