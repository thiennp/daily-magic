# Home dashboard

Authenticated hub, onboarding, Mac connect flow, and guest landing at `/`.

## Scope

| Area         | Path                                           |
| ------------ | ---------------------------------------------- |
| Feature UI   | `src/features/home/`                           |
| Routes       | `src/app/(app)/page.tsx`                       |
| Related APIs | `/api/agent-witch/devices` (via agent-witch)   |

## Dependencies

- **agent-witch** — device pairing, install command, WebSocket presence
- **capabilities** — team offerings on dashboard
- **harness** — catalog shortcuts
- **dispatch** — approval listener mount via shell
- **macDevices** — device row UI in left rail

## Key flows

1. **Guest** — marketing shell on `/` when logged out.
2. **Connect Mac** — until `useHomeConnectedMacs()` returns at least one device, only the left rail + connect guide render (`HomeLinkAccountGate`).
3. **Dashboard** — after a Mac is paired, children (tasks, marketplace, etc.) render.

## Query feature knowledge

Before editing home behavior, run:

```bash
npm run feature-knowledge:query -- "home dashboard mac connect"
npm run feature-knowledge:query -- "HOME-003"
```

Or `POST /api/feature-knowledge/query` with `{ "query": "...", "featureSlug": "home" }`.

Re-index after doc changes: `npm run feature-knowledge:index`.
