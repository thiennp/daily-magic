# Phase 3 — Independent re-review (isolated input)

**You are Reviewer C only.** Fresh eyes. You did not audit or implement.

## Allowed inputs

1. Product brief (same as phase 1): signed-in AWC `/projects` should be production-ready SaaS workspace.
2. **Fix notes only:** `docs/product/audits/awc-projects-ui-fix-notes-2026-10-01.md`
3. **Screenshots:** `/opt/cursor/artifacts/awc-projects-after-fix-1440.png` and capture fresh if fix branch is running locally.
4. Optional: compare mentally to production reference `/opt/cursor/artifacts/awc-projects-production-1440.png` — do **not** read granular audit markdown (avoid anchoring to auditor wording).

## Forbidden

- `docs/storybook/wave-qa/**`
- `progress.json`
- Phase 1 granular audit file
- Implementer branch diff narrative from chat

## Scoring

Write **`docs/product/audits/awc-projects-ui-review-2026-10-01.md`** with:

- **satisfactionScore** 0–100 (target **> 98** to approve release)
- **scoreBreakdown** by dimension (same categories as a strict product UI review)
- **whyBelowThreshold** if score ≤ 98
- **remainingMustFix** if any
- **releaseApproved**: boolean

Verify locally at 1280px and 1440px. Use test auth per AGENTS.md.

## Outcomes

- If **releaseApproved**: open PR `cursor/awc-projects-shell-fix-b63b` → `main`, title `fix(shell): AWC desktop sidebar layout for signed-in routes`
- If not approved: list blockers only; do not fix code (parent will re-run phase 2 with new handoff)

Branch for doc only if needed: `cursor/awc-projects-ui-review-b63b`
