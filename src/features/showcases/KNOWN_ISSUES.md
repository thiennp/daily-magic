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

---

## SHOWCASES-007 — Marketplace workflow E2E Start click hits Home CTA

**Symptom:** Playwright `getByRole("button", { name: "Start" })` matched both the home hero Start and the Send-a-task modal Start (strict mode violation).

**Fix:** Scope the click to `.modal` with `exact: true` in `marketplace-workflow-self-delegate.spec.ts`.

---

## SHOWCASES-008 — Agent Witch restart crashed on `__dirname` in ESM

**Symptom:** Manual restart via `npx tsx agent-witch.ts` / `run.sh` after profile edits threw `ReferenceError: __dirname is not defined in ES module scope` from `resolveAgentWitchLocalLayout.ts`.

**Fix:** Resolve the module directory with `fileURLToPath(import.meta.url)` instead of `__dirname`.

---

## SHOWCASES-009 — Home / showcases cards hid article screenshots

**Symptom:** “Start here” and “More examples” cards showed title and copy only — no sample screenshots despite article images existing under `public/showcases/`.

**Root cause:** `ShowcaseCard` never rendered section images; `/showcases` index also skipped `enrichShowcaseArticleWithImages`.

**Fix:** Cover image from first section via `resolveShowcaseArticleCoverImage`; enrich index articles before render.

**Regression test:** `resolveShowcaseArticleCoverImage.test.ts`.

---

## SHOWCASES-010 — Article figures stretched to full-page capture height

**Symptom:** Showcase article images (e.g. home popular presets) rendered thousands of pixels tall because `<picture>` preferred full-page PNGs over curated SVGs.

**Root cause:** Capture PNGs used `fullPage: true`; figure used `h-auto w-full` with no crop.

**Fix:** Padded 16:10 `object-cover object-top` frame on all article figures; prefer SVG when PNG aspect is taller than ~square.

**Regression test:** `showcaseFigureCrop.constant.test.ts`.

---

## SHOWCASES-011 — Marketing articles used limit/demo/sample apology copy

**Symptom:** Showcase guides framed product with headings like “Honest limits”, “sample data”, “demo prompt”, and “Supported with caveats”.

**Root cause:** Early drafts optimized for engineer honesty over marketing tone on `/showcases` and home showcase rows.

**Fix:** Rewrite article sections and index/home shells to benefit-first framing; support labels “Ready to use” / “Works with this setup”; ban apology/demo/sample phrases in article marketing strings.

**Regression test:** `showcaseMarketingCopy.test.ts`.

---

## SHOWCASES-012 — Try-next CTAs broke for logged-out readers

**Symptom:** “Open Send a task” (`/?sendTask=1`) and similar app CTAs from showcase articles opened the marketing home (or empty app shell) when the reader was not signed in. “Open Automations” via a hard-coded login URL also skipped signed-in users past the destination.

**Root cause:** Home renders `HomeMarketingLanding` when anonymous, so `sendTask` is ignored. tryNext links pointed at app routes without an auth-aware wrap.

**Fix:** `resolveShowcaseTryNextHref` + `ShowcaseTryNextLink` wrap auth-gated destinations with `/login?callbackUrl=…` for anonymous readers and unwrap login URLs when already signed in. Article data stores destination paths.

**Regression test:** `resolveShowcaseTryNextHref.test.ts`, `showcaseArticleLinks.test.ts`.

---

## SHOWCASES-013 — Home card cover showed marketing hero, not presets

**Symptom:** Featured “Automate for yourself” card used `01-home-popular-presets.png` but the crop showed the home hero/sign-up UI, not popular workflow cards.

**Root cause:** Capture used `fullPage: true` (tall PNG); card `object-top` framed the top of the page. Cover resolver always used the PNG `src`.

**Fix:** Capture clips `#popular-presets-heading` section; card covers use the curated presets SVG via `resolveShowcaseCoverSrc` (tall PNGs still fall back to SVG elsewhere).

**Regression test:** `resolveShowcaseCoverSrc.test.ts`, `resolveShowcaseArticleCoverImage.test.ts`.

---

## SHOWCASES-014 — Card and article images illegible / wrong content

**Symptom:** Home and /showcases card covers used full-page PNGs (`object-cover object-top`) so text was unreadable at ~300px wide; some topic PNGs (e.g. approvals) were identical admin captures that did not match the story.

**Root cause:** Capture reused `/admin/groups` for approvals/leadership; cover resolver preferred PNG; crop mode hid illustration labels.

**Fix:** Covers and marketing figures prefer curated SVGs; cards/figures use `object-contain` with larger min-heights; topic alts use screen captions.

**Regression test:** `resolveShowcaseCoverSrc.test.ts`, `resolveShowcaseArticleCoverImage.test.ts`.
