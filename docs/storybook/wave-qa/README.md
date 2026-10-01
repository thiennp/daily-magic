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

Rubric + JSON shape: **`reviewer-rubric.md`**. **`ui`** also requires **`ui-deep-inspection.md`**.

After all 34 pages first-pass: mandatory **final UI audit** (`round-audit-1`) — see skill + **`coordinator.md`**.

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

## Weekly (Saturday)

- Skill: `.cursor/skills/skill-storybook-page-wave-qa/SKILL.md`
- Command: `.cursor/commands/command-storybook-wave-qa-weekly.md`
- CI: `.github/workflows/storybook-wave-qa-weekly.yml`
- `npm run storybook:wave:weekly`
