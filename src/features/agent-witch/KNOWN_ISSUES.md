# Agent Witch bridge — known issues

This file lists **open** product risks and **operational** caveats only. Shipped regressions are removed here; they remain guarded by Vitest — search the repo for `AGENT-` in test names and descriptions (for example `macDevicePresence.test.ts`, `resolveWriterRunAgentClient.test.ts`, `agentWitchConnectionRegistry.test.ts`).

Architecture for multi-instance presence and the dispatch outbox: `docs/adr/0005-shared-mac-presence-and-dispatch-outbox.md`.

---

## OPEN-001 — Mac cannot resolve `www.agentwitch.com` (DNS / network)

**Symptom:** `getaddrinfo ENOTFOUND www.agentwitch.com` in `~/.agent-witch/*.error.log`; WebSocket never connects; cloud shows offline or “seen recently” only.

**Cause:** Client/network DNS or firewall — not fixed by app config alone. Production installs use hardcoded `wss://www.agentwitch.com/api/agent-witch/ws` (install bundle **103+**).

**What to do:** Fix DNS/VPN/firewall on the Mac; confirm `dig www.agentwitch.com` or equivalent; reinstall or self-update to bundle **103+** if the client is older.

---

## OPEN-002 — Writer New task dispatch across multi-instance replicas

**Symptom:** After deploy or with multiple Railway replicas, the Mac picker could show **Online (another server)** (`live_other_instance`); **New task** dispatch failed or briefly showed `mac_reconnecting` even though the Mac process was healthy.

**Cause:** Writer dispatch needs the Mac’s live hub WebSocket on the Node that executes `POST /api/agent-runs/dispatch`. Round-robin HTTP routing landed dispatch on a replica without that socket.

**Mitigations (shipped):**

- **Hub dispatch relay:** when the registry shows the Mac live on another `instance_id`, the dispatch API enqueues a short-lived relay row for that owner instance, waits for the owner to run writer dispatch locally, and returns the result — without queueing writer runs as `running` (AGENT-022).
- **Dispatch affinity cookie:** `GET /api/agent-witch/devices` sets `aw_hub_instance` so operators can enable load-balancer sticky sessions to the socket-owning replica when desired.
- **Fail closed:** if neither local hub nor relay succeeds, dispatch returns structured `mac_reconnecting` / `mac_offline` (client retry on `mac_reconnecting` only); runs are created only after hub client resolution on the executing Node.
- Existing: `presenceTier`, auto-pick a `live` Mac when preference is stale, composer copy for `live_other_instance`.

**Residual risk:** During deploy handoff, registry rows can lag for a few seconds; relay wait timeout or sticky cookie mismatch can still surface `mac_reconnecting` until the Mac reconnects and devices refresh.

**What to do:** Refresh devices / retry **New task**; ensure install bundle **103+**; for multi-replica production, enable sticky routing on `aw_hub_instance` or accept brief handoff windows.

---

## OPEN-003 — Stale install bundle on the Mac until update runs

**Symptom:** Cloud shows a newer install bundle than the Mac; old client behavior (missing fixes) until update completes.

**Cause:** Self-update depends on heartbeat push, wake `POST /update/run`, or hourly updater — can lag if wake API or network fails.

**UI (shipped):** New task composer shows **`update_needed`** readiness (blocks Send, **Update agent** CTA). Home Mac rows flag bundle mismatch in device detail. Contract: `docs/agent-witch/send-readiness-reason-codes.md`.

**What to do:** Run **Update local** / `npm run agent-witch:self-update` on the Mac; check `~/.agent-witch/install-version.json` vs `GET /install/agent-witch/version`.

---

## AGENT-067 — Update local wrote bash into `com.agent-witch.plist`

**Symptom:** After **Update local**, AWC stayed on **Mac reconnecting** (`presenceTier: recent`) and `wake.sh` could not load the official LaunchAgent. Default AWB `:47892` was down.

**Cause:** The install script wrote process-host `if` / `cat` bash inside the LaunchAgent plist heredoc, so `launchctl bootstrap` rejected the file. AWL Update always posted to default `:47892`, missed a fallback wake port, and fell back to a direct file copy that did not repair the plist.

**Fix (must hold for every later bundle):**

- Close the plist XML heredoc before optional env keys; append those keys with `cat >> "$PLIST_PATH"`.
- `register_agent_witch_launch_agent` lints XML (`plutil` + reject leaked bash) before bootstrap.
- `ensureAgentWitchLaunchAgentPlist` rewrites a missing/invalid plist on client start, AWL **Update**, heartbeat self-update, and kickstart/self-update (bundle **125+**).
- AWL `/update/run` uses `wake-port.json` when present (`resolveAgentWitchRuntimeWakePort`).

**What to do on a Mac that already has the broken plist:** install bundle **125+** self-update, or restart AWI — the client rewrites the plist. If cloud says the Mac identity is not linked, run **Connect this Mac** from Home while signed in.

**Regression tests:** `buildAgentWitchInstallScriptLaunchAgent.test.ts`, `renderInstallAgentWitchScriptProcessHost.test.ts`, `buildAgentWitchInstallScriptProcessHostBash.test.ts`, `ensureAgentWitchLaunchAgentPlist.test.ts`, `isAgentWitchLaunchAgentPlistXmlValid.test.ts`, `buildAgentWitchInstallScriptRegisterLaunchAgent.test.ts`, `resolveAgentWitchRuntimeWakePort.test.ts`, `triggerAgentWitchLocalInstallBundleUpdate.test.ts`, `requestLocalAgentWitchSelfUpdate.test.ts` (AGENT-067).

**Q&A:** `docs/qa/awi-update-local-launchagent-plist.md`
