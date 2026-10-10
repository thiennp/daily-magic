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

## v5 public API

`v5/public-api/types.ts` (copy and class constants, `resolveDeviceUpdateAction`) and `v5/public-api/presentation.ts` (`AppShellBrand`, `AppShellComputersHeading`, `AppShellDevicesSurface`, `DeviceUpdateButton`). Import the v5 slice only through these files.

`loading/` public API: import skeleton components from `@/features/shell/loading/public-api/presentation` and `AWC_SKELETON_CARD_CLASS` from `@/features/shell/loading/public-api/types`.

## Public API

Outside code imports the shell root only through `public-api/presentation` (`AppShell`, `AdminSidebar`, `ConfirmDestructiveModal`, `ConnectionStatusBadge`) and `public-api/types` (`PRIMARY_NAV`, `BOTTOM_NAV`, `APP_PAGE_STACK_CLASS`, `APP_SHELL_NARROW_CONTENT_CLASS`).
