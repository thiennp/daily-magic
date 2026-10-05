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
- **Push to `main` directly** per page (no PRs). Run **`npm run ci`** before every push; Railway fails if `main` is red.

## Hard rules

1. **ux | copy | ui | product** — scores from **subagent or human** only, with PNG evidence. `reviewMethod` must be `"agent"` in JSON.
2. **Forbidden** for passing subjective roles: `evaluateSubjectiveWaveQa.ts`, Playwright rubric bulk record, or `notes` containing `Rubric A=`.
3. **Quality bar:** `docs/storybook/wave-qa/quality-bar.md` — pass **≥97**, empty `mustFix` on pass, ≤3 polish points if score &lt; 100. **Below 97:** `whyBelowThreshold` + `mustFix[]`.
4. **tester | dx** — objective only (`storybook:wave:validate`, manifest test, `storybook:wave:objective-gates`).
5. Do **not** mark `main` “done” until all 34 pages × 6 roles pass with agent evidence **and** the **final UI audit** completes (below).
6. **`ui` role:** subagents **must** follow `docs/storybook/wave-qa/ui-deep-inspection.md` — zoom blocks, `zoomedSections`, `obviousVisualDefects`. Stray borders through `<pre>`/cards, clip, accidental `dark:` on marketing = **`present`** → fix or fail; never “quick win only.”

## Definitions

| Term           | Meaning                                                                                              |
| -------------- | ---------------------------------------------------------------------------------------------------- |
| **Wave**       | One catalog page — all Storybook statuses                                                            |
| **Role order** | `ux` → `copy` → `ui` → `product` → `tester` → `dx`                                                   |
| **Pass**       | ux/copy/product **≥97**; **`ui` = 100** per viewport + `computerUse`; **6 roles** before `main` push |
| **AWC**        | Desktop 1280×900 + mobile 390×844 captures                                                           |
| **AWL**        | Desktop only                                                                                         |

Progress: `docs/storybook/wave-qa/progress.json` · Catalog: `scripts/storybookWaveQa/storybookWavePageCatalog.ts`.

## Agent loop (one page, one role)

1. **Build + serve** Storybook static (`:6008`).
2. **Capture** (bump `round` only after code/fixture changes):

   ```bash
   npm run storybook:wave:capture -- AWC <pageId> <round>
   ```

   Artifacts: `/opt/cursor/artifacts/storybook-waves/{AWC|AWL}/{pageId}/round-{n}/`

3. **Reviewer A** (`generalPurpose` or `computerUse`): attach **all** PNGs + `manifest.json`; role lens from `reviewer-rubric.md`; for **`ui`**, also `ui-deep-inspection.md` and **crop/zoom** screenshots of each card/code block. Output **one JSON file** per rubric template (`reviewer: "A"`).

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

## Final audit (after first-pass matrix)

When 34/34 pages have ux–product recorded:

1. Coordinator spawns **one subagent per previously-passed page** (or batched by deployable) — **audit only `ui`** (optional `ux`).
2. Capture `round-audit-1`; compare Storybook PNG to production URL when route exists.
3. If `obviousVisualDefects: "present"` → reset that page’s `ui` (and `allRolesPassed`) in `progress.json`, fix product UI, re-run normal role loop for affected roles.
4. **Re-audit home-marketing first** (known For-your-AI regression class).

Program **not complete** until audit passes or exceptions are logged in `docs/storybook/wave-qa/audit-exceptions.md` (human-approved).

## Weekly capture (local)

Not scheduled in CI. Run `npm run storybook:wave:weekly` locally when needed. **Agent** still runs ux→product loops from `progress.json`.

## Reporting

Tables per `skill-agent-verification-reporting`. State: pages completed, open `mustFix` from last failed role, artifact paths.
