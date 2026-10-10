# Mac devices UI

Device row, rename, wake modal components.

## Registry

- **Slug:** `mac-devices`
- **Feature path:** `src/features/macDevices`
- **Migration:** planned

## Routes

_None wired in this feature folder._

## APIs

_None._

## Dependencies

- `agent-witch`

Query: `npm run feature-knowledge:query -- "..." --feature=mac-devices`

## Public API

Outside code imports only from `public-api/types.ts` (deep links, copy constants) and `public-api/presentation.ts` (device row, icon, modals, hooks, helpers).
