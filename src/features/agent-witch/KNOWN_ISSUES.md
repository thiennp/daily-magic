# Agent Witch bridge — known issues

This file lists **open** product risks and **operational** caveats only. Shipped regressions are removed here; they remain guarded by Vitest — search the repo for `AGENT-` in test names and descriptions (for example `macDevicePresence.test.ts`, `resolveWriterRunAgentClient.test.ts`, `agentWitchConnectionRegistry.test.ts`).

Architecture for multi-instance presence and the dispatch outbox: `docs/adr/0005-shared-mac-presence-and-dispatch-outbox.md`.

---

## OPEN-001 — Mac cannot resolve `www.agentwitch.com` (DNS / network)

**Symptom:** `getaddrinfo ENOTFOUND www.agentwitch.com` in `~/.agent-witch/*.error.log`; WebSocket never connects; cloud shows offline or “seen recently” only.

**Cause:** Client/network DNS or firewall — not fixed by app config alone. Production installs use hardcoded `wss://www.agentwitch.com/api/agent-witch/ws` (install bundle **103+**).

**What to do:** Fix DNS/VPN/firewall on the Mac; confirm `dig www.agentwitch.com` or equivalent; reinstall or self-update to bundle **103+** if the client is older.

---

## OPEN-002 — Writer send-a-task needs `live` on the dispatch Node (multi-instance)

**Symptom:** After deploy or with multiple Railway replicas, the Mac picker may show **Online (another server)** (`live_other_instance`); send-a-task may return **Mac reconnecting** briefly even though the Mac process is healthy.

**Cause:** Interactive writer/shell dispatch still requires a **live hub WebSocket on the same Node process** that handles `POST /api/agent-runs/dispatch`. The shared registry classifies cross-replica presence; it cannot move an in-memory socket between processes.

**Mitigations (shipped):** `presenceTier` on devices API; writer dispatch **fails closed** with `errorCode: mac_reconnecting` or `mac_offline` (no “running” run + outbox queue — AGENT-022); `buildWriterDispatchTargetMacOfflineError`; auto-pick / retarget a `live` Mac when the stored device id is stale; composer copy for `live_other_instance`; browser retry on `mac_reconnecting` (`retryPostClaudePromptDispatch`); `aw_hub_instance` affinity cookie set by `GET /api/agent-witch/devices` so load balancers that honor cookie stickiness route dispatch toward the socket-owning instance.

**Residual risk:** If the edge does not honor `aw_hub_instance`, dispatch may land on a replica without the socket until client retry succeeds or the Mac reconnects to that replica after deploy handoff. Single-replica deploys avoid Class A entirely.

**What to do:** Wait for retry/handoff or refresh devices; ensure bundle **103+** on the Mac; prefer a Mac that shows **Online** (not “another server”) for send-a-task; configure sticky sessions on the load balancer when running multiple replicas.

---

## OPEN-003 — Stale install bundle on the Mac until update runs

**Symptom:** Cloud shows a newer install bundle than the Mac; old client behavior (missing fixes) until update completes.

**Cause:** Self-update depends on heartbeat push, wake `POST /update/run`, or hourly updater — can lag if wake API or network fails.

**What to do:** Run **Update local** / `npm run agent-witch:self-update` on the Mac; check `~/.agent-witch/install-version.json` vs `GET /install/agent-witch/version`.
