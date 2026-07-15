# Onboarding showcase screenshots

Drop **PNG** captures next to the existing **SVG** samples. Articles use `<picture>`: PNG when the file exists, SVG fallback otherwise.

## File names (required)

| Screen ID            | PNG path                 | When to capture                                                               |
| -------------------- | ------------------------ | ----------------------------------------------------------------------------- |
| `01-home-checklist`  | `01-home-checklist.png`  | Signed-in Home with onboarding checklist visible (before or after Mac paired) |
| `02-mac-connected`   | `02-mac-connected.png`   | Home → Your setup / Your Devices with a paired Mac online                     |
| `03-sample-workflow` | `03-sample-workflow.png` | Library → **Sample: Weekly status update** with dummy fields filled           |
| `04-job-history`     | `04-job-history.png`     | Job history with one completed sample run                                     |
| `05-company-rules`   | `05-company-rules.png`   | `/admin/groups` — company group, dispatch policy, seeded playbooks            |

## Capture checklist

1. Sign in on staging or prod (use a dedicated demo account).
2. Complete onboarding through step 3 or use an account that already has sample data.
3. Capture at **~1280×800** (or 2× for retina); crop to the relevant panel.
4. Save as PNG (no secrets, tokens, or real customer data in frame).
5. Commit PNGs beside the matching `.svg` in this folder — no article edits needed.

## Articles using these screens

- `/showcases/onboard-in-15-minutes` — screens 01–04
- `/showcases/company-onboard-in-30-minutes` — screens 04–05

## Code

- Screen IDs: `src/features/showcases/onboardingShowcaseScreens.constant.ts`
- Article helper: `buildShowcaseOnboardingArticleImage()`
