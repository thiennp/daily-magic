# Topic showcase screenshots

PNG captures for articles enriched with a topic screen image.

## Capture all showcase PNGs

```bash
npm run showcase:capture
```

Uses `public/dev-showcase-capture.html?folder=topics&screen=…`.

Do not reuse `/admin/groups` for `08-approvals` / `10-leadership` — those stories
need distinct UI (or rely on the curated SVG). Marketing cards always prefer SVG.

Update `SHOWCASE_TOPIC_SCREEN_DIMENSIONS` in
`src/features/showcases/showcaseTopicScreens.constant.ts` after re-capture.
