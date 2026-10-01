# Phase 2 — Implement shell fix (isolated input)

**You are Implementer B only.** Do not read wave QA, coordinator, or progress.json. Do not read phase-01 audit input or independent audits.

## Your only specification

Read **only** this file (must exist before you start):

`docs/product/audits/awc-projects-ui-independent-2026-10-01.md`

Implement **mustFix** items in priority order. Prefer a single fix in `AppShell` / nav that fixes all signed-in AWC routes using default shell, not one-off page hacks.

## Constraints

- Repo: daily-magic / Agent Witch AWC, Tailwind 4, `src/features/shell/`.
- Keep mobile bottom nav behavior unless audit explicitly requires change.
- Add/adjust tests only where repo already tests shell or projects layout.
- Run targeted tests + `npm run lint` on touched files.

## Deliverable

- Branch: `cursor/awc-projects-shell-fix-b63b` from `main`
- Screenshots at 1440px: `/opt/cursor/artifacts/awc-projects-after-fix-1440.png` (local dev `/projects` with test auth)
- Short **`docs/product/audits/awc-projects-ui-fix-notes-2026-10-01.md`**: what changed, files touched, how each mustFix was addressed (map by audit id/heading)

## Stop

Do not merge to main. Do not run phase 3 review yourself. Push branch.
