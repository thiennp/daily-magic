# Prompt optimizer — known issues

No open issues. Recent fixes (bundle **166–185**):

- Classic loop submit button follows the same writer readiness as Run (`querySelectorAll("[data-sdlc-run]")`); run hint explains why buttons stay disabled (bundle **185**).
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
