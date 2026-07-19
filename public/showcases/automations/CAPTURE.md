# Automation showcase screenshots

PNG captures live next to SVG fallbacks. Articles use `<picture>`: PNG when the file exists, SVG fallback otherwise.

## Capture all showcase PNGs

```bash
npm run showcase:capture
```

## File names

| Screen ID                 | PNG path                                                |
| ------------------------- | ------------------------------------------------------- |
| `01-home-popular-presets` | Clip `#popular-presets-heading` section (not full-page) |
| `02-new-automation`       | `02-new-automation.png`                                 |
| `03-automations-list`     | `03-automations-list.png`                               |

Update `AUTOMATION_SHOWCASE_SCREEN_DIMENSIONS` in
`src/features/showcases/automationShowcaseScreens.constant.ts` after re-capture.

## Article

- `/showcases/automate-for-yourself-or-your-team`
