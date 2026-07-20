# Agent Witch bridge — known issues

## AGENT-041 — Mac client crash-looped after bundle 33 (missing install scripts)

**Symptom:** Dashboard showed no Mac connected; `~/.agent-witch/agent-witch.error.log` repeated `ERR_MODULE_NOT_FOUND` for `agentWitchRunCompletionOutbox` (and would also miss `agentWitchRunHeartbeat.constant`).

**Cause:** Bundle **33** added run-heartbeat/outbox logic in `agentWitchRunSessions.ts` but omitted the new dependency files from `AGENT_WITCH_CLIENT_INSTALL_SCRIPT_NAMES`, so fresh installs and self-updates downloaded a broken client.

**Fix:** Add `agentWitchRunCompletionOutbox.ts`, `agentWitchRunHeartbeat.constant.ts`, and `formatAgentWitchInstallBundleVersionLabel.ts` to the install allowlist. Install bundle **36**.

**Regression tests:** `agentWitchInstallSelfRepair.test.ts`, `agentWitchRunCompletionOutbox.test.ts` (AGENT-041).

---

## AGENT-039 — Cloud could not tell if a Mac run was still alive or finished

**Symptom:** Send-a-task progress could show "Working on your request" indefinitely when the Mac WebSocket dropped after the CLI finished, or when the Mac worker died without sending `command.claude.result`.

**Cause:** Liveness was inferred from terminal stream chunks and device heartbeats, not from the active CLI child. Completion relied on a single in-flight WS message with no retry.

**Fix:** Mac emits `run.heartbeat` every 15s while a CLI child is alive. Cloud stores `last_run_heartbeat_at`, rebroadcasts lightweight `run.heartbeat` to the dashboard (stall clock reset), and reconciles `RUNNING` runs with no heartbeat for 3 minutes to `failed`. Mac persists a completion outbox and retries `POST /api/agent-witch/runs/:id/complete` on reconnect. Mac reports `installBundleVersion` on `agent.heartbeat`; agentwitch.com Home + Mac pickers show per-device bundle vs cloud bundle with mismatch highlighting. Local server header shows bundle version. Install bundle **35**.

**Regression tests:** `reconcileStaleAgentRuns.test.ts`, `agentWitchRunCompletionOutbox.test.ts`, `buildMacDeviceDetailText.test.ts`, `isAgentWitchInstallBundleVersionBehind.test.ts` (AGENT-039 / AGENT-041).

---

## AGENT-040 — Multiple dashboard SSE connections per page

**Symptom:** Network tab showed several parallel `/api/agent-witch/events` streams while Send-a-task, dispatch approval, and job history each opened their own `EventSource`.

**Cause:** `AgentRunLocalCacheListener`, `connectDispatchApprovalSocket`, Send-a-task, and Reports hooks each subscribed independently.

**Fix:** Root `AgentWitchDashboardProvider` owns one SSE + HTTP shim; inbound messages run onboarding + cache sync once, then fan out on a pub/sub bus. `agentWitchDashboardBus.test.ts`, `handleAgentWitchDashboardInboundMessage.test.ts` (AGENT-040).

---

## AGENT-030 — Install bundle lagged until hourly self-update

**Symptom:** Mac kept an old install bundle until the hourly LaunchAgent updater ran, even while connected and heartbeating.

**Fix:** Every `agent.heartbeat` `system.ack` includes `installBundleVersion`. The Mac compares `~/.agent-witch/install-version.json` and auto-runs wake `POST /update/run` with `force` when they differ; logs to console + local traffic. Install bundle **32**.

**Regression tests:** `buildAgentWitchHeartbeatAckPayload.test.ts`, `shouldTriggerAgentWitchHeartbeatSelfUpdate.test.ts`, `readInstallBundleVersionFromHeartbeatAck.test.ts`, `handleAgentHeartbeatMessageAsync.test.ts` (AGENT-030).

---

## AGENT-029 — Port-80 local.agentwitch.com proxy conflicted with other apps

**Symptom:** Hiding `:43347` required a root LaunchDaemon on `127.0.0.1:80`, which blocks other local servers (Apache, nginx, MAMP, etc.) that need loopback port 80.

**Fix:** Removed the privileged `:80` proxy. Advertise `http://local.agentwitch.com:43347` again (DNS loopback only; no root). Install bundle **31**.

**Regression tests:** `agentWitchLocalAppPort.constant.test.ts` (AGENT-029).

---

## AGENT-028 — Local UI only advertised as 127.0.0.1:43347

