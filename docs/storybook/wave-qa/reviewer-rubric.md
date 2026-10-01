# Agent reviewer rubric (Storybook wave QA)

**Only human or subagent reviewers** may score ux, copy, ui, product. Do **not** use `evaluateSubjectiveWaveQa` or any Playwright rubric to set `passed: true`.

## Evidence

- PNG captures: `npm run storybook:wave:capture -- AWC|AWL <pageId> <round>`
- Reviewer must open **every** status × viewport file in that round (see `manifest.json` in the round folder).
- **`ui` role:** follow **`ui-deep-inspection.md`** — zoomed sections + `obviousVisualDefects` field (enforced by `record-agent`).

## Scoring

- `scoreDesktop` / `scoreMobile` (AWC): 0–100 per viewport; **AWL:** set `scoreMobile` to `null`, `scoreOverall` = desktop.
- `scoreOverall`: for AWC, average desktop + mobile (round to integer) unless role-specific weighting is documented in notes.
- **Pass:** **ux | copy | product:** `scoreOverall >= 97`, A + B, empty `mustFix[]`, ≤3 polish pts if &lt; 100. **`ui`:** **100** on each AWC viewport (or AWL desktop), empty `scoreBreakdown`, `visualEvidenceMethod: "computerUse"` (AWC). See **`quality-bar.md`**.

When **any** score is below 100, fill `scoreBreakdown[]` with `{ area, pointsDeducted, reason }` so the next round knows what to fix.

When **below 97**, also require:

- `whyBelowThreshold` (≥40 characters)
- `mustFix[]` (actionable items)

## Role lenses

| Role        | Evaluate                                                                                                                                                       |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ux**      | Hierarchy, scan path, responsive AWC, CTAs, trust, friction, a11y (focus, labels, contrast at a glance)                                                        |
| **copy**    | Voice, clarity, empty/error/loading tone, accuracy vs product, no placeholder garbage                                                                          |
| **ui**      | Styleguide + **deep zoom** (cards, pre/code blocks, borders, overflow, icons). Obvious defects → `mustFix`, not only `quickWins` — see `ui-deep-inspection.md` |
| **product** | Story matches real AWC/AWL intent; fixtures believable; flows not misleading                                                                                   |

## JSON template

Save under `docs/storybook/wave-qa/reviews/<AWC|AWL>/<pageId>/round-<n>/<role>-reviewer-a.json` (and `-b.json`).

```json
{
  "reviewMethod": "agent",
  "reviewer": "A",
  "deployable": "AWC",
  "pageId": "home-marketing",
  "role": "ux",
  "captureRound": 1,
  "captureRef": "/opt/cursor/artifacts/storybook-waves/AWC/home-marketing/round-1/manifest.json",
  "scoreDesktop": 92,
  "scoreMobile": 90,
  "scoreOverall": 91,
  "passed": false,
  "scoreBreakdown": [
    {
      "area": "mobile-hero-cta",
      "pointsDeducted": 5,
      "reason": "Primary CTA competes with secondary link; tap target feels cramped at 390px."
    }
  ],
  "whyBelowThreshold": "Mobile hero CTA hierarchy and spacing need a fix before we ship this marketing story.",
  "topIssues": ["CTA hierarchy on mobile"],
  "mustFix": ["Increase primary CTA prominence on 390px capture"],
  "quickWins": ["Tighten eyebrow-to-headline spacing on desktop"]
}
```

**`ui` reviews** also require:

```json
"zoomedSections": [
  "hero-desktop-ready",
  "for-your-ai-pre-desktop-ready",
  "cards-desktop-ready",
  "forms-mobile-ready",
  "footer-desktop-ready",
  "nav-mobile-ready"
],
"obviousVisualDefects": "none",
"visualEvidenceMethod": "computerUse"
```

Use `"obviousVisualDefects": "present"` when any blocking item in `ui-deep-inspection.md` applies; then `passed` must be `false` until fixed.

## Final audit (after all 34 pages first-pass)

When every page has ux–product recorded once, coordinator runs **audit round** (`captureRound` label `audit-1` in reviews path):

1. Re-capture **ready** (and error if page has known state bugs) for each **already-passed** page.
2. **Only `ui` (+ optional `ux`)** — new reviewer A/B with `ui-deep-inspection.md`; may **revoke** `passed` and open fix PRs.
3. Do **not** declare program complete until audit `ui` passes or user accepts documented exceptions.

Record audit reviews under `reviews/.../round-audit-1/`.

Record when both A and B exist:

```bash
npm run storybook:wave:record-agent -- AWC home-marketing ux path/to/a.json path/to/b.json
```
