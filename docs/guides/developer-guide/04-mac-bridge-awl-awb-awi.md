# Chapter 4 — Mac bridge (AWL, AWB, AWI)

**AWI** ships and runs the Mac runtime; **AWL** is the loopback Mac app; **AWB** exposes localhost HTTP for a browser tab on the **same Mac**. **AWC** holds the hub and pairing UI. User-facing connect/update flows: [user guide ch.4 — Mac connect and bridge](../user-guide/04-mac-connect-and-bridge.md).

Deep reference: [docs/agent-witch/local-bridge.md](../../agent-witch/local-bridge.md) · domain [agent-witch.md](../../domains/agent-witch.md).

---

## Ports and origins (memorize)

| Deployable  | Bind                 | Default port                                                           | Notes                                                                                                      |
| ----------- | -------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **AWC**     | `localhost` / public | **3000** (dev) · **8080** common on Railway                            | `npm run dev` → `http://localhost:3000`                                                                    |
| **AWL**     | `127.0.0.1` only     | **43347**                                                              | `http://127.0.0.1:43347` — no vanity hostname ([Q&A awl-loopback-origin](../../qa/awl-loopback-origin.md)) |
| **AWB**     | `127.0.0.1`          | **47892** (prod-origin install) · **47893** (localhost-origin install) | Wake server / identity / harness proxy                                                                     |
| **AWC WSS** | same host as AWC     | path **`/api/agent-witch/ws`**                                         | Production: `wss://www.agentwitch.com/api/agent-witch/ws`                                                  |

---

## Install and config paths

| Path                         | Contents                                                          |
| ---------------------------- | ----------------------------------------------------------------- |
| `~/.agent-witch/`            | Production-style install (LaunchAgents, config, harness)          |
| `~/.local-agent-witch/`      | Localhost-origin dev install variant                              |
| `~/.agent-witch/config.json` | Device identity, app origin — **not** production `wsUrl` override |
| `~/.agent-witch/harness/`    | Harness file drops from browser install API                       |

Install bundle version: bump `AGENT_WITCH_INSTALL_BUNDLE_VERSION` in `src/lib/agentWitch/agentWitchInstallBundleVersion.ts` when install scripts change.

### Commands

```bash
# Against local AWC
npm run agent-witch:install
npm run agent-witch

# Wake server only (debug AWB)
npm run agent-witch:wake-server

# Production curl install
curl -fsSL https://www.agentwitch.com/install/agent-witch.sh | bash
```

Shipped bundle build: `npm run build:agent-witch` (runs in `npm run build`).

---

## Code map (today → target)

| Abbr                | Implementation today                                             | Target folder            |
| ------------------- | ---------------------------------------------------------------- | ------------------------ |
| AWI                 | `scripts/agent-witch.ts`, `public/install/agent-witch/`          | `apps/install/`          |
| AWL                 | `scripts/agentWitchAppEntry.ts`, `scripts/agentWitchLocalApp.ts` | `apps/live/`             |
| AWB                 | `scripts/agent-witch-wake-server.ts`                             | `apps/bridge/`           |
| AWC client protocol | `src/lib/agentWitch/*`, `packages/shared/`                       | `apps/console/` (future) |

Registry: [agent-witch-deployables.md](../../product/agent-witch-deployables.md).

---

## AWB HTTP surface (same Mac as browser)

Local wake server (typical **`127.0.0.1:47892`**):

| Method | Path                                 | Purpose                                                                                                         |
| ------ | ------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| GET    | `/health`                            | Liveness                                                                                                        |
| GET    | `/identity`                          | “This computer” token for AWC pages ([Q&A awb-localhost-identity](../../qa/awb-localhost-identity-and-cors.md)) |
| GET    | `/watchdog/status`, `/watchdog/logs` | Watchdog diagnostics                                                                                            |
| POST   | `/watchdog/revive`                   | Kick stale client                                                                                               |
| GET    | `/update/status`, POST `/update/run` | Self-update                                                                                                     |
| POST   | `/harness/install`                   | Deterministic harness writes from browser                                                                       |

AWC proxies some routes when the tab is on the same Mac:

- `GET/POST /api/agent-witch/local-watchdog`
- `GET/POST /api/agent-witch/local-update`

Mac client cloud HTTP (legacy long-poll paths still documented in CLAUDE.md): heartbeat, commands poll, messages, events SSE — primary live path is **WebSocket** to AWC.

---

## WebSocket client (AWI → AWC)

1. Mac opens **`wss://<app-origin>/api/agent-witch/ws`** with session/device identity after pairing.
2. `server.ts` upgrades and registers client in hub + **`agent_witch_connections`** (ADR 0005).
3. Writer/shell traffic flows hub ↔ Mac; browser subscribes over the same hub connection model.

**Requires** `npm run dev` or `npm run start` — not `npm run dev:next` alone.

Test from browser: **`/ws-test`** on AWC.

---

## Watchdog and self-update (macOS)

| LaunchAgent                | Manual check                      |
| -------------------------- | --------------------------------- |
| `com.agent-witch-watchdog` | `npm run agent-witch:watchdog`    |
| `com.agent-witch-updater`  | `npm run agent-witch:self-update` |

Install bundle version API: `GET /install/agent-witch/version`.

---

## Common agent mistakes

| Mistake                                   | Truth                                                                                                          |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| AWL reachable from AWC server-side fetch  | AWL is **loopback-only** on the user’s Mac                                                                     |
| AWB up ⇒ dispatch ready                   | Writer needs **live WSS on AWC** ([Q&A awc-mac-reconnecting](../../qa/awc-mac-reconnecting-vs-local-live.md))  |
| Point `wsUrl` at CHECK24 daily-magic host | Production Mac uses **agentwitch.com** ([hosting doc](../../product/repo-name-and-hosting.md))                 |
| Folder picker in AWC for Mac paths        | Use AWL/AWB `select-folder` ([Q&A awc-project-folder-path-picker](../../qa/awc-project-folder-path-picker.md)) |

Open issues: `src/features/agent-witch/KNOWN_ISSUES.md`.

---

## Related

| Topic               | Link                                                          |
| ------------------- | ------------------------------------------------------------- |
| User Mac connect    | [user guide ch.4](../user-guide/04-mac-connect-and-bridge.md) |
| Local dev           | [Chapter 1](01-local-dev-and-env.md)                          |
| Hub / ADR 0002      | [Chapter 3](03-architecture-map.md)                           |
| Dispatch & presence | [Chapter 5](05-dispatch-presence-and-runs.md)                 |

```bash
npm run feature-knowledge:query -- "AWB identity 47892" --feature=docs
npm run feature-knowledge:query -- "Mac WebSocket" --feature=agent-witch
```

---

## Query aliases

- AWL AWB AWI ports 43347 47892 agent-witch install harness
- Mac bridge wake server identity this computer
- npm run agent-witch install bundle LaunchAgent
- cầu nối Mac Agent Witch, cài đặt AWI, cổng loopback
