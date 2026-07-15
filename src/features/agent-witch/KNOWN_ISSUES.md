# Agent Witch — known issues

## AGENT-001 — Home showed Mac “online” while install/send modals blocked

**Symptom:** Home device list looked online (or “seen recently”) but marketplace install and send-task modals treated the same Mac as offline.

**Root cause:** UI surfaces used different fields from `/api/agent-witch/devices` — Home counted `isOnline` (heartbeat within 90s) while install/send gated on `isConnected` (in-memory hub socket only). Demo home also used mock devices while modals fetched the real API. The agent composer footer passed `isOnline` into blocked-state logic while send gating used `isConnected`.

**Fix:** `src/features/agent-witch/utils/macDevicePresence.ts` is the single client resolver (`live` / `recent` / `offline`, `canDispatchToMac`). Server marks `isConnected` only when the hub has a live WebSocket for that device (or pairing-token match). Recent heartbeats surface as `isOnline` / “seen recently”, not dispatch-ready. Home, badges, install modal, and composer all use the same helpers.

**Regression tests:** `macDevicePresence.test.ts` (AGENT-001), `buildAgentWitchDevicesWithOnlineStatus.test.ts`.

---

## AGENT-002 — Marketplace install failed while Mac looked online

**Symptom:** Install always returned “The selected Mac is not online right now.” even on the Mac running Agent Witch.

**Root cause:** `/api/agent-witch/devices` treated a fresh `last_seen_at` heartbeat as `isConnected`, enabling Install in the UI, while `/api/marketplace/install` only accepted an in-memory hub WebSocket client matched by `deviceId`. Stale/missing hub `deviceId` values never fell back to pairing-token lookup.

**Fix:** `isConnected` requires a hub socket (via `resolveOnlineClientsByDeviceId`). `findEnrichedAgentClientForUser` matches agents by pairing token even when hub metadata has a stale `deviceId`.

**Regression tests:** `findEnrichedAgentClientForUser.test.ts`, `resolveOnlineClientsByDeviceId.test.ts`, `buildAgentWitchDevicesWithOnlineStatus.test.ts` (AGENT-002).
