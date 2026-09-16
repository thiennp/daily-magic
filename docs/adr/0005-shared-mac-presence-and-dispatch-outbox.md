# ADR 0005: Shared Mac presence registry and durable dispatch outbox

## Status

Accepted

## Context

"Mac online, dispatch-ready" is process-local state: the live WebSocket lives in an in-memory `Map` inside one Node process (`AgentWitchHubBase.clients`, held on `globalThis` by `getAgentWitchHub`). Dispatch fails closed when no live socket is found — HTTP command pull was retired in AGENT-022 because a fresh `last_seen_at` lied about readiness.

The consequence is structural, not a bug in one function: any request handled by a process that does not hold the Mac's socket sees an empty hub and returns `The selected Mac is not online right now.` Two distinct failure classes produced that one message:

| Class | Cause                                         | Examples                                                                                          |
| ----- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| A     | Request lands on a process without the socket | Multiple replicas, deploy or restart, browser origin whose backend differs from the Mac's `wsUrl` |
| B     | Mac genuinely not connected at that instant   | Client reconnect window, install-bundle self-update restart, laptop asleep                        |

Class A is a lie the system tells about its own state unless presence is classified. Class B is real, but surfacing it as a hard error is wrong for work that could simply wait.

## Decision

### Prerequisite

WebSocket termination and every dispatch route run in the same deployment class as production Agent Witch (ADR 0006: Railway + `tsx server.ts`). Dispatch routes must not be served by a platform that cannot hold the upgrade on the same origin as `AGENT_WITCH_PRODUCTION_WS_URL`.

### Shared presence registry

Persist one row per live agent connection, owned by the process holding the socket:

