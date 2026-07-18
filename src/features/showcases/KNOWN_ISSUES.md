# Showcases — known issues

## SHOWCASES-001 — Onboarding articles used static SVG paths only

**Symptom:** Replacing sample SVGs with real screenshots required editing every showcase article by hand.

**Root cause:** Article sections hard-coded `/showcases/onboarding/*.svg` with no PNG swap path.

**Fix:** `ONBOARDING_SHOWCASE_SCREEN` ids, `buildShowcaseOnboardingArticleImage()`, and `ShowcaseArticleFigure` (SVG `img` until PNG captures exist). Capture checklist: `public/showcases/onboarding/CAPTURE.md`.

**Regression test:** `onboardingShowcaseScreens.test.ts`.

---

## SHOWCASES-002 — Onboarding showcase render had no browser E2E

**Symptom:** Article data could use `screenId` correctly while the rendered `<picture>` markup regressed unnoticed.

**Root cause:** Only unit tests covered path builders; no browser check for onboarding guide pages.

**Fix:** `onboardingShowcaseArticles.test.ts` (article images use `screenId`) and `e2e/showcases-onboarding.spec.ts` (Playwright checks figure `img` SVG src loads on showcase pages).

**Run:** `npm run test:e2e:install` once, then `npm run test:e2e`. CI: `.github/workflows/ci.yml`.

---

## SHOWCASES-003 — No executive lane for CMO/CEO buyers

**Symptom:** Showcases and home copy spoke to IT champions (Mac pairing, WebSocket) with no outcome-first path for leadership.

**Root cause:** All articles targeted operators; team section led with rollout mechanics, not cost or governance ROI.

**Fix:** `SHOWCASE_ARTICLES_PHASE_LEADERSHIP` with exec-focused articles, `/showcases` “For leadership” section, home leadership row, and setup-complete share link.

**Regression test:** `leadershipShowcaseArticles.test.ts`.

---

## SHOWCASES-004 — Showcase SVG assets were not valid XML

**Symptom:** Figures showed broken images in the browser even when `src` pointed at existing `.svg` files.

**Root cause:** Several SVGs used Latin-1 bytes, control characters, or unescaped `&` in text/attributes. `<picture>` also preferred missing PNG sources over SVG fallbacks.

**Fix:** Sanitize showcase SVGs to UTF-8 XML, render figures with plain `img` SVG `src`, and auto-attach topic screenshots for articles without inline images.

**Regression test:** `showcaseArticleImages.test.ts`.

---

## SHOWCASES-005 — E2E screenshot capture hung on `networkidle`

**Symptom:** `npm run e2e:capture-screenshots` timed out on authenticated pages (marketplace/home) even though the UI had rendered.

**Root cause:** Live Agent Witch WebSocket / polling keeps the network busy, so Playwright `waitForLoadState("networkidle")` never settles. Default `playwright.config.ts` also ignored `capture-*.spec.ts`.

**Fix:** Capture waits use `domcontentloaded`/`load` only; `playwright.capture.config.ts` runs capture specs; screenshots use `fullPage: true`. Related e2e helpers no longer wait for `networkidle` on app shell pages.

---

## SHOWCASES-006 — Self-delegate article screens need a live Mac for `test-self-*`

**Symptom:** Regenerating `self-delegate-live-terminal.png` / `self-delegate-job-history.png` via `e2e/self-delegate.spec.ts` fails when Agent Witch is connected as a different profile (Mac shows “Last seen …” for `test-self-1`, not “connected”).

**Workaround:** Capture those two article images from a signed-in admin session on localhost when the dedicated test Mac profile is unavailable; re-run self-delegate when `test-self-1@agentwitch.com` has a live Agent Witch link.
