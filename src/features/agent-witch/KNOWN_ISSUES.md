## AGENT-017 — Online detection and streaming no longer use WebSocket

**Symptom:** “Selected Mac is not online” / flaky presence while Agent Witch was running on this Mac; hub WebSocket split across processes.

**Root cause:** Live presence and command delivery depended on an in-memory WebSocket hub that did not match HTTP heartbeat / multi-instance reality.

**Fix:** Mac uses HTTP heartbeat + command long-poll + message POST; browser uses SSE + dashboard message POST; `isConnected` = last_seen within ~30s. Install bundle version bumped to 21.

**Regression tests:** `buildAgentWitchDevicesWithOnlineStatus.test.ts` (AGENT-017), `macDevicePresence.test.ts`, `agentWitchCloudApi.test.ts`.

---

## AGENT-006 — Reinstall/link created a second device for the same Mac

**Symptom:** After a fresh local install + account link, Home showed both `L92KQX615Q` (connected, no display name) and the previous “Light Grey Mac” for the same hostname.

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

**Symptom:** Installing from localhost flipped the Mac’s `wsUrl` / LaunchAgents away from agentwitch.com (or the reverse), so the Mac looked offline on the other origin.

**Root cause:** Both origins shared `~/.agent-witch`, the same LaunchAgent labels, and wake port `47892`. Reinstall always rewrote the single profile config.

**Fix:** Treat them as two apps. Localhost installs to `~/.local-agent-witch` with LaunchAgent prefix `com.local-agent-witch` and wake port `47893`. Production keeps `~/.agent-witch` / `com.agent-witch` / `47892`. Browser wake/link calls pick the port from the page hostname.

**Regression tests:** `resolveAgentWitchAppHome.test.ts`, `renderInstallAgentWitchScript.test.ts` (AGENT-004), `requestAgentWitchWake.test.ts`.

---

**Symptom:** Home device list looked online (or “seen recently”) but marketplace install and send-task modals treated the same Mac as offline.

**Root cause:** UI surfaces used different fields from `/api/agent-witch/devices` — Home counted `isOnline` (heartbeat within 90s) while install/send gated on `isConnected` (in-memory hub socket only). Demo home also used mock devices while modals fetched the real API. The agent composer footer passed `isOnline` into blocked-state logic while send gating used `isConnected`.

**Fix:** `@/features/agent-witch/online-wake` is the single client resolver (`live` / `recent` / `offline`, `canDispatchToMac`). Server marks `isConnected` only when the hub has a live WebSocket for that device (or pairing-token match). Recent heartbeats surface as `isOnline` / “seen recently”, not dispatch-ready. Home, badges, install modal, and composer all use the same helpers.

**Regression tests:** `macDevicePresence.test.ts` (AGENT-001), `buildAgentWitchDevicesWithOnlineStatus.test.ts`.

---

## AGENT-002 — Marketplace install failed while Mac looked online

**Symptom:** Install always returned “The selected Mac is not online right now.” even on the Mac running Agent Witch.

**Root cause:** `/api/agent-witch/devices` treated a fresh `last_seen_at` heartbeat as `isConnected`, enabling Install in the UI, while `/api/marketplace/install` only accepted an in-memory hub WebSocket client matched by `deviceId`. Stale/missing hub `deviceId` values never fell back to pairing-token lookup.

**Fix:** `isConnected` requires a hub socket (via `resolveOnlineClientsByDeviceId`). `findEnrichedAgentClientForUser` matches agents by pairing token even when hub metadata has a stale `deviceId`.

**Regression tests:** `findEnrichedAgentClientForUser.test.ts`, `resolveOnlineClientsByDeviceId.test.ts`, `buildAgentWitchDevicesWithOnlineStatus.test.ts` (AGENT-002).

---

## AGENT-003 — Mac showed “Seen recently” while Agent Witch WebSocket was healthy

**Symptom:** Home / Mac list showed amber “Seen recently” even though the local Agent Witch watchdog reported a healthy live WebSocket to the same host.

**Root cause:** `getAgentWitchHub()` kept the hub in a module-scoped variable. `server.ts` (WebSocket upgrade) and Next.js API route bundles load separate module graphs, so each held a different hub instance. Heartbeats on the WS hub still updated `last_seen_at` in the database (→ `isOnline`), while `/api/agent-witch/devices` read an empty hub (→ `isConnected: false` → “Seen recently”).

**Fix:** Store the pairing store and hub on `globalThis` in `getAgentWitchHub.ts` so one process shares one hub across the custom server and App Router handlers.

**Regression tests:** `getAgentWitchHub.test.ts` (AGENT-003).