**Symptom:** Mac debug UI was hard to remember as a raw loopback URL.

**Fix:** Advertise `http://local.agentwitch.com:43347` (`AGENT_WITCH_LOCAL_APP_ORIGIN`). DNS `A`/`AAAA` for `local` → `127.0.0.1`/`::1` at the registrar; process still binds `127.0.0.1` only (AGENT-021). No privileged port-80 proxy (see AGENT-029).

**Regression tests:** `agentWitchLocalAppPort.constant.test.ts` (AGENT-028).

---

## AGENT-027 — Revive WebSocket showed while the bridge was healthy

**Symptom:** Local status always offered **Revive WebSocket**, even when the Mac bridge WebSocket was already connected.

**Fix:** Render the revive control only when `wsConnected` is false. Install bundle **28**.

**Regression tests:** `shouldShowAgentWitchLocalReviveButton.test.ts` (AGENT-027).

---

## AGENT-026 — Local UI did not match Agent Witch styleguide

**Symptom:** `http://127.0.0.1:43347` used a dark slate system-font shell unlike the site’s Outfit + zinc marketing surfaces.

**Fix:** Local status/traffic/knowledge pages reuse the marketing shell patterns (sticky blur header, logo mark, zinc cards/buttons, status badges). Install bundle **27**.

**Regression tests:** `buildAgentWitchLocalAppShell.test.ts` (AGENT-026).

---

## AGENT-025 — Local UI showed absolute ISO timestamps

**Symptom:** `http://127.0.0.1:43347` status/traffic/knowledge showed raw ISO strings (e.g. `2026-07-19T08:00:31.073Z`) instead of how long ago an event happened.

**Fix:** Format timestamps as relative ages (`just now`, `N mins ago`, `Nh … ago`, `N days ago`, …). Absolute ISO remains on hover via `title`. Install bundle **26**.

**Regression tests:** `formatAgentWitchRelativeTimeAgo.test.ts` (AGENT-025).

---

## AGENT-017 — Mac↔cloud must use mutual WebSocket (not HTTP poll)

**Symptom:** Mac transport depended on HTTP heartbeat / command poll / messages; reconnects and device auth were weak; traffic lived only on a cloud debug page.

**Root cause:** HTTP poll was a temporary replacement for a split in-memory WebSocket hub and did not support mutual device auth or a local traffic/knowledge UI.

**Fix:** Restore `/api/agent-witch/ws` with Ed25519 device keypair + server attestation. Mac client serves local UI on `:43347` (status, traffic, knowledge). Mac HTTP `heartbeat` / `commands/poll` / `messages` return 410. Install bundle version **22**.

**Regression tests:** `agentWitchEd25519.test.ts` (AGENT-017), `buildAgentWitchDevicesWithOnlineStatus.test.ts`.

---

## AGENT-018 — Online status ignored live WS hub clients

**Symptom:** Device looked offline when `last_seen_at` was stale even though the Mac had a live WebSocket on the hub.

**Root cause:** `buildAgentWitchDevicesWithOnlineStatus` only looked at heartbeat timestamps.

**Fix:** Pass hub live device ids into the online-status builder; live hub presence marks `isConnected` / `isOnline`. Fresh `last_seen_at` alone is recent (`isOnline`) but not connected — see AGENT-022.

**Regression tests:** `buildAgentWitchDevicesWithOnlineStatus.test.ts` (AGENT-018).

---

## AGENT-019 — No post-install AI picker over the Mac bridge

**Symptom:** After install, users had no cloud UI to install/sign in Cursor / Claude / Codex / Antigravity (product names, not “CLI”).

**Fix:** `/setup/writer` on agentwitch.com sends WS `writer.ensure`; Mac replies `writer.status`. Writer install/login runs only for the CLI the user picks there (not on every reconnect).

---

## AGENT-042 — Mac reconnect auto-opened Claude login

**Symptom:** Every Agent Witch WebSocket reconnect ran `ensure-writer.sh` for Cursor, Claude, Codex, and Antigravity, which could open Claude login even when the user planned to use Cursor.

**Fix:** Remove the connect-time writer login sweep. Keep `writer.ensure` for explicit `/setup/writer` picks and task dispatch for the selected writer only. Install bundle **37**.

**Regression test:** `agent-witch.writerLoginCheck.test.ts` (AGENT-042).

---

## AGENT-043 — Cloud did not actively push install bundle updates

