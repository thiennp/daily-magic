# Agent Witch bridge

Mac pairing, install script, WebSocket bridge, and paired-device API client.

## Scope

| Area           | Path                        |
| -------------- | --------------------------- |
| Feature client | `src/features/agent-witch/` |
| Server / WS    | `src/lib/agentWitch/`       |
| APIs           | `/api/agent-witch/*`        |

## Key modules

- `online-wake/` — presence tiers, browser wake, cloud restart queue, wake modal UI (import from barrel)
- `utils/pairedDevicesApi.ts` — fetch/revoke devices, dispatch policy
- `utils/resolveMacDeviceDisplayName.ts` — display labels for device rows
- `utils/agentWitchLocalHostCookie.ts` — local hostname cookie helpers
- `macDevices/` — device row, rename, menus

## Local vs production Mac installs

| Origin         | Install dir            | Wake port | LaunchAgent prefix      |
| -------------- | ---------------------- | --------- | ----------------------- |
| localhost      | `~/.local-agent-witch` | `47893`   | `com.local-agent-witch` |
| agentwitch.com | `~/.agent-witch`       | `47892`   | `com.agent-witch`       |

Install from each origin separately so local and prod stay independent.

Local wake `/identity` hides Add Mac / install CTAs when this computer already has the app (HOME-019).

## Query

```bash
npm run feature-knowledge:query -- "paired devices api" --feature=agent-witch
```

## Connection lab (local)

- UI: http://localhost:3000/connection-lab — switch mock device/WebSocket scenarios without DB
- API mock: `AGENT_WITCH_MOCK_SCENARIO=mixed npm run dev` (see `.env.example` for scenario ids)
