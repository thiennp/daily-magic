# Agent reviewer rubric (Storybook wave QA)

**Only human or subagent reviewers** may score ux, copy, ui, product. Do **not** use `evaluateSubjectiveWaveQa` or any Playwright rubric to set `passed: true`.

## Evidence

- PNG captures: `npm run storybook:wave:capture -- AWC|AWL <pageId> <round>`
- Reviewer must open **every** status × viewport file in that round (see `manifest.json` in the round folder).

## Scoring

- `scoreDesktop` / `scoreMobile` (AWC): 0–100 per viewport; **AWL:** set `scoreMobile` to `null`, `scoreOverall` = desktop.
- `scoreOverall`: for AWC, average desktop + mobile (round to integer) unless role-specific weighting is documented in notes.
- **Pass:** `scoreOverall >= 95` for **both** reviewer A and B in the same round after fixes.

When **any** score is below 100, fill `scoreBreakdown[]` with `{ area, pointsDeducted, reason }` so the next round knows what to fix.

When **below 95**, also require:

- `whyBelowThreshold` (≥40 characters)
- `mustFix[]` (actionable items)

## Role lenses

| Role        | Evaluate                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------- |
| **ux**      | Hierarchy, scan path, responsive AWC, CTAs, trust, friction, a11y (focus, labels, contrast at a glance) |
| **copy**    | Voice, clarity, empty/error/loading tone, accuracy vs product, no placeholder garbage                   |
| **ui**      | Tailwind/styleguide alignment, component consistency, density, states visually distinct                 |
| **product** | Story matches real AWC/AWL intent; fixtures believable; flows not misleading                            |

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

Record when both A and B exist:

```bash
npm run storybook:wave:record-agent -- AWC home-marketing ux path/to/a.json path/to/b.json
```
