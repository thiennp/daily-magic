# App shell

Header actions, desktop primary nav card, mobile bottom nav, connection badge, approval listener mount.

Desktop primary nav and **Your Devices** share a sticky left column in `AppShell` (`AppShellSidebar`: nav on top, devices pinned with `mt-auto`). On viewports below `md`, the same devices panel renders above page content (`mobileDevicesRail`). Brand (logo + wordmark, no build/version pill) lives in `AppShellHeader`; the server version shows next to **Computers** (`SHELL_COMPUTERS_TITLE`, `shell.computers.title`) as **Latest v{n}** (L3 v5 V5-2, `v5/`). Desktop Computers render `embedded` inside one white `--awc-*` side panel; width is a single `--awc-side-w`. Home dashboard left rail holds onboarding only.

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

`utils/` public API: import live-floater restore helpers from `@/features/shell/utils/public-api/presentation`.
`hooks/` public API: import `useShellNavContext` from `@/features/shell/hooks/public-api/presentation`.
