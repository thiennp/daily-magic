# Storybook page wave QA (weekly)

Load skill: **`@.cursor/skills/skill-storybook-page-wave-qa/SKILL.md`**

## Weekly capture (local)

Weekly capture is **not** scheduled in CI. Run locally when needed; agent continues review/fix loops from `docs/storybook/wave-qa/progress.json`.

## Quick commands

```bash
npm run storybook:wave:weekly              # build + capture all (local)
npm run storybook:wave:capture -- AWC home-marketing 1
npm run storybook:wave:reset-agent-roles   # clear ux–product (after rubric invalidation)
npm run storybook:wave:record-agent -- AWC home-marketing ux a.json b.json
```

Subjective scoring: **agent PNG review only** — see `docs/storybook/wave-qa/reviewer-rubric.md`.
