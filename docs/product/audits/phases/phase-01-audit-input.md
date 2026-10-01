# Phase 01 — AWC UI granular audit (input)

**Role:** Auditor A (isolated; no coordination with other agents in this phase).  
**Scope:** Agent Witch Console (AWC) signed-in surface at `/projects`.  
**Date baseline:** 2026-10-01.

## Product context

- **Route:** `https://www.agentwitch.com/projects` (local: `http://localhost:3000/projects` after auth).
- **Job:** Cloud registry of projects (name, folder refs, membership ACL, activity events). **Content and composition editing happen on Mac (AWL)**, not in AWC.
- **Audience:** Signed-in SaaS user with one or more Macs and multiple repo projects.

## Evidence (required)

1. **Production or staging capture** — full-page screenshot of `/projects` with ≥6 project cards visible (signed-in).
2. **Code trace (read-only)** — `src/features/projects/*`, `src/features/pages/layouts/ProjectsPageLayout.tsx`, `src/app/(app)/projects/page.tsx`.
3. **Copy rules** — `docs/product/philosophy-and-copy-guideline.md` (Mac, Task, Run, Playbook; avoid harness on user-facing nav where policy applies).

Do **not** use wave QA `progress.json` or other agents’ review JSON as primary evidence.

## Deliverable

Write:

`docs/product/audits/awc-projects-ui-granular-2026-10-01.md`

### Required sections

| Section          | Content                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| `executiveScore` | Integer 0–100 for overall signed-in SaaS readiness of this page                                                     |
| `scoreBreakdown` | Array of `{ "dimension", "score", "weight", "notes" }` (weights sum to 1.0)                                         |
| `checklist`      | Array of `{ "id", "criterion", "status": "pass" \| "fail" \| "partial", "evidence" }`                               |
| `mustFix`        | Ordered array of `{ "id", "title", "severity", "rationale", "suggestedDirection" }` — ship blockers for SaaS polish |
| `niceToHave`     | Same shape; non-blocking improvements                                                                               |

### Scoring guidance

- **≥90:** Differentiates projects at a glance, vocabulary aligned, clear Mac linkage and next steps, minimal cognitive load.
- **70–89:** Usable but noticeable friction (copy density, duplicate names, weak filters).
- **<70:** Hard to operate a multi-project workspace without reading every card path.

### Out of scope (phase 01)

- Application code changes.
- Project detail (`/projects/[id]`) unless list UI depends on it.
- AWL / Mac install flows (mention only as list CTAs).

## Git

- Branch: `cursor/awc-projects-ui-audit-granular-b63b` from `main`.
- Commit **only** audit markdown and this phase file.
