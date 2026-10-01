---
name: skill-storybook-page-wave-qa
description: >-
  Weekly Storybook page wave QA for AWC and AWL: PNG capture, subagent reviewers
  (UX → copy → UI → product → tester → DX) until ≥95% with explicit score rationale.
  No automated subjective scoring. Incremental commits per page/role batch.
---

# Storybook page wave QA

## When to use

- Storybook UI/UX/copy/product QA, wave review, or Saturday weekly run.
- **Incremental delivery:** finish capture + agent review for one page (or one role across pages), record, **commit/push**, then continue — do not attempt all 34 pages in one session.

Canonical: `docs/storybook/README.md`, `docs/storybook/wave-qa/README.md`, `docs/storybook/wave-qa/reviewer-rubric.md`.

## Coordinator (main agent)

- **Do not** capture, review PNGs, or fix UI on the main thread.
- Spawn **cloud** subagents (`run_in_background`) — **one page per subagent**, branch `cursor/wave-qa-<awc|awl>-<pageId>-b63b`.
- Brief: `npm run storybook:wave:page-brief -- AWC <pageId>` — see `docs/storybook/wave-qa/coordinator.md`.
- Push/PR **per page** when that page’s ux–product roles pass; merge to `main` incrementally.

## Hard rules

1. **ux | copy | ui | product** — scores from **subagent or human** only, with PNG evidence. `reviewMethod` must be `"agent"` in JSON.
2. **Forbidden** for passing subjective roles: `evaluateSubjectiveWaveQa.ts`, Playwright rubric bulk record, or `notes` containing `Rubric A=`.
3. **Below 100:** `scoreBreakdown[]` with `reason` per deduction. **Below 95:** `whyBelowThreshold` + `mustFix[]` for the next fix round.
4. **tester | dx** — objective only (`storybook:wave:validate`, manifest test, `storybook:wave:objective-gates`).
5. Do **not** mark `main` “done” until all 34 pages × 6 roles pass with agent evidence.

## Definitions

| Term           | Meaning                                                                     |
| -------------- | --------------------------------------------------------------------------- |
| **Wave**       | One catalog page — all Storybook statuses                                   |
| **Role order** | `ux` → `copy` → `ui` → `product` → `tester` → `dx`                          |
| **Pass**       | `scoreOverall >= 95` from reviewer **A** and **B** (same round after fixes) |
| **AWC**        | Desktop 1280×900 + mobile 390×844 captures                                  |
| **AWL**        | Desktop only                                                                |

Progress: `docs/storybook/wave-qa/progress.json` · Catalog: `scripts/storybookWaveQa/storybookWavePageCatalog.ts`.

## Agent loop (one page, one role)

1. **Build + serve** Storybook static (`:6008`).
2. **Capture** (bump `round` only after code/fixture changes):

   ```bash
   npm run storybook:wave:capture -- AWC <pageId> <round>
   ```

   Artifacts: `/opt/cursor/artifacts/storybook-waves/{AWC|AWL}/{pageId}/round-{n}/`

3. **Reviewer A** (`generalPurpose` or `computerUse`): attach **all** PNGs + `manifest.json`; role lens from `reviewer-rubric.md`; output **one JSON file** per rubric template (`reviewer: "A"`).

4. **Fix** `mustFix` in product or `src/utils/storybook/*`; recapture same round if visuals changed.

5. **Reviewer B** — **different** subagent; same evidence; `reviewer: "B"`.

6. **Record** only when both JSON files validate:

   ```bash
   npm run storybook:wave:record-agent -- AWC <pageId> <role> reviews/...-a.json reviews/...-b.json
   ```

7. Next role on same page, then next page. **Commit** after each page (or small batch) that gains new `passed: true` roles.

## Reset after invalid (automated) passes

```bash
npm run storybook:wave:reset-agent-roles
```

## Objective gates (not a substitute for design review)

```bash
npm run storybook:wave:validate
npx vitest run src/utils/storybook/pageStoryManifest.test.ts
npm run storybook:wave:objective-gates
```

## Weekly CI

`.github/workflows/storybook-wave-qa-weekly.yml` — capture + validate. **Agent** still runs ux→product loops from `progress.json`.

## Reporting

Tables per `skill-agent-verification-reporting`. State: pages completed, open `mustFix` from last failed role, artifact paths.
