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

**Symptom:** After deploy, picker may show **Online (another server)** (`live_other_instance`); Send-a-task disabled, `mac_reconnecting`, or “not online” for a short window even though the Mac process is healthy.

**Cause:** Interactive writer/shell dispatch requires a **live hub WebSocket on the same Node process** that handles `POST /api/agent-runs/dispatch`. Registry and heartbeats can show the Mac on another instance during handoff. Queueable work (harness install, automations) uses the outbox; writer runs do not.

**Mitigations (shipped):** `presenceTier` on devices API; `mac_reconnecting` vs `mac_offline`; auto-pick a `live` Mac when stored preference is stale; composer copy for `live_other_instance`; client retry on `errorCode: mac_reconnecting` only (runs are created only after hub client resolution succeeds).

**What to do:** Wait for handoff or refresh devices; ensure bundle **103+** on the Mac; pick a Mac that shows **Online** (not “another server”) for send-a-task.

---

## OPEN-003 — Stale install bundle on the Mac until update runs

**Symptom:** Cloud shows a newer install bundle than the Mac; old client behavior (missing fixes) until update completes.

**Cause:** Self-update depends on heartbeat push, wake `POST /update/run`, or hourly updater — can lag if wake API or network fails.

**What to do:** Run **Update local** / `npm run agent-witch:self-update` on the Mac; check `~/.agent-witch/install-version.json` vs `GET /install/agent-witch/version`.
