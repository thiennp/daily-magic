# Wave QA quality bar (strict)

Goal: shipped Storybook catalog pages must feel **production-grade**, not “good enough for a demo.” Sympathy scoring and shallow PNG glances are how obvious UI bugs reach `main`.

## Non-negotiables

| Rule                                                            | Why                                                                                               |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **All 6 roles pass** before push to `main`                      | ux–product without tester/dx lets broken stories and missing manifests ship.                      |
| **No open `mustFix` on pass**                                   | If it must be fixed, it is not done.                                                              |
| **Pass ≥ 97** for ux, copy, product (≤3 polish pts if &lt; 100) | Known jank at 95 reads cheap in production.                                                       |
| **`ui` pass = 100/100** (AWC desktop **and** mobile)            | UI is what users see first — no “almost perfect” ship.                                            |
| **`ui` + `obviousVisualDefects: "none"`**                       | Any blocking visual defect fails until code + recapture.                                          |
| **AWC `ui` + `visualEvidenceMethod: "computerUse"`**            | Full-page PNG glance is not a UI review.                                                          |
| **Reviewer B independent**                                      | B must not read A’s JSON first; scores within 3 points or escalate (third reviewer or fix-first). |
| **`computerUse` for AWC `ui` (and `ux` on marketing/auth)**     | Zoom crops are mandatory evidence, not optional narrative.                                        |
| **`npm run ci` green** before every `main` push                 | Railway deploys from `main`.                                                                      |

Enforced in `record-agent` validation where noted in `reviewer-rubric.md`.

## What counts as “cheap” (treat as blocking)

Score as **ui** (or **ux** when it blocks comprehension), set `obviousVisualDefects: "present"` when applicable:

- Wrong theme tokens (`dark:` on light marketing, gray-on-gray body text).
- Broken layout: clipped `<pre>`/URLs, stray rules through cards, unintended horizontal scroll.
- Placeholder or lorem copy, “TODO”, wrong product name, misleading CTAs.
- Empty/error/loading states that look abandoned (raw stack traces, generic “Error”).
- Icons missing or raw SVG when app uses `AppIcon`.
- Mobile AWC: tap targets &lt; 44px, overlapping nav, hero CTA below fold without intent.
- Story fixtures that lie about real API shape (fake data that would confuse a PM demo).

**Do not** pass these as `quickWins` only. Fix in product or Storybook chrome, recapture, re-review.

## Role discipline

### ux

- Walk **every** captured status (ready, loading, empty, error where applicable).
- Name the **first 3-second scan** and whether the primary action is obvious.
- Deduct heavily for friction on auth, billing-adjacent, or dispatch flows.

### copy

- Read every visible string on every PNG; flag inconsistent product terms (Agent Witch vs daily-magic).
- Error/empty copy must tell the user **what to do next**.

### ui (highest bar)

- **Pass only at 100** on every viewport (AWC: `scoreDesktop` and `scoreMobile` both 100). No `scoreBreakdown` on pass.
- Follow `ui-deep-inspection.md` plus **≥6** `zoomedSections` on pass (one per checklist area).
- **`visualEvidenceMethod: "computerUse"`** on AWC — save zoom crops under artifacts; cite paths in `topIssues` or review notes.
- Compare to **https://www.agentwitch.com** same route when it exists; log drift in `topIssues`.
- Any “I’d notice in 2 seconds” defect → fix before pass, not `quickWins`.

### product

- Ask: “Would I demo this to a paying team without apologizing?”
- If story hides a known broken real route, **fail** until fixture or product is honest.

### tester + dx

- Run after subjective roles on the **same** Storybook build used for capture.
- Failures block ship even if ux–product already passed.

## Ship checklist (one page)

1. Capture round N for page.
2. ux → copy → ui → product (A/B each, fixes between rounds).
3. `storybook:wave:validate` + `storybook:wave:objective-gates` on that build.
4. `npm run ci`.
5. Push `main` only when `progress.json` shows **all six roles passed** for that page.

## When quality regresses after merge

1. Reset page roles: `npm run storybook:wave:reset-agent-roles` (scoped) or manual `progress.json` + delete stale reviews.
2. Fix product UI; do **not** re-score without recapture.
3. Final **audit-1** wave still required for all 34 pages — see `coordinator.md`.

## Exceptions

Only with human approval in `audit-exceptions.md`. Default is **no exceptions** for obvious visual defects.
