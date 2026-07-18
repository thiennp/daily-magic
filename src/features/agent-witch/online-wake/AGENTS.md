# Online wake — agent instructions

Presence, browser wake, and cloud→local restart for Agent Witch Macs.

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

| Module                                            | Role                                            |
| ------------------------------------------------- | ----------------------------------------------- |
| `macDevicePresence`                               | live / recent / offline tiers + dispatch gating |
| `requestAgentWitchWake`                           | browser → `127.0.0.1:47892/restart`             |
| `agentWitchDeviceRestartRequest`                  | DB flag for HTTP-heartbeat restart pull         |
| `requestLocalAgentWitchRestartFromWakeServer`     | server-side local wake `/restart` call          |
| `MacDeviceWakeModal` / `MacDeviceOfflineWakeHint` | offline wake UI                                 |

Install-script and watchdog LaunchAgent code stays in `src/lib/agentWitch/` and `scripts/`.