**Symptom:** Home showed `Bundle 36 · update available (cloud 37)` for an hour while the Mac stayed on bundle 36. Users expected the cloud to tell the Mac to update immediately, not wait for passive heartbeat logic or the hourly updater.

**Fix:** On every agent heartbeat with a behind bundle, cloud now sends `install.bundle.update` over the live WebSocket. The Mac runs install bundle update from that message (and still from `system.ack` as backup). If the wake-server update API is unreachable, the Mac falls back to direct `runAgentWitchSelfUpdate`. Install bundle **38**.

**Regression tests:** `deliverAgentWitchInstallBundleUpdateIfBehind.test.ts`, `handleAgentHeartbeatInstallBundlePush.test.ts`, `runLocalInstallBundleUpdate.test.ts` (AGENT-043).

---

## AGENT-044 — Cursor auth error did not trigger login over WebSocket

**Symptom:** Live terminal feedback showed `Error: Authentication required. Please run 'cursor agent login' first, or set CURSOR_API_KEY environment variable.` but the Mac did not open Cursor login automatically.

**Fix:** When agent output (writer session chunks, terminal stream chunks, or `command.claude.result`) contains that Cursor auth error, the cloud server sends `writer.ensure` with `writerAgent: "cursor"` over the live WebSocket (throttled per device). No install bundle bump — reuses existing Mac `writer.ensure` handling.

**Regression tests:** `isCursorAuthenticationRequiredError.test.ts`, `deliverAgentWitchCursorLoginIfAuthenticationRequired.test.ts`, `agentWitchHub.cursorAuthLoginPush.test.ts` (AGENT-044).

---

## AGENT-020 — Cloud tasks had no local knowledge injection

**Symptom:** Finished local turns were not reused as context for later cloud-originated tasks.

**Fix:** Local Ollama embeddings under `~/.agent-witch/rag/`; query + inject before tasks; browse/search on `http://127.0.0.1:43347/knowledge`.

---

## AGENT-006 — Reinstall/link created a second device for the same Mac

**Symptom:** After a fresh local install + account link, Home showed both a new connected row and the previous named Mac for the same hostname.

**Root cause:** Link claimed with a new pairing token and always `INSERT`ed a device row. The Mac hostname was not sent on link, so the server could not reclaim the existing row.

**Fix:** Mac link posts `deviceLabel: os.hostname()`. `claimAgentWitchDevice` rotates `token_hash` onto the user’s active device with the same label (skipping generic `"Mac"`).

**Regression tests:** `findActiveAgentWitchDeviceByUserAndLabel.test.ts` (AGENT-006).

---

## AGENT-005 — Fresh local install crashed wake server before automation scripts landed

**Symptom:** On a brand-new `~/.local-agent-witch` install, `com.local-agent-witch-wake` crash-looped with `Cannot find module '.../applyAutomationSyncLocally'`.

**Root cause:** Install registered the wake LaunchAgent before the automation-scheduler step downloaded modules that `agentWitchWakeHandlers.ts` imports at load time.

**Fix:** Download updater + automation scripts before registering the wake LaunchAgent. Echo the wake link API using `AGENT_WITCH_WAKE_PORT` (not a hardcoded `47892`).

**Regression tests:** `renderInstallAgentWitchScript.test.ts` (AGENT-005 install order).

---

## AGENT-004 — Localhost install stole production Agent Witch config

**Symptom:** Installing from localhost flipped the Mac’s `wsUrl` / LaunchAgents away from agentwitch.com (or the reverse), so the Mac looked offline on the other origin.

**Root cause:** Both origins shared `~/.agent-witch`, the same LaunchAgent labels, and wake port `47892`. Reinstall always rewrote the single profile config.

**Fix:** Treat them as two apps. Localhost installs to `~/.local-agent-witch` with LaunchAgent prefix `com.local-agent-witch` and wake port `47893`. Production keeps `~/.agent-witch` / `com.agent-witch` / `47892`. Browser wake/link calls pick the port from the page hostname. Local UI is always `:43347`.

**Regression tests:** `resolveAgentWitchAppHome.test.ts`, `renderInstallAgentWitchScript.test.ts` (AGENT-004), `requestAgentWitchWake.test.ts`.

---

## AGENT-003 — Mac showed “Seen recently” while Agent Witch WebSocket was healthy

**Symptom:** Home / Mac list showed amber “Seen recently” even though the local Agent Witch process had a healthy live WebSocket to the same host.

**Root cause:** `getAgentWitchHub()` kept the hub in a module-scoped variable. `server.ts` (WebSocket upgrade) and Next.js API route bundles load separate module graphs, so each held a different hub instance.

