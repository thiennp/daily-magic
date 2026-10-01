# Wave QA coordinator (main agent)

The **main agent does not** capture, score, or fix pages. It:

1. Keeps `progress.json` queue state honest (`reset-agent-roles` after policy changes).
2. Spawns **one cloud subagent per catalog page** (own branch → push → PR when all 4 agent roles pass for that page).
3. Merges PRs to `main` as they land (or asks user to merge); never waits for all 34 pages.

## Subagent branch naming

`cursor/wave-qa-<deployable-lower>-<pageId>-b63b`  
Example: `cursor/wave-qa-awc-home-marketing-b63b`

## Subagent task (one page)

```bash
npm run storybook:wave:page-brief -- AWC home-marketing
```

Copy the printed brief into a **cloud** background agent. Subagent must:

- Build/serve Storybook, `storybook:wave:capture` for that page only.
- For each role `ux` → `copy` → `ui` → `product`: reviewer A + B (PNG evidence), fix `mustFix`, save JSON under `docs/storybook/wave-qa/reviews/`, `storybook:wave:record-agent`.
- Commit + push **only when that page’s four roles pass** (or partial commits per role with message `wave-qa(AWC home-marketing): ux pass round 1`).
- Open/update draft PR to `main`; do **not** touch other pages’ review files.

## Parallelism

- **Never** two subagents on the same page.
- Different pages = different branches → safe parallel cloud agents.
- `progress.json` conflicts: subagent branches should **rebase on main** before final merge; prefer recording all four roles on one branch in one PR per page.

## Main agent report

After spawning: list page id, branch name, PR URL when available, and `progress.json` counts (`passed` roles / 204).
