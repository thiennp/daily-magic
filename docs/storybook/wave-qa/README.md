# Storybook page wave QA

One **wave** = one catalog page (all Storybook statuses). Per page, in order:

1. **ux** → **copy** → **ui** → **product** (agent reviewers A + B, PNG evidence)
2. **tester** → **dx** (automated gates)

AWC: desktop + mobile captures. AWL: desktop only.

## Incremental workflow

Work **one page (or one role) at a time** → record → commit. Do not bulk-automate subjective scores.

```bash
npm run storybook:build
# serve storybook-static on :6008
npm run storybook:wave:capture -- AWC home-marketing 1
# subagent review → save JSON under docs/storybook/wave-qa/reviews/...
npm run storybook:wave:record-agent -- AWC home-marketing ux path/a.json path/b.json
```

Rubric: **`reviewer-rubric.md`**. Strict bar: **`quality-bar.md`**. **`ui`:** **`ui-deep-inspection.md`**.

After first-pass **34/34**: nine catalog waves — UX, UI, copy, product, performance, tester, dx, a11y, interaction — see **`QUEUE_POST_COMPLETION_WAVES.md`** and **`CATALOG_ORDER_34.md`**.

## Commands

| Script                             | Purpose                                            |
| ---------------------------------- | -------------------------------------------------- |
| `storybook:wave:init`              | Fresh progress template                            |
| `storybook:wave:reset-agent-roles` | Clear ux–product scores (keeps tester/dx)          |
| `storybook:wave:capture`           | PNGs for one page                                  |
| `storybook:wave:record-agent`      | Validate + write agent A/B JSON to `progress.json` |
| `storybook:wave:validate`          | All stories render (tester)                        |
| `storybook:wave:objective-gates`   | Write tester + dx scores                           |

**Removed:** subjective Playwright rubric (`subjective-eval` / `subjective-record`) — not valid for pass/fail.

Progress: `progress.json` in this folder.

## Weekly capture (local)

Weekly capture is **not** scheduled in CI. When needed, run locally:

```bash
npm run storybook:wave:weekly
```

- Skill: `.cursor/skills/skill-storybook-page-wave-qa/SKILL.md`
- Command: `.cursor/commands/command-storybook-wave-qa-weekly.md`
