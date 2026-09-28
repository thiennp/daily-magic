# App shell

Header actions, desktop primary nav card, mobile bottom nav, connection badge, approval listener mount.

On home, the primary nav card sits in the devices column above Your Devices (`renderPrimaryNav={false}` on `AppShell`). Other routes render the same card above page content.

## Registry

- **Slug:** `shell`
- **Feature path:** `src/features/shell`
- **Migration:** migrated

## Routes

_None wired in this feature folder._

## APIs

_None._

## Dependencies

- `auth`
- `dispatch`

Query: `npm run feature-knowledge:query -- "..." --feature=shell`