```sql
CREATE TABLE IF NOT EXISTS agent_witch_connections (
  client_id TEXT PRIMARY KEY,
  device_id TEXT NOT NULL REFERENCES agent_witch_devices(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  instance_id TEXT NOT NULL,
  connected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_ack_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

Lifecycle hooks reuse existing call sites:

- `registerClient()` in `attachAgentWitchWebSocket` inserts once `agent.register` resolves `userId` and `deviceId`.
- `updateClient()` updates the row when enrichment resolves a previously unknown `deviceId`.
- The heartbeat handler touches `last_ack_at`.
- `unregisterClient()` and `socket.on("close")` delete the row.
- Process startup deletes rows for its own `instance_id` (crash residue); a sweeper deletes rows older than ~3× the heartbeat interval.

`instance_id` is generated once per process and held on `globalThis`, matching how the hub itself is shared.

Presence resolution checks the local hub first (unchanged fast path), then the registry for **other** instances. Cross-instance delivery for queueable work goes through the outbox rather than direct instance-to-instance RPC.

**Writer / shell interactive dispatch** uses a short-lived **`agent_witch_hub_dispatch_relay`** table when the registry shows the Mac live on another `instance_id`: the HTTP handler that lacks the socket enqueues a relay row for the owner instance, polls for completion (≤ ~15s), and returns the owner’s result. The owner replica drains relay rows on a 1s poll (and on outbox drain). Writer runs are still created only after hub client resolution on the executing Node — never queued as `running` (AGENT-022).

`GET /api/agent-witch/devices` sets an **`aw_hub_instance`** HttpOnly cookie (local hub id or registry owner) so operators can optionally configure load-balancer sticky routing to the socket-owning replica.

### Durable dispatch outbox

```sql
CREATE TABLE IF NOT EXISTS agent_witch_dispatch_outbox (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_id TEXT NOT NULL REFERENCES agent_witch_devices(id) ON DELETE CASCADE,
  idempotency_key TEXT NOT NULL UNIQUE,
  message_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('queued', 'delivered', 'expired', 'cancelled')),
  attempts INTEGER NOT NULL DEFAULT 0,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  delivered_at TIMESTAMPTZ
);
```

The process owning the socket drains `queued` rows for a device on `agent.register`, plus a short poll for rows enqueued by another instance. `idempotency_key` makes redelivery safe.

Only work that can legitimately wait is queued:

- **Queued:** harness install, harness write-items, capability template install, marketplace install push, automation dispatch.
- **Not queued** (needs a live session on **this** hub process): `shell.*`, `writer.*` dispatch, `writer.input.respond`, `writer.stop`, terminal control. These fail fast with a classified error.

### Presence tiers and API fields

`GET /api/agent-witch/devices` exposes four tiers via `presenceTier`:

| Tier                  | Meaning                                       | `isConnected` | `isDispatchReady`              | Writer send-a-task                         |
| --------------------- | --------------------------------------------- | ------------- | ------------------------------ | ------------------------------------------ |
| `live`                | Agent socket on **this** Node hub             | `true`        | `true` (same as `isConnected`) | Allowed                                    |
| `live_other_instance` | Registry says socket on another `instance_id` | `false`       | `false`                        | Relay to owner instance or retry / refresh |
| `recent`              | `last_seen_at` within ~90s, no live socket    | `false`       | `false`                        | Not allowed                                |
| `offline`             | Otherwise                                     | `false`       | `false`                        | Not allowed                                |

`isOnline` remains `true` for `live`, `live_other_instance`, or `recent` (visibility / wake hints). **Do not** treat `isOnline` alone as writer-ready.

Home hero “Mac online” counts only `live` on this process; `live_other_instance` is shown as reconnecting (see `resolveHomeMacStatusSummary`).

### Unified live client resolution

Devices API and writer dispatch must use the **same** hub matching rules:

- `resolveLiveAgentClientsByDeviceIdForUser` — enrich agents, then `resolveOnlineClientsByDeviceId` (pairing token + `deviceId`).
- `collectLiveAgentWitchDeviceIdsForUser` — keys of that map (`live` tier).
- `findEnrichedAgentClientForUser` — `map.get(deviceId)` for targeted dispatch.
- `retargetWriterRunToSoleLiveMac` — when the requested `targetDeviceId` is stale but exactly one live agent exists on this hub, retarget to the canonical device id (token-resolved id preferred over stale hub `deviceId`).
- `resolveDispatchTargetAgentClient` — the single entry point every dispatch caller uses. It applies, in order: exact live match, forward supersession resolution, sole-live-Mac retarget, and returns the live client plus the **resolved** device id. `resolveLiveWriterAgentForRun` delegates to it.

Do not resolve live Macs via `findAgentClientForUser` + raw `client.deviceId` alone; that diverged from the devices API and caused “online in UI, offline on dispatch”.

### Device supersession

`agent_witch_devices.superseded_by_device_id` (nullable self-referencing FK) records which row replaced a revoked one. Sibling revocation during heartbeat consolidation sets it, so a device id held by a browser query param, a stored selection, or an old `agent_runs` row stays resolvable forward via `resolveCurrentAgentWitchDeviceId` (bounded hop count, cycle-safe).

Freshness is never derived from a revoked row: `last_seen_at` stops advancing once `revoked_at` is set, so a revoked row is classified as replaced rather than stale.

### Response contract

Structured `errorCode` on dispatch failures:

- `mac_reconnecting` — registry or recent heartbeat suggests handoff / reconnect (client may retry writer dispatch).
- `mac_offline` — the targeted row is active, has no live socket, and was not recently seen.
- `mac_replaced` — the targeted row was revoked by a re-pair and no successor is live; the user must reselect the Mac.
- `mac_queued` — outbox accepted queueable work.

`buildTargetMacOfflineDispatchError` and `deliverOrQueueAgentWitchDispatchMessage` implement the split. New code branches on `errorCode`, not string equality on `errorMessage`.

### Rollout

Shipped in stages with tests: registry + migration; lifecycle wiring; presence tiers on devices API; outbox enqueue/drain; error classification + client retry; unified live resolution + writer retarget (2026).

## Consequences

- **Class A** is mitigated for writer dispatch via **hub dispatch relay** and optional **`aw_hub_instance` sticky routing**; brief deploy handoff can still return `mac_reconnecting` until the registry and relay align (OPEN-002 in `KNOWN_ISSUES.md`).
- **Class B** becomes a visible wait (`mac_reconnecting`, queued outbox) rather than a generic offline string for queueable types.
- Interactive shell and writer messages still fail during reconnect windows by design; they gain clearer causes and limited client retry instead of silent queuing.
- Presence fallback adds database reads; the local-hub map path is unchanged for the common `live` case.
- Registry rows are authoritative only while heartbeats continue; the sweeper bounds stale ownership.
- Reintroducing “queued” as “running” would repeat the AGENT-022 hazard; writer runs are created only after hub client resolution succeeds.

## References

- `src/lib/agentWitch/resolveLiveAgentClientsByDeviceIdForUser.ts`
- `src/lib/agentWitch/agentWitchHubDispatchRelay.ts`, `processAgentWitchHubDispatchRelaysForHub.ts`
- `src/lib/dispatch/tryDispatchClaudeRunThroughHubRelay.ts`
- `src/lib/agentWitch/resolveDispatchTargetAgentClient.ts`, `resolveCurrentAgentWitchDeviceId.ts`
- `src/features/agent-witch/KNOWN_ISSUES.md` (OPEN-001–003)
- ADR 0002 (WebSocket server), ADR 0006 (production hosting)
