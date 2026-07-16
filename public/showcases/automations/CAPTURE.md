# Automation showcase screenshots

Drop **PNG** captures next to the existing **SVG** samples. Articles use `<picture>`: PNG when the file exists, SVG fallback otherwise.

## File names

| Screen ID                 | PNG path                      | When to capture                                   |
| ------------------------- | ----------------------------- | ------------------------------------------------- |
| `01-home-popular-presets` | `01-home-popular-presets.png` | Signed-out home → Popular workflows section       |
| `02-new-automation`       | `02-new-automation.png`       | `/automations` → New automation form filled in    |
| `03-automations-list`     | `03-automations-list.png`     | `/automations` with at least one enabled schedule |

## Article

- `/showcases/automate-for-yourself-or-your-team`

## Code

- Screen IDs: `src/features/showcases/automationShowcaseScreens.constant.ts`
- Article helper: `buildShowcaseAutomationArticleImage()`
