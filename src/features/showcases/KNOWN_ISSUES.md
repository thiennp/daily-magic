# Showcases — known issues

## SHOWCASES-001 — Onboarding articles used static SVG paths only

**Symptom:** Replacing sample SVGs with real screenshots required editing every showcase article by hand.

**Root cause:** Article sections hard-coded `/showcases/onboarding/*.svg` with no PNG swap path.

**Fix:** `ONBOARDING_SHOWCASE_SCREEN` ids, `buildShowcaseOnboardingArticleImage()`, and `ShowcaseOnboardingFigure` (`<picture>` PNG → SVG fallback). Capture checklist: `public/showcases/onboarding/CAPTURE.md`.

**Regression test:** `onboardingShowcaseScreens.test.ts`.
