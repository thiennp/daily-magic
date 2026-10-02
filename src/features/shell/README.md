# App shell

Header actions, desktop primary nav card, mobile bottom nav, connection badge, approval listener mount.

Desktop primary nav and **Your Devices** share a sticky left column in `AppShell` (`AppShellSidebar`: nav on top, devices pinned with `mt-auto`). Brand + AWL bundle version live in `AppShellHeader`. Home dashboard left rail holds onboarding only.

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
