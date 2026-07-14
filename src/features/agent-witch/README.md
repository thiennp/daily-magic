# Agent Witch bridge

Mac pairing, install script, WebSocket bridge, and paired-device API client.

## Scope

| Area           | Path                        |
| -------------- | --------------------------- |
| Feature client | `src/features/agent-witch/` |
| Server / WS    | `src/lib/agentWitch/`       |
| APIs           | `/api/agent-witch/*`        |

## Key modules

- `utils/pairedDevicesApi.ts` — fetch/revoke devices, dispatch policy
- `utils/resolveMacDeviceDisplayName.ts` — display labels for device rows
- `utils/requestAgentWitchWake.ts` — browser wake to local Agent Witch
- `utils/agentWitchLocalHostCookie.ts` — local hostname cookie helpers
- `macDevices/` — device row, rename, wake modal UI

## Query

```bash
npm run feature-knowledge:query -- "paired devices api" --feature=agent-witch
```
