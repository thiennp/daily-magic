# Wave QA — current page (strict gate)

**Policy:** One catalog page at a time. **Do not** start the next page until this one has **all 6 roles** passing `quality-bar.md` with **no open mustFix**.

| Field      | Value                                                                                                       |
| ---------- | ----------------------------------------------------------------------------------------------------------- |
| **Page**   | AWC `setup-writer` (`/setup/writer`)                                                                        |
| **Round**  | **1**                                                                                                       |
| **Branch** | `cursor/wave-qa-awc-setup-writer-b63b`                                                                      |
| **Gate**   | ui **100/100** desktop+mobile, `computerUse` + ≥6 zooms; ux/copy/product **≥97**; tester+dx objective gates |

## After this page

**Completed:** AWC `for-agents` round 1 (`allRolesPassed: true` on branch `cursor/wave-qa-awc-for-agents-b63b`). Next: AWC `setup-writer` only.

## Coordinator

- Single cloud subagent on this page only.
- Merge to `main` when CI green + six roles pass (or PR if integration requires).
