# Prompt optimizer — known issues

No open issues. Recent fixes (bundle **166–186**):

- Wizard completion uses honest **passed** vs **stopped** when not every module meets the wizard pass score; outcome table lists per-module score, tokens, and status (bundle **186**).
- Compose: wizard-only **Run** (classic loop removed from UI and `run-classic` intent); sticky bar spacing; Run shows spinner + `aria-busy` while starting; wizard resume card shows live status + **View inputs** for active runs (bundle **201**).
- Step 3 chain/parallel badges and explainer; Step 4 chain handoff preview with skip/no-output reasons; cumulative wizard tokens on gates when statistics exist (bundle **186**).

- Compose `<details>` no longer uses `display:flex` on the element itself (that hid all fields in Chrome); body lives in `.sdlc-compose-details-body`. Sticky **Run** bar sits outside `<details>` (bundle **200**).
- Compose **Run** stays enabled; block reasons show in `data-sdlc-run-hint` (bundle **199**).
- Removed **Suggest goals** from compose (bundle **200**).
- Agent API `POST /prompt-optimizer/agent` starts wizard runs (pass 70, max rounds 5) like the compose form (bundle **201**).

- Wizard steps stack in a collapsed accordion; Continue / Run update the page via live HTML fragments (no full reload). While a run is active, compose stays **expanded** (fields disabled) so settings stay visible; only finished runs collapse compose. Live poll attaches after wizard Run even when `#prompt-optimizer-run` was not in the first paint.

- Generalize gate prompt appears after live poll without full reload.
- Compose form stays locked at wizard gates (not unlocked by `sdlc-run-finished`).
- Runner writer readiness is probed like judge/improver (`data-writer-status="runner"`).
- Wizard gate scrolls into view when it first appears.
- Wizard gate / resume / interrupt UI spacing; step lede copy; compose + guide text match the four-step wizard vs classic loop (bundle **168**).
- Wizard timeline shows Steps 1–4 (not classic rounds during generalize); step 2 after step 1, not step 4 (bundle **169**).
- Step 2 evaluate gate no longer appears empty when judge scoring fails: failed runs stay **failed** with an error instead of a blank gate; unscored rounds show “not scored” + notice (bundle **173**).
- Step 4 optimize gate uses the same failed-run behavior when module judge scoring fails (bundle **174**).
- Wizard step 2 **evaluate** scores prompt revisions only; folder execution stays on step 4 **optimize** with the Runner (bundle **175**).
- Wizard timeline step clicks open a modal with that step’s content (variables, evaluate rounds, splits, modules), not “Not scored yet.” (bundle **176**).
- Wizard step 4 runs **one runner+judge round per module** (statistics on the review gate); **chain** splits hand off the prior module’s best runner output to the next module (bundle **184**).
- Finished wizard runs can **download a Markdown summary** (`?cycle=&export=wizard-markdown`); History can filter **All / Wizard / Classic** (bundle **187**).
