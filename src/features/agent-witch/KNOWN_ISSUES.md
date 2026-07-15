# Agent Witch — known issues

## AGENT-001 — Home showed Mac “online” while install/send modals blocked

**Symptom:** Home device list looked online (or “seen recently”) but marketplace install and send-task modals treated the same Mac as offline.

**Root cause:** UI surfaces used different fields from `/api/agent-witch/devices` — Home counted `isOnline` (heartbeat within 90s) while install/send gated on `isConnected` (in-memory hub socket only). Demo home also used mock devices while modals fetched the real API. The agent composer footer passed `isOnline` into blocked-state logic while send gating used `isConnected`.

**Fix:** `src/features/agent-witch/utils/macDevicePresence.ts` is the single client resolver (`live` / `recent` / `offline`, `canDispatchToMac`). Server marks `isConnected` when the hub has a socket **or** `last_seen_at` is within one heartbeat interval (30s). Home, badges, install modal, and composer all use the same helpers.

**Regression tests:** `macDevicePresence.test.ts` (AGENT-001), `buildAgentWitchDevicesWithOnlineStatus.test.ts`.
