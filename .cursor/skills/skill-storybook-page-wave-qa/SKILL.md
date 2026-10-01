---
name: skill-storybook-page-wave-qa
description: >-
  Weekly Storybook page wave QA for AWC and AWL: capture all statuses per page,
  alternating subagent reviews (UX → copy → UI → product → tester → DX) until ≥95%,
  fix product/storybook, update progress.json. Use for scheduled Saturday runs or manual QA.
---

# Storybook page wave QA

## When to use

- User asks for Storybook UI/UX QA, wave review, or weekly page QA.
- **Scheduled:** Saturday weekly job (GitHub Actions + optional Cursor timer) — run this skill end-to-end.
- **Manual:** One page or full catalog before a UI release.

Canonical docs: `docs/storybook/README.md`, `docs/storybook/wave-qa/README.md`.

## Definitions

| Term     | Meaning                                                                     |
| -------- | --------------------------------------------------------------------------- |
| **Wave** | One catalog page — all Storybook statuses for that page                     |
| **Role** | `ux` → `copy` → `ui` → `product` → `tester` → `dx` (in that order per page) |
| **Pass** | `scoreOverall >= 95` from **both** reviewer A and B in the same round       |
| **AWC**  | Desktop **1280×900** + mobile **390×844**                                   |
| **AWL**  | Desktop only                                                                |

Catalog: `scripts/storybookWaveQa/storybookWavePageCatalog.ts` (34 pages).  
Progress: `docs/storybook/wave-qa/progress.json` (run `npm run storybook:wave:init` if empty).

## Weekly automation (Saturday)

**CI (repo):** `.github/workflows/storybook-wave-qa-weekly.yml` — Saturday 02:00 UTC (`cron: 0 2 * * 6`), uploads screenshot artifacts.

```bash
npm run storybook:wave:weekly
```

**Cloud agent:** On timer or user request, run the full **Agent loop** below after CI capture (or run `storybook:wave:weekly` locally).

## Agent loop (one page, one role)

1. **Capture** (increment `round` after fixes):

   ```bash
   npm run storybook:build
   # Terminal A: cd storybook-static && python3 -m http.server 6008
   STORYBOOK_BASE_URL=http://127.0.0.1:6008 npm run storybook:wave:capture -- AWC <pageId> <round>
   ```

   Artifacts: `/opt/cursor/artifacts/storybook-waves/{AWC|AWL}/{pageId}/round-{n}/`

2. **Reviewer A** (generalPurpose): attach all PNGs for that page/round; rubric for role; return JSON:
   `{"scoreDesktop":n,"scoreMobile":n,"scoreOverall":n,"passed":bool,"topIssues":[],"mustFix":[],"quickWins":[]}`

3. **Fix** `mustFix` in product code or `src/utils/storybook/*` (fixtures, MSW, chrome). Minimize scope.

4. **Recapture** same round number only after fixes → **Reviewer B** (different subagent, same JSON).  
   Repeat A → fix → B until `passed` for both reviewers.

5. **Record** in `progress.json` for that page’s role: scores, round, `passed: true`, short `notes`.

6. **Next role** on same page, then **next page** when all six roles pass.

Do **not** push `main` until **all 34 pages × 6 roles** pass. Use a feature branch + draft PR until then.

## Subagent personas (prompt snippets)

- **UX:** hierarchy, spacing, responsive AWC, CTAs, nav, trust, a11y hints.
- **Copy:** voice, clarity, i18n-ready strings, error/empty tone, marketing accuracy.
- **UI:** Tailwind consistency, components vs styleguide, states (loading/empty/error).
- **Product:** flows match AWC/AWL product intent; fixtures believable.
- **Tester:** all statuses for the page exercised; MSW/error paths credible.
- **DX:** story names, catalog/manifest alignment, regen `storybook:generate` if needed.

## Verification

- `npx vitest run src/utils/storybook/pageStoryManifest.test.ts`
- `npm run storybook:build` must succeed
- After substantive fixes: `npm run typecheck` and targeted tests

## Reporting

Use `skill-agent-verification-reporting` tables. End weekly run with:

- Pages completed this week (role × page)
- Blockers
- Link to CI artifact or `/opt/cursor/artifacts/storybook-waves/` samples
- Whether `main` merge is allowed (only if full matrix ≥95%)
