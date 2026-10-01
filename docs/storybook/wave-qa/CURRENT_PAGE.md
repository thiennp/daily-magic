# Wave QA — current page (strict gate)

**Policy:** One catalog page at a time. **Do not** start the next page until this one has **all 6 roles** passing `quality-bar.md` with **no open mustFix**.

| Field      | Value                                                                                                       |
| ---------- | ----------------------------------------------------------------------------------------------------------- |
| **Page**   | AWC `terms` (`/terms`)                                                                                      |
| **Round**  | **1**                                                                                                       |
| **Branch** | `cursor/wave-qa-awc-terms-b63b`                                                                             |
| **Gate**   | ui **100/100** desktop+mobile, `computerUse` + ≥6 zooms; ux/copy/product **≥97**; tester+dx objective gates |

## After this page

**Completed:** AWC `privacy` round 1 (`allRolesPassed: true` on `main`, PR #222). In progress: AWC `terms` on `cursor/wave-qa-awc-terms-b63b`.

## Coordinator

- Single cloud subagent on this page only.
- Merge to `main` when CI green + six roles pass (or PR if integration requires).
