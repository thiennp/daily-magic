# Prompt optimizer — known issues

No open issues. Recent fixes (bundle **166–186**):

- Wizard completion uses honest **passed** vs **stopped** when not every module meets the wizard pass score; outcome table lists per-module score, tokens, and status (bundle **186**).
- Compose: classic pass/round limits under **Classic loop options**, wizard limits callout, role-step table, collapsed instruction fields, runner prefilled from judge; history shows **Wizard · Step N**; field tips close on Escape with `aria-expanded` (bundle **186**).
- Step 3 chain/parallel badges and explainer; Step 4 chain handoff preview with skip/no-output reasons; cumulative wizard tokens on gates when statistics exist (bundle **186**).

- Compose `<details>` no longer uses `display:flex` on the element itself (that hid all fields in Chrome); body lives in `.sdlc-compose-details-body`. Sticky **Run** bar sits outside `<details>` (bundle **200**).
- Compose **Run** and **Classic loop** stay enabled; block reasons show in `data-sdlc-run-hint` (bundle **199**).
- Removed **Suggest goals** from compose (bundle **200**).
- Agent API `POST /prompt-optimizer/agent` uses classic loop defaults (pass 90, max rounds 10) instead of wizard 70/5 (bundle **185**).

- Wizard steps stack in a collapsed accordion; Continue / Run update the page via live HTML fragments (no full reload). Compose stays on top, collapses after submit, and disabled fields use a light grey background.

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
- Finished wizard runs can **download a Markdown summary** (`?cycle=&export=wizard-markdown`); History can filter **All / Wizard / Classic**; compose offers **Load wizard verification example** (bundle **187**).
