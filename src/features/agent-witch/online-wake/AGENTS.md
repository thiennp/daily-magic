# Online wake — agent instructions

Presence and cloud restart for Agent Witch Macs.

## Public API

Import from the barrel only:

```ts
import {
  resolveMacPresenceTier,
  canDispatchToMac,
  requestAgentWitchWake,
  canWakeMacDeviceFromBrowser,
  requestAgentWitchDeviceRestart,
  MacDeviceOfflineWakeHint,
} from "@/features/agent-witch/online-wake";
```

## Layout

| Module                                            | Role                                                   |
| ------------------------------------------------- | ------------------------------------------------------ |
| `macDevicePresence`                               | live / recent / offline tiers + dispatch gating        |
| `requestAgentWitchWake`                           | browser → `POST /api/agent-witch/devices/:id/restart`  |
| `agentWitchDeviceRestartRequest`                  | DB flag; delivered over WS on heartbeat or immediately |
| `requestLocalAgentWitchRestartFromWakeServer`     | Mac-local wake `/restart` (never called from the site) |
| `MacDeviceWakeModal` / `MacDeviceOfflineWakeHint` | offline wake UI                                        |

The website must never call `127.0.0.1`. Install-script and wake LaunchAgent code stays in `src/lib/agentWitch/` and `scripts/`.
