# Agent Witch bridge

Mac pairing, install script, WebSocket bridge, and paired-device API client.

## Scope

| Area           | Path                        |
| -------------- | --------------------------- |
| Feature client | `src/features/agent-witch/` |
| Server / WS    | `src/lib/agentWitch/`       |
| APIs           | `/api/agent-witch/*`        |

## Key modules

- `utils/pairedDevicesApi.ts` — fetch/revoke devices, dispatch policy (moved from harness)

## Query

```bash
npm run feature-knowledge:query -- "paired devices api" --feature=agent-witch
```
