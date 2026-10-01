# Storybook page wave QA

One **wave** = one catalog page (all Storybook statuses). Review order per page:

1. **ux** — alternating reviewer A / B until both ≥ 95%
2. **copy** — same
3. **ui** — same
4. **product** — same
5. **tester** — same
6. **dx** — same

AWC captures **desktop + mobile**; AWL **desktop** only.

## Commands

```bash
npm run storybook:wave:init
npm run storybook:wave:capture -- AWC home-marketing 1
```

Screenshots: `/opt/cursor/artifacts/storybook-waves/{AWC|AWL}/{pageId}/round-{n}/`

Progress: `progress.json` in this folder.

## Subjective rubric (ux | copy | ui | product)

After `npm run storybook:build` and serving `storybook-static` on port 6008:

```bash
STORYBOOK_BASE_URL=http://127.0.0.1:6008 npm run storybook:wave:subjective-eval > /tmp/wave-qa-a.json
STRICT=1 STORYBOOK_BASE_URL=http://127.0.0.1:6008 npm run storybook:wave:subjective-eval > /tmp/wave-qa-b.json
npm run storybook:wave:subjective-record -- /tmp/wave-qa-a.json /tmp/wave-qa-b.json
npm run storybook:wave:objective-gates
```

Reviewer B uses `STRICT=1`. Spot-check PNG reviews remain optional; both eval JSON files must pass before recording.

## Weekly (Saturday)

- **Skill:** `.cursor/skills/skill-storybook-page-wave-qa/SKILL.md`
- **Command:** `.cursor/commands/command-storybook-wave-qa-weekly.md`
- **CI:** `.github/workflows/storybook-wave-qa-weekly.yml` (Saturday 02:00 UTC)
- **Local / CI capture:** `npm run storybook:wave:weekly` → `storybook-wave-captures/`
