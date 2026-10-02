# App shell — known issues

| ID        | Symptom                                                                                       | Fix / test                                                                                                          |
| --------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| SHELL-001 | New task provider lived inside per-page `AppShell`, so route changes remounted the live panel | Provider moved to root layout; sticky dock in AGENT-030                                                             |
| SHELL-002 | Primary nav exposed Library / Marketplace / Reports before core loop                          | UX-001: Home → New task → Reports; workflow onboarding optional (`docs/product/ux-simplification.md`)               |
| SHELL-003 | Team-only nav and admin link shown without group context                                      | `filterAppNavForShellContext` gates Automations + admin; Marketplace always (solo harness install)                  |
| SHELL-004 | Your Devices only in `hidden md:block` sidebar — missing on mobile after home rail move       | `AppShell` `mobileDevicesRail` (`md:hidden`); admin uses `showDevicesRail={false}`; `appShellSidebarLayout.test.ts` |
| SHELL-005 | Fixed footer nav crowded / hard to find on mobile; header New task + theme duplicated destinations | Mobile Menu next to account (`AppShellMobileNavMenu`); hide New task/theme below `md`; remove `AppShellBottomNav`; `appShellMobileNavLayout.test.ts` |
