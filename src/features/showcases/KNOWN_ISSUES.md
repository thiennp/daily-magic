# Showcases — known issues

## SHOWCASES-001 — Onboarding articles used static SVG paths only

**Symptom:** Replacing sample SVGs with real screenshots required editing every showcase article by hand.

**Root cause:** Article sections hard-coded `/showcases/onboarding/*.svg` with no PNG swap path.

**Fix:** `ONBOARDING_SHOWCASE_SCREEN` ids, `buildShowcaseOnboardingArticleImage()`, and `ShowcaseOnboardingFigure` (`<picture>` PNG → SVG fallback). Capture checklist: `public/showcases/onboarding/CAPTURE.md`.

**Regression test:** `onboardingShowcaseScreens.test.ts`.

---

## SHOWCASES-002 — Onboarding showcase render had no browser E2E

**Symptom:** Article data could use `screenId` correctly while the rendered `<picture>` markup regressed unnoticed.

**Root cause:** Only unit tests covered path builders; no browser check for onboarding guide pages.

**Fix:** `onboardingShowcaseArticles.test.ts` (article images use `screenId`) and `e2e/showcases-onboarding.spec.ts` (Playwright checks `<picture>` PNG/SVG fallback on `/showcases/onboard-in-15-minutes` and `/showcases/company-onboard-in-30-minutes`).

**Run:** `npm run test:e2e:install` once, then `npm run test:e2e`. CI: `.github/workflows/ci.yml`.
