# Wave QA — paused (2026-10-01)

**Reason:** Production `/projects` shell failed independent UI review (floating nav card, weak brand anchor). **Shell fix merged to `main` (PR #216, 2026-10-01)** — desktop sidebar + header brand; projects list MF-01–05.

**Until resume:**

- Do not spawn new per-page wave QA subagents until **signed-in production** `/projects` at 1440px is confirmed by owner (post-deploy).
- Do not record new `passed: true` for ux–product without expert sign-off + production parity check.

**Artifacts:** `docs/product/audits/phases/*`, `awc-projects-ui-review-2026-10-01.md` (Reviewer C **99%**, `releaseApproved: true`).
