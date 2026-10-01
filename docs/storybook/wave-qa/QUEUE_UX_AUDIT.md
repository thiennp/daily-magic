# Wave QA — post-sequential UX audit (all pages)

**Start only when:** every catalog row in `progress.json` has `allRolesPassed: true` for the **first-pass sequential wave** (`QUEUE_SEQUENTIAL.md` + early-complete pages in `coordinator.md`).

**Policy:** Same discipline as sequential wave QA — **one page at a time**. Do **not** open the next page until the current page’s UX audit passes with **no open `mustFix`**.

## Scope

| Item                  | Rule                                                                                                                                                                        |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Role**              | **ux only** (re-review); copy/ui/product/tester/dx scores stay unless UX fixes force a recapture                                                                            |
| **Round**             | `uxAuditRound: 1` in review JSON (`captureRound` = new capture round for that page)                                                                                         |
| **Pass**              | `quality-bar.md`: ux **≥ 97**, reviewer A + B within 3 points, empty `mustFix`                                                                                              |
| **AWC public / auth** | `visualEvidenceMethod: "computerUse"` on ux when page is marketing, login, for-agents, privacy, terms, or similar full-page reads (same list as ui bar in `quality-bar.md`) |
| **Evidence**          | Recapture after any product fix; reviews under `docs/storybook/wave-qa/reviews/<Deployable>/<pageId>/ux-audit-1/`                                                           |
| **Branch**            | `cursor/wave-qa-ux-audit-<deployable-lower>-<pageId>-b63b`                                                                                                                  |
| **Ship**              | `npm run ci` green → push `main` (or draft PR if integration requires) per `coordinator.md`                                                                                 |

## Catalog order

**`CATALOG_ORDER_34.md`** (34 pages, same order every wave).

## Coordinator

While UX audit runs, set `CURRENT_PAGE.md` to the active row and track progress in `progress.json` under each page’s `roles.ux` with notes prefix `UX audit 1:` (or add `uxAuditPassed` when tooling supports it).

## After UX audit

Continue **`QUEUE_POST_COMPLETION_WAVES.md`** (UI → copy → product → performance → tester → dx → a11y → interaction). Do not report “wave QA complete” until all waves in that doc are 34/34.
