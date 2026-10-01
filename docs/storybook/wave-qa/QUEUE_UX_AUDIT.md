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

## Catalog order (34 pages)

Process in **this** order (matches `storybookWavePageCatalog.ts`):

1. AWC `home-marketing`
2. AWC `login`
3. AWC `home-signed-in`
4. AWC `for-agents`
5. AWC `setup-writer`
6. AWC `privacy`
7. AWC `terms`
8. AWC `projects`
9. AWC `project-detail`
10. AWC `library`
11. AWC `marketplace`
12. AWC `reports`
13. AWC `report-detail`
14. AWC `automations`
15. AWC `prompt-optimizer`
16. AWC `prompt-optimizer-guide`
17. AWC `connection-lab`
18. AWC `showcases`
19. AWC `admin-users`
20. AWC `admin-groups`
21. AWL `home`
22. AWL `task`
23. AWL `prompt-optimizer`
24. AWL `prompt-optimizer-guide`
25. AWL `status`
26. AWL `projects`
27. AWL `project`
28. AWL `harness`
29. AWL `writer-api`
30. AWL `knowledge`
31. AWL `history`
32. AWL `writer-sessions`
33. AWL `errors`
34. AWL `traffic`

## Coordinator

While UX audit runs, set `CURRENT_PAGE.md` to the active row and track progress in `progress.json` under each page’s `roles.ux` with notes prefix `UX audit 1:` (or add `uxAuditPassed` when tooling supports it).

## After UX audit

Mandatory **final UI audit** (`round-audit-1`, ui-only) — see `coordinator.md` § Final UI audit. Do not report “wave QA complete” until **both** UX audit and UI audit waves finish.
