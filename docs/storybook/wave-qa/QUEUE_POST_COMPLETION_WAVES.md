# Wave QA — post-completion audit waves (master plan)

After the **first-pass sequential queue** (`QUEUE_SEQUENTIAL.md`) reaches **34/34** `allRolesPassed` on `main`, run **additional full-catalog waves** — **one concern per wave**, **one page at a time**, same gate as first pass:

- Do **not** start page _N+1_ until page _N_ passes the **current wave** with **no open `mustFix`**.
- Do **not** start wave _W+1_ until wave _W_ is **34/34 done** on `main`.
- Catalog order: **`CATALOG_ORDER_34.md`** every time.
- Recapture after product fixes; `npm run ci` green before ship (`coordinator.md`).
- Review JSON folder per wave: `docs/storybook/wave-qa/reviews/<Deployable>/<pageId>/<wave-folder>/`.
- Branch pattern: `cursor/wave-qa-<wave>-<deployable-lower>-<pageId>-b63b` (e.g. `cursor/wave-qa-copy-audit-awc-terms-b63b`).

Track active wave + page in **`CURRENT_PAGE.md`**. Coordinator updates **`CURRENT_WAVE.md`** (wave id + progress 0–34).

---

## Wave order (mandatory)

| #   | Wave id               | Focus                                   | Role / tooling                                     | Pass bar                                   | Review folder          | Detail doc                                                                                                        |
| --- | --------------------- | --------------------------------------- | -------------------------------------------------- | ------------------------------------------ | ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 1   | `ux-audit-1`          | Luồng, scan path, friction              | **ux** only, A+B                                   | ≥97, `quality-bar.md`                      | `ux-audit-1/`          | `QUEUE_UX_AUDIT.md`                                                                                               |
| 2   | `ui-audit-1`          | Pixel, layout, defects                  | **ui** only, A+B                                   | **100** AWC desktop+mobile, `computerUse`  | `ui-audit-1/`          | `coordinator.md` § Final UI audit, `ui-deep-inspection.md`                                                        |
| 3   | `copy-audit-1`        | **Text** — strings, tone, terms         | **copy** only, A+B                                 | ≥97; read every string on every status PNG | `copy-audit-1/`        | `quality-bar.md` § copy                                                                                           |
| 4   | `product-audit-1`     | **Tính năng** — demo truth, fixtures    | **product** only, A+B                              | ≥97; honest vs production                  | `product-audit-1/`     | `quality-bar.md` § product                                                                                        |
| 5   | `perf-audit-1`        | **Hiệu suất** — perceived speed, weight | Agent perf checklist, A+B                          | ≥95; no blocking perf `mustFix`            | `perf-audit-1/`        | `performance-audit.md`                                                                                            |
| 6   | `tester-audit-1`      | Stories render, states                  | **tester** + `storybook:wave:validate` scoped page | Objective pass                             | `tester-audit-1/`      | `reviewer-rubric.md`                                                                                              |
| 7   | `dx-audit-1`          | Catalog/manifest drift                  | **dx** + `pageStoryManifest.test.ts`               | Objective pass                             | `dx-audit-1/`          | `reviewer-rubric.md`                                                                                              |
| 8   | `a11y-audit-1`        | Keyboard, labels, contrast              | Agent a11y checklist, A+B                          | ≥97; no blocking a11y `mustFix`            | `a11y-audit-1/`        | `accessibility-audit.md`                                                                                          |
| 9   | `interaction-audit-1` | Menus, focus, mobile chrome             | Playwright / `computerUse` where defined           | All matrix items pass                      | `interaction-audit-1/` | AWC: `docs/product/audits/awc-projects-interaction-matrix-2026-10-01.md` pattern; add per-page matrices as needed |

**AWC-only waves:** `interaction-audit-1` runs on all AWC catalog pages; AWL pages use AWL-specific interaction notes in page brief when no matrix file exists.

---

## Subjective waves (3–5, 8)

Same subagent loop as first pass:

1. `npm run storybook:wave:page-brief -- <Deployable> <pageId>`
2. Capture if stale
3. Reviewer A JSON → fixes → Reviewer B JSON (B must not read A first)
4. `npm run storybook:wave:record-agent` **only when** recording into `progress.json` for that **role** is desired; audit waves may instead append notes in review JSON only until tooling adds `auditWaves` in `progress.json`

For audit-only waves, **minimum ship artifact**: both reviewer JSON files + any code fix + CI green.

---

## Objective waves (6–7)

One subagent per page (or batch validate once per wave start, then fix failures page-by-page):

- `STORYBOOK_BASE_URL=http://127.0.0.1:6008 npm run storybook:wave:validate` — fail → fix story/fixture → re-run for that page’s stories.
- `npm run storybook:wave:objective-gates` after full validate green (or document scoped exception in `audit-exceptions.md`).

---

## “Done” definition

Wave QA is **not** complete until:

1. First-pass **six roles** × 34 pages on `main`, **and**
2. Waves **1–9** above are **34/34** (or documented skip in `audit-exceptions.md`), **and**
3. Coordinator sets `docs/storybook/wave-qa/COMPLETE.md` with date + commit SHA.

Optional later: `ux-audit-2` / `ui-audit-2` only after a **policy change** in `quality-bar.md` (see § When quality regresses).
