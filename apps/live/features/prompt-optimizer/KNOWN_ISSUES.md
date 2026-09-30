# Prompt optimizer — known issues

## Writer JSON parse failures (generalize / separate)

**Symptom:** `#prompt-optimizer-run` shows an `alert-error` such as “The writer JSON was cut off…” or a raw `JSON.parse` message after wizard **generalize** or **separate** runs.

**Fixed (code):** Wizard replies are parsed with brace-aware `readJsonObjects` (not `lastIndexOf("}")`), with repair passes for unescaped newlines inside JSON strings, JavaScript-style **single-quoted** keys/values, trailing commas, a leading `json` label, and UTF-8 BOM. Trailing prose that contains `}` no longer corrupts the slice.

**Still possible:** Replies truncated by the writer CLI token/output limit, or strings that contain unescaped `"` inside `templatedPrompt`, can still fail. Retry the step or add gate instructions to return compact single-line JSON.

- Compose **Run** no longer hides the form before the live fragment inserts `#prompt-optimizer-run`; failed live POSTs reset the Run button (bundle **217**).

No other open issues. Recent fixes (bundle **166–186**):

- Wizard completion uses honest **passed** vs **stopped** when not every module meets the wizard pass score; outcome table lists per-module score, tokens, and status (bundle **186**).
- Compose: wizard-only **Run** (classic loop removed from UI and `run-classic` intent); sticky bar spacing; Run shows spinner + `aria-busy` while starting; wizard resume card shows live status + **View inputs** for active runs (bundle **201**).
- Step 3 chain/parallel badges and explainer; Step 4 chain handoff preview with skip/no-output reasons; cumulative wizard tokens on gates when statistics exist (bundle **186**).
- Progress timeline **Skip** on the active wizard step (`wizard-skip-step`, bundle **215**) bypasses the current gate or running writers; step 4 Skip finishes the wizard (distinct from **Skip module**).

- Compose `<details>` no longer uses `display:flex` on the element itself (that hid all fields in Chrome); body lives in `.sdlc-compose-details-body`. Sticky **Run** bar sits outside `<details>` (bundle **200**).
- Compose **Run** stays enabled; `data-sdlc-run-hint` shows block reasons only after a blocked Run click (bundle **206**).
- Compose is a four-step stepper (Project → Prompt and goal → CLI → Summary); **Run** and the sticky submit bar live on Summary only (bundle **207**).
- Compose **Run** validation runs in capture phase before the wizard live POST so blocked clicks do not start a run (bundle **208**).
- Removed **Suggest goals** from compose (bundle **200**).
- Agent API `POST /prompt-optimizer/agent` starts wizard runs (pass 70, max rounds 5) like the compose form (bundle **201**).

- Wizard steps stack in a collapsed accordion; Continue / Run update the page via live HTML fragments (no full reload). While a run is active, `#prompt-optimizer-compose` is hidden (`sdlc-compose-run-focus`) so **This run** and wizard gates stay in view; finished runs show the collapsed compose summary. Live poll attaches after wizard Run even when `#prompt-optimizer-run` was not in the first paint.

- Step 1 **Generalize** auto-continues to evaluate when the writer returns a concrete templated prompt with **no** `variables` rows and **no** `{{placeholders}}` (bundle **210**).
- Step 2 **Evaluate** auto-continues to separate when the best (or selected) revision passes the wizard quality gate (score ≥ 70, `passed: true`). Step 3 **Separate** auto-continues to Step 4 when the writer returns one option with a single module (bundle **212**).
- Failed wizard runs show a **Failed** badge (not Complete), name the wizard step in the activity title, and surface `errorMessage` on the timeline **Failed** row and in the step modal (bundle **220**).
- Generalize gate prompt appears after live poll without full reload.
- Compose form stays locked at wizard gates (not unlocked by `sdlc-run-finished`).
- Runner writer readiness is probed like judge/improver (`data-writer-status="runner"`).
- Wizard gate scrolls into view when it first appears.
- Wizard gate / resume / interrupt UI spacing; step lede copy; compose + guide text match the four-step wizard (bundle **168**).
- Wizard timeline shows Steps 1–4 (not classic rounds during generalize); step 2 after step 1, not step 4 (bundle **169**).
- Step 2 evaluate gate no longer appears empty when judge scoring fails: failed runs stay **failed** with an error instead of a blank gate; unscored rounds show “not scored” + notice (bundle **173**).
- Step 4 optimize gate uses the same failed-run behavior when module judge scoring fails (bundle **174**).
- Wizard step 2 **evaluate** scores prompt revisions only; folder execution stays on step 4 **optimize** with the Runner (bundle **175**).
- Wizard timeline step clicks open a modal with that step’s content (variables, evaluate rounds, splits, modules), not “Not scored yet.” (bundle **176**).
- Wizard step 4 runs **one runner+judge round per module** (statistics on the review gate); **chain** splits hand off the prior module’s best runner output to the next module (bundle **184**).
- Finished wizard runs can **download a Markdown summary** (`?cycle=&export=wizard-markdown`); History filters **All / Wizard** (legacy non-wizard rows still list under All) (bundle **203**).
