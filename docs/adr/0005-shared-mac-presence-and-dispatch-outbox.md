# ADR 0005: Shared Mac presence registry and durable dispatch outbox

## Status

Accepted

## Context

"Mac online, dispatch-ready" is process-local state: the live WebSocket lives in an in-memory `Map` inside one Node process (`AgentWitchHubBase.clients`, held on `globalThis` by `getAgentWitchHub`). Dispatch fails closed when no live socket is found — HTTP command pull was retired in AGENT-022 because a fresh `last_seen_at` lied about readiness.

The consequence is structural, not a bug in one function: any request handled by a process that does not hold the Mac's socket sees an empty hub and returns `The selected Mac is not online right now.` Two distinct failure classes produce that one message:

| Class | Cause                                         | Examples                                                                                          |
| ----- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| A     | Request lands on a process without the socket | Multiple replicas, deploy or restart, browser origin whose backend differs from the Mac's `wsUrl` |
| B     | Mac genuinely not connected at that instant   | Client reconnect window, install-bundle self-update restart, laptop asleep                        |

Class A is a lie the system tells about its own state. Class B is real, but surfacing it as a hard error is wrong for work that could simply wait.

Presence tiers already distinguish `isConnected` (live socket on this hub) from `isOnline` (live or seen within ~90s) in `buildAgentWitchDevicesWithOnlineStatus`, so the UI can disagree with dispatch whenever the socket lives elsewhere.

## Decision

### Prerequisite

WebSocket termination and every dispatch route run in the same deployment. Production is Railway (`railway.toml`, `npm start` → `tsx server.ts`). Dispatch routes must not be served by a platform that cannot hold the upgrade.

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

Presence resolution checks the local hub first (unchanged fast path), then the registry. Cross-instance delivery goes through the outbox rather than direct instance-to-instance calls, so no Redis or private networking is required.

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
- **Not queued** (needs a live session): `shell.*`, `writer.input.respond`, `writer.stop`, terminal control. These fail fast, but with a cause the user can act on.

### Response contract

Replace the single offline message with a structured `errorCode` and three outcomes: `queued` (with a run id to follow), `retry` (client retries; Mac is reconnecting or attached to another instance), and `offline` (Agent Witch not running; offer wake). Device presence becomes four tiers — `live`, `live_other_instance`, `recent`, `offline` — so the Mac picker and dispatch agree. `isMacDispatchOfflineErrorMessage` keeps working for older clients but new code branches on `errorCode`, not string equality.

### Rollout

Staged, one commit per step with tests: registry module and migration; lifecycle wiring; presence tiers through the devices API and Mac picker; outbox enqueue and drain; error classification with client retry; then `KNOWN_ISSUES.md`, regression tests, and `npm run feature-knowledge:index`.

## Consequences

- Class A disappears once presence is shared: the UI stops reporting a Mac as available when dispatch cannot reach it.
- Class B becomes a visible wait rather than a failure for queued message types. It cannot be eliminated — a powered-off Mac cannot run anything — so "queued" is the honest end state, not "sent".
- Interactive shell and writer-session messages still fail during reconnect windows by design; they gain a clearer cause and client-side retry instead of silent queuing that would strand a session.
- Presence resolution adds a database read on the fallback path. The local-hub fast path is unchanged, so the common case keeps its current cost.
- Registry rows are authoritative only while heartbeats continue; the sweeper window (~3× heartbeat) bounds how long a crashed instance can appear to own a device.
- Reintroducing queued delivery reopens the AGENT-022 hazard if "queued" is ever presented as "running". The contract above keeps them distinct states.
