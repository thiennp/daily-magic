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

## Connection lab (local)

- UI: http://localhost:3000/demo/connection-lab — switch mock device/WebSocket scenarios without DB
- API mock: `AGENT_WITCH_MOCK_SCENARIO=mixed npm run dev` (see `.env.example` for scenario ids)
