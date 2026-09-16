# Domain: Mac bridge & devices

**Scope:** Mac install bundle, local client, WebSocket to `/api/agent-witch/ws`, device pairing, presence, writer sessions, local wake/watchdog APIs.

**Registry slugs:** `agent-witch`, `mac-devices` · **Lib:** `src/lib/agentWitch` · **APIs:** `/api/agent-witch/*`

## Skim (L1)

- Mac runs `~/.agent-witch` client; production `wss` targets **www.agentwitch.com** (see hosting doc).
- Hub lives in the Node process with Next (`server.ts`); not available with `npm run dev:next` alone.
- Operational caveats: `src/features/agent-witch/KNOWN_ISSUES.md`.

## Read next if…

| If you need…                          | Open                                                                    |
| ------------------------------------- | ----------------------------------------------------------------------- |
| Install, local dev, test UI           | [agent-witch/local-bridge.md](../agent-witch/local-bridge.md)           |
| Presence / dispatch queue semantics   | [adr/0005](../adr/0005-shared-mac-presence-and-dispatch-outbox.md)      |
| Custom server requirement             | [adr/0002](../adr/0002-custom-server-for-agent-witch-websocket.md)      |
| Wrong origin / CHECK24 host confusion | [product/repo-name-and-hosting.md](../product/repo-name-and-hosting.md) |
| Device UI components                  | L2 `src/features/agent-witch/README.md`, `macDevices/README.md`         |

```bash
npm run feature-knowledge:query -- "Mac WebSocket presence" --feature=agent-witch
```
