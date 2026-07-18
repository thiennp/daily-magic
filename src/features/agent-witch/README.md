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

## macOS DMG (no Terminal copy-paste)

```bash
# Production installer DMG
npm run agent-witch:dmg

# Localhost installer DMG
AGENT_WITCH_DMG_ORIGIN=http://localhost:3000 npm run agent-witch:dmg
```

Output: `dist/agent-witch-dmg/AgentWitch.dmg` plus a side-by-side `Agent Witch Installer.app`.

The Installer supports **Install** and **Update** (runs `self-update.sh` when present). Home UI links to `GET /install/agent-witch.dmg` (build copies the DMG to `public/install/`). Details: `scripts/agent-witch-dmg/README.md`.

Background self-update still runs via LaunchAgent; manual API: `POST /api/agent-witch/local-update` (proxies the Mac wake `/update/run`, port `47893` on localhost / `47892` in production).

Local wake `/identity` hides Add Mac / Download when this computer already has the app (HOME-019).

## Query

```bash
npm run feature-knowledge:query -- "paired devices api" --feature=agent-witch
```

## Connection lab (local)

- UI: http://localhost:3000/connection-lab — switch mock device/WebSocket scenarios without DB
- API mock: `AGENT_WITCH_MOCK_SCENARIO=mixed npm run dev` (see `.env.example` for scenario ids)