**Fix:** Store the pairing store and hub on `globalThis` in `getAgentWitchHub.ts` so one process shares one hub across the custom server and App Router handlers.

**Regression tests:** `getAgentWitchHub.test.ts` (AGENT-003).

---

## AGENT-002 — Marketplace install failed while Mac looked online

**Symptom:** Install always returned “The selected Mac is not online right now.” even on the Mac running Agent Witch.

**Root cause:** UI treated a fresh `last_seen_at` as connected while marketplace install required a hub client matched by `deviceId`.

**Fix:** Dispatch-ready status uses hub live clients (plus recent-seen tiers for display). `findEnrichedAgentClientForUser` matches agents by pairing token when hub metadata has a stale `deviceId`.

**Regression tests:** `findEnrichedAgentClientForUser.test.ts`, `resolveOnlineClientsByDeviceId.test.ts`, `buildAgentWitchDevicesWithOnlineStatus.test.ts` (AGENT-002).

---

## AGENT-001 — Presence labels disagreed across Home, install, and send-task

**Symptom:** Home device list looked online (or “seen recently”) but marketplace install and send-task modals treated the same Mac as offline.

**Root cause:** Surfaces used different fields (`isOnline` vs `isConnected`) and sometimes mock vs real device APIs.

**Fix:** `@/features/agent-witch/online-wake` is the single client resolver (`live` / `recent` / `offline`, `canDispatchToMac`). Home, badges, install modal, and composer use the same helpers.

**Regression tests:** `macDevicePresence.test.ts` (AGENT-001), `buildAgentWitchDevicesWithOnlineStatus.test.ts`.

---

## AGENT-022 — “Online” from DB heartbeat while dispatch had no live WS

**Symptom:** Local `:43347` traffic showed healthy `agent.register` / `agent.heartbeat` / `writer.status`, and the website Mac picker said Online, but send-task / writer session returned “Your Mac is offline…” or “The selected Mac is not online right now.”

**Root cause:** `isConnected` treated a fresh `last_seen_at` as dispatch-ready. Heartbeats can update Neon on any replica while the live Mac WebSocket lives only in that replica’s in-memory hub. Devices API also listed live ids without enriching pairing/`deviceId`, so the UI could disagree with `findEnrichedAgentClientForUser`. Dispatch still had a heartbeat-only “ok without agentClient” path left over from HTTP command pull.

**Fix:** `isConnected` = live hub client only (`isOnline` keeps the ~90s recent window). Devices API collects live ids via enrichment + token resolve. Resolve/dispatch fail closed without a live WS (no `queuedForDevicePull`).

**Ops note:** Keep a single Railway replica (or sticky WS) until the hub is shared across instances.

**Regression tests:** `buildAgentWitchDevicesWithOnlineStatus.test.ts`, `collectLiveAgentWitchDeviceIdsForUser.test.ts`, `resolveClaudeRunAgentClient.test.ts` (AGENT-022).

---

## AGENT-024 — PTY spawn crash left Send-a-task stuck with empty Local Mac terminal

**Symptom:** After Start, progress stayed on “Working on your request… Waiting for the first update…”, Local Mac terminal was empty (Live), and `:43347/traffic` showed `command.claude.run` then `agent.register` reconnect with no `shell.data` / stream chunks.

**Root cause:** `node-pty` threw `posix_spawnp failed` while spawning the writer CLI. The error was unhandled, Agent Witch exited and reconnected, so the browser never received output.

**Fix:** Catch PTY spawn failures and fall back to pipe-based `child_process` spawn (already used when node-pty is missing). Install bundle **25**.

**Regression:** local traffic should show `terminal.stream.chunk` (or pipe output) after `command.claude.run` without an immediate crash reconnect.

---

## AGENT-021 — Website must not call Mac localhost APIs

**Symptom:** Browser fetched `127.0.0.1:47892` / `:43347` for health, identity, link, wake, harness, and automations, which fails off-LAN and breaks Private Network Access.

**Root cause:** Early same-machine helpers talked to the wake server from the page.

**Fix:** Browser uses only cloud HTTPS + hub WebSocket. Link sessions push `account.link` over WS; wake uses `POST /api/agent-witch/devices/:id/restart`; marketplace harness and automations sync/run push over WS. Local `:43347` remains Mac-only UI. Install bundle **24**.

**Regression tests:** `requestAgentWitchWake.test.ts` (AGENT-021), `canWakeMacDeviceFromBrowser.test.ts`.
