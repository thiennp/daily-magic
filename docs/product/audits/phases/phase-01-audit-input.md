# Phase 1 — Granular UI audit (isolated input)

**You are Auditor A only.** Do not read wave QA files, `progress.json`, coordinator docs, or prior audit markdown. Do not fix code.

## Product (AWC signed-in `/projects`)

Agent Witch Console (AWC) at `https://www.agentwitch.com`. Signed-in user sees **Projects**: cloud-backed list of repos their Macs can run agents against. User can search, open a project, see online/offline Mac linkage, counts. Global signed-in chrome should feel like a **professional SaaS workspace**: clear brand anchor, predictable navigation, efficient use of desktop width for data-dense grids.

## Evidence to review

1. **Production reference (desktop ~1440px):**  
   `/home/ubuntu/.cursor/projects/workspace/assets/f4d93e68-4101-4eba-b97c-d7510d325a77.png`

2. **Optional verification (only if you need parity):** run dev with `.env.local` exported, sign in test account, open `/projects` at 1440×900 — do not use Storybook wave QA rubrics.

## Deliverable

Write **`docs/product/audits/awc-projects-ui-granular-2026-10-01.md`** with:

- **Executive score** 0–100 for “production-ready signed-in shell + projects page” with **scoreBreakdown** (brand/logo placement, global header, nav model, spatial hierarchy, density, typography, alignment, interactive affordances, accessibility hints, copy clarity, empty/error states if visible).
- **Checklist** at smallest practical detail (each item: observed / expected / severity P0–P3).
- **mustFix** ordered list (blocking release).
- **niceToHave** list.
- Explicit callouts user cares about: **logo/brand position**, nav as sidebar vs floating card, column width vs viewport, header width mismatch.

No code citations required in phase 1; visual + product judgment only.

## Stop

Do not implement fixes. Do not open PRs. Commit only the deliverable markdown on branch `cursor/awc-projects-ui-audit-granular-b63b`.
