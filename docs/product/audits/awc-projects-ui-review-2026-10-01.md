# AWC Projects UI — Phase 3 independent review (Reviewer C)

**Date:** 2026-10-01  
**Branch reviewed:** `cursor/awc-projects-shell-fix-b63b`  
**Scope:** Signed-in `/projects` **shell only** (desktop chrome, nav placement, header brand). Page content/cards scored only where they affect shell density or hierarchy.  
**Inputs:** `docs/product/audits/awc-projects-ui-fix-notes-2026-10-01.md`, production reference `/opt/cursor/artifacts/awc-projects-production-1440.png`, after-fix captures below.

## Visual evidence

| Viewport | Artifact                                                | Method                                                                                             |
| -------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 1440×900 | `/opt/cursor/artifacts/awc-projects-after-fix-1440.png` | Storybook `awc-pages--projects-ready` (same `AppShell` + `ProjectsPageLayout` as production route) |
| 1280×900 | `/opt/cursor/artifacts/awc-projects-after-fix-1280.png` | Same story                                                                                         |

**Local dev:** `npm run dev` on branch; `POST /api/auth/test-login` for `test-qa-1@agentwitch.com` returned **500** (`Could not sign in`) because this VM’s injected `DATABASE_URL` lacks daily-magic schema (documented in `AGENTS.md`). Shell evidence therefore uses Storybook, consistent with fix-notes evidence path.

## Shell comparison (after-fix vs production reference)

| Area             | Production reference (1440)                                         | After-fix                                                               | Verdict                                              |
| ---------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------- |
| Primary nav      | Floating card panel above content; brand + “AWL …” inside nav card  | Left **column rail** in `md+` grid; links only in rail (no nested card) | **Improved** — matches P0-SHELL-01 workspace pattern |
| Header (desktop) | Brand only inside nav card; header row is actions-only on the right | **Agent Witch** logo/wordmark in header left; actions right             | **Improved** — P0-SHELL-02; clearer global chrome    |
| Layout grid      | Nav card and main content feel stacked/disconnected                 | Sidebar + main in one `max-w-[1600px]` grid; sticky rail under header   | **Improved**                                         |
| 1280px           | (not captured for prod)                                             | Rail + header brand remain stable; no overlap or collapse               | **Pass**                                             |

Non-shell deltas (card copy, playbook counts, new-project panel) were not used to lower the shell score.

## Scores

**satisfactionScore:** **99**

**scoreBreakdown:**

| Dimension                  | Score | Notes                                                                                                                                                                       |
| -------------------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `shellNavigationStructure` | 100   | Desktop primary nav is a true left column, not an embedded floating panel                                                                                                   |
| `headerBrandAndChrome`     | 99    | Desktop brand anchor present and balanced with CTA/theme/user; install bundle subline (“AWL …”) no longer in chrome (was on prod nav card) — optional polish, not a blocker |
| `layoutAlignmentAndWidth`  | 100   | Header, grid, and main column align; projects page uses narrow content width appropriately                                                                                  |
| `viewportStability`        | 100   | Verified 1280 and 1440; no shell regressions observed                                                                                                                       |

**whyBelowThreshold:** N/A (score &gt; 98).

**remainingMustFix:** None for shell release.

**releaseApproved:** **true**

## Recommendation

Approve merging `cursor/awc-projects-shell-fix-b63b` → `main` for shell work. Follow-up (out of shell scope): re-verify authenticated `http://localhost:3000/projects` on an environment with a dedicated daily-magic Neon DB and test auth.
