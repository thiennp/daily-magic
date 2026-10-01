# AWC Projects UI fix notes — 2026-10-01

**Branch:** `cursor/awc-projects-shell-fix-b63b`  
**Evidence:** `/opt/cursor/artifacts/awc-projects-after-fix-1440.png` (Storybook `AWC/Pages/projects_ready` at 1440×900 — same `AppShell` + `ProjectsPageLayout` as `http://localhost:3000/projects`; VM lacked a dedicated Neon DB for `test-login` on `:3000`.)

**Inputs:** `awc-projects-ui-granular-2026-10-01.md` (granular branch), `phases/phase-02-fix-input.md` (pipeline branch). Shell requirements file `awc-projects-ui-shell-requirements-2026-10-01.md` was not present on `origin/cursor/awc-projects-shell-pipeline-b63b` at implementation time; shell P0 below follows the phase-2 brief and coordinator priority (desktop sidebar + header brand).

---

## Shell P0

| ID              | Requirement                                                                              | Change                                                                                                                                                                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **P0-SHELL-01** | Desktop primary nav as a **left sidebar column**, not a floating card above page content | `AppShell.tsx` uses a `md+` grid (`15–16rem` nav + main). `AppShellNav` `placement="sidebar"` drops the in-nav brand; home still uses `placement="embedded"` with the card panel. `appShellNavClasses.constant.ts` — rail classes vs embedded card. |
| **P0-SHELL-02** | **Header brand** anchor on signed-in desktop chrome                                      | `AppShellHeader.tsx` accepts `showDesktopBrand`; `AppShell` sets it when primary nav or custom sidebar is shown. Full `AgentWitchLogo` visible from `md` up (not mobile-only).                                                                      |

---

## Granular mustFix

| ID        | Addressed by                                                                                                                                                                                                                 |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **MF-01** | `resolveProjectListCardTitle.ts` + `deriveProjectFolderSlug.ts` — Default projects show repo folder slug as title with a small “Default” label. Wired in `AwcProjectCard.tsx`. Tests: `resolveProjectListCardTitle.test.ts`. |
| **MF-02** | `formatProjectFolderPathForList.ts` — middle ellipsis preserving tail; two-line `line-clamp-2` path on cards with `title` tooltip. Tests: `formatProjectFolderPathForList.test.ts`.                                          |
| **MF-03** | `formatProjectCompositionCountsLine.ts` — “Playbook(s)” labels; returns `null` when all counts zero (hidden on list cards). Detail panel shows fallback line when zero. Test updated.                                        |
| **MF-04** | Removed in-panel `listHint` from `AwcProjectsPanel.tsx`; single subtitle on `ProjectsPageLayout` `AppPageHeader`.                                                                                                            |
| **MF-05** | `buildProjectDevicePresenceLabel.ts` — `Offline on {Mac}` / `Online on {Mac}` copy; test `buildProjectDevicePresenceLabel.test.ts`.                                                                                          |

---

## Files touched

- `src/features/shell/AppShell.tsx`
- `src/features/shell/AppShellHeader.tsx`
- `src/features/shell/AppShellNav.tsx`
- `src/features/shell/appShellNavClasses.constant.ts`
- `src/features/shell/appShellNavClasses.constant.test.ts`
- `src/features/shell/appShellContentWidth.constant.ts`
- `src/features/pages/layouts/ProjectsPageLayout.tsx`
- `src/features/projects/AwcProjectCard.tsx`
- `src/features/projects/AwcProjectsPanel.tsx`
- `src/features/projects/AwcProjectDetailPanel.tsx`
- `src/features/projects/utils/buildProjectDevicePresenceLabel.ts`
- `src/features/projects/utils/buildProjectDevicePresenceLabel.test.ts`
- `src/features/projects/utils/formatProjectFolderPathForList.ts`
- `src/features/projects/utils/formatProjectFolderPathForList.test.ts`
- `src/features/projects/utils/resolveProjectListCardTitle.ts`
- `src/features/projects/utils/resolveProjectListCardTitle.test.ts`
- `src/lib/projects/deriveProjectFolderSlug.ts`
- `src/lib/projects/formatProjectCompositionCountsLine.ts`
- `src/lib/projects/formatProjectCompositionCountsLine.test.ts`
- `docs/product/audits/awc-projects-ui-fix-notes-2026-10-01.md`

---

## Verification

```bash
npx vitest run src/features/shell/appShellNavClasses.constant.test.ts \
  src/features/projects/utils/resolveProjectListCardTitle.test.ts \
  src/features/projects/utils/formatProjectFolderPathForList.test.ts \
  src/features/projects/utils/buildProjectDevicePresenceLabel.test.ts \
  src/lib/projects/formatProjectCompositionCountsLine.test.ts
npx eslint src/features/shell/AppShell.tsx src/features/shell/AppShellHeader.tsx \
  src/features/shell/AppShellNav.tsx src/features/projects/AwcProjectCard.tsx \
  src/features/projects/AwcProjectsPanel.tsx
```
