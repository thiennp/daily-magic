# Chapter 3 — Architecture map

One map for **where code lives**, **how AWC boots**, and **which ADRs bind behavior**. Users see surfaces in [user guide ch.3 — Home and navigation](../user-guide/03-home-and-navigation.md); this chapter is for edits under `src/`, `server.ts`, and `db/`.

Query before large refactors:

```bash
npm run feature-knowledge:query -- "your symptom" --feature=docs
npm run feature-knowledge:query -- "dispatch" --feature=dispatch
```

---

## Deployables in one repo

| Abbr    | Role                          | Primary paths today                                                           |
| ------- | ----------------------------- | ----------------------------------------------------------------------------- |
| **AWC** | Cloud console + APIs + WS hub | `src/app/`, `server.ts`, `src/features/*`, `src/lib/*`                        |
| **AWL** | Mac UI                        | `scripts/agentWitchLocalApp*`, target `apps/live/` · `:43347`                 |
| **AWB** | Loopback bridge               | `scripts/agent-witch-wake-server.ts`, target `apps/bridge/` · `47892`/`47893` |
| **AWI** | Install/runtime               | `public/install/agent-witch/`, `scripts/agent-witch.ts`, `~/.agent-witch`     |

Registry: [docs/product/agent-witch-deployables.md](../../product/agent-witch-deployables.md) · `apps/deployables.registry.json`.

Shared contracts: **`@agent-witch/shared`** in `packages/shared/`.

---

## `server.ts` — custom Node entry (AWC)

File: **`server.ts`** (repo root).

Responsibilities:

1. **`createServer`** — serves Next via `app.getRequestHandler()` after `next.prepare()`.
2. **`GET /api/health`** — liveness on the Node process (503 until Next is ready).
3. **WebSocket upgrade** — only path `AGENT_WITCH_WS_PATH` (default **`/api/agent-witch/ws`**).
4. **Upgrade guards** — `isSecureAgentWitchUpgrade`, `isAllowedAgentWitchOrigin`.
5. **Auth on upgrade** — cookie → `resolveAuthActorFromCookieHeader`; fallback `resolveDevDashboardActor` when dev dashboard env is set.
6. **Hub** — `getAgentWitchHub()` + `attachAgentWitchWebSocket` · registry maintenance via `startAgentWitchConnectionRegistryMaintenance`.

Mac production WebSocket URL is **hardcoded** to `wss://www.agentwitch.com/api/agent-witch/ws` (install bundle), not user-edited `wsUrl`.

**ADR 0002:** [Custom server for Agent Witch WebSocket](../../adr/0002-custom-server-for-agent-witch-websocket.md).

```bash
npm run dev    # tsx server.ts
npm run start  # NODE_ENV=production tsx server.ts
```

Diagram: [docs/architecture/system-map.md](../../architecture/system-map.md).

---

## WebSocket and hub

| Piece                          | Path                                                 |
| ------------------------------ | ---------------------------------------------------- |
| Hub singleton                  | `src/lib/agentWitch/getAgentWitchHub.ts`             |
| Attach / messages              | `src/server/agentWitch/attachAgentWitchWebSocket.ts` |
| Origin / TLS checks            | `src/lib/agentWitch/isAllowedAgentWitchUpgrade.ts`   |
| Connection registry (Postgres) | ADR 0005 — `agent_witch_connections`                 |
| Feature UI                     | `src/features/agent-witch/`                          |

Browser and Mac share the **same origin** for HTTPS and WSS in production ([repo-name-and-hosting.md](../../product/repo-name-and-hosting.md)).

---

## Layout: features, lib, routes (ADR 0003)

| Layer                     | Location                  | Rule                                                      |
| ------------------------- | ------------------------- | --------------------------------------------------------- |
| Product UI + feature docs | `src/features/<slug>/`    | Registry: `src/features/_registry/features.registry.json` |
| Shared server modules     | `src/lib/<area>/`         | e.g. `agentWitch`, `dispatch`, `auth`                     |
| HTTP handlers             | `src/app/api/**/route.ts` | Next App Router — stay here                               |
| Shared UI                 | `src/components/`         | No imports from features or app routes                    |

**ADR 0003:** [Feature UI with server lib co-location](../../adr/0003-feature-ui-with-server-lib.md).

Enforcement: `npm run cursor:architecture` · [codebase-map.md](../../architecture/codebase-map.md).

---

## Fractal slices (incremental)

**ADR 0007 (proposed):** `public-api/` + `internal/` per feature; cross-feature integration via hubs. Policy: [fsa-workflows.md](../../conventions/fsa-workflows.md).

Do not block daily fixes on a full FSA migration — follow existing paths unless an ADR/task explicitly moves a slug.

---

## Dispatch and presence (ADR 0004–0005 pointers)

| ADR                                                               | Topic                                                                 | Developer chapter                             |
| ----------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------- |
| [0004](../../adr/0004-cursor-cloud-dispatch-origin.md)            | Production Cursor Cloud dispatch requires matching `Origin`/`Referer` | [Chapter 5](05-dispatch-presence-and-runs.md) |
| [0005](../../adr/0005-shared-mac-presence-and-dispatch-outbox.md) | `agent_witch_connections`, outbox, presence tiers, writer relay       | [Chapter 5](05-dispatch-presence-and-runs.md) |

Mac bridge install and ports: [Chapter 4](04-mac-bridge-awl-awb-awi.md).

Hosting (long-lived Node, Neon): **ADR 0006** — [Chapter 8](08-deploy-hosting-neon.md).

---

## Key feature slugs (AWC)

| Slug          | Routes / APIs                          | libPath (typical)    |
| ------------- | -------------------------------------- | -------------------- |
| `agent-witch` | `/api/agent-witch/*`                   | `src/lib/agentWitch` |
| `dispatch`    | `/api/agent-runs/*`, `/api/dispatch/*` | `src/lib/dispatch`   |
| `agent`       | `/agent`, `/ws-test`                   | —                    |
| `auth`        | `/login`, `/api/auth/*`                | `src/lib/auth`       |
| `reports`     | `/reports`                             | run history APIs     |

Full table: [codebase-map.md](../../architecture/codebase-map.md).

Domain entries (L1): [docs/domains/README.md](../../domains/README.md).

---

## Agent reading order (this repo)

1. [Chapter 0](00-philosophy-and-mismatch-traps.md)
2. This chapter + the **numbered chapter** from [guide-maintenance.map.json](../guide-maintenance.map.json) for your path prefix
3. Feature `README.md` + `KNOWN_ISSUES.md`
4. ADRs 0002–0006 when touching server, WS, dispatch, or deploy

---

## Related

| Topic           | Link                                                       |
| --------------- | ---------------------------------------------------------- |
| User navigation | [user guide ch.3](../user-guide/03-home-and-navigation.md) |
| Local dev       | [Chapter 1](01-local-dev-and-env.md)                       |
| Mac bridge      | [Chapter 4](04-mac-bridge-awl-awb-awi.md)                  |
| Dispatch        | [Chapter 5](05-dispatch-presence-and-runs.md)              |

---

## Query aliases

- server.ts WebSocket /api/agent-witch/ws getAgentWitchHub architecture
- daily-magic src/features src/lib ADR 0002 0003 0004 0005
- AWC codebase map Next.js App Router custom server
- kiến trúc Agent Witch, WebSocket hub, fractal slice
