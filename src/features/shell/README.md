# App shell

Header actions, desktop primary nav card, mobile bottom nav, connection badge, approval listener mount.

Desktop primary nav is a sticky left column in `AppShell` (links only). Brand + AWL bundle version live in `AppShellHeader`. Home dashboard rails hold onboarding and devices only.

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
