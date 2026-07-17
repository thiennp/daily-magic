# Onboarding showcase screenshots

PNG captures live next to SVG fallbacks. Articles use `<picture>`: PNG when the file exists, SVG fallback otherwise.

## Capture all showcase PNGs

```bash
npm run showcase:capture
```

Uses `public/dev-showcase-capture.html?folder=onboarding&screen=…` and trims with background padding.

## File names

| Screen ID            | PNG path                 |
| -------------------- | ------------------------ |
| `01-home-checklist`  | `01-home-checklist.png`  |
| `02-mac-connected`   | `02-mac-connected.png`   |
| `03-sample-workflow` | `03-sample-workflow.png` |
| `04-job-history`     | `04-job-history.png`     |
| `05-company-rules`   | `05-company-rules.png`   |

Update `ONBOARDING_SHOWCASE_SCREEN_DIMENSIONS` in
`src/features/showcases/onboardingShowcaseScreens.constant.ts` after re-capture.

## Articles

- `/showcases/onboard-in-15-minutes` — screens 01–04
- `/showcases/company-onboard-in-30-minutes` — screens 04–05
