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
