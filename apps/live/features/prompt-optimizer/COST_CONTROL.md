# Optimizer cost-control UI ↔ AW API

UI branch: `feat/aw-optimizer-cost-prediction-ui`
API / eng prediction: `feat/aw-optimizer-cost-prediction` @ `63a9670f`
Prior Step4 knobs API on main: `#192` / `e28df08b`

## DTO keys (stable)

### Proposal (heuristic/judge→UI, cost PREDICTION)

| Key                   | Meaning                                              |
| --------------------- | ---------------------------------------------------- |
| `targetTokenBudget`   | Proposed token target                                |
| `proposedTokenBudget` | Alias ≡ `targetTokenBudget` (snapshot + form hidden) |
| `estimatedSpendUsd`   | Estimated $ for that target                          |
| `rateUsdPer1kTokens`  | Optional; UI recomputes $ when tokens edited         |
| `proposalStub`        | `true` when heuristic (not live judge)               |

### Confirm (UI→API hard ceiling)

| Key                    | Meaning                          |
| ---------------------- | -------------------------------- |
| `confirmedTokenBudget` | User-approved token hard ceiling |
| `confirmedMaxSpendUsd` | User-approved $ hard ceiling     |
| `budgetConfirmed`      | `true` after confirm             |

Confirm via **wizard-continue** on `optimize_modules` with those fields (also agent `intent: confirm_budget`, or start-body `confirmedTokenBudget`).

### Runtime knobs

`maxTrials`, `maxSpendUsd`, `earlyStop`, `earlyStopFlatRounds`

### Snapshot extras

`costControls.{…}`, `confirmationRequired`, `budgetConfirmed`, `softWarnFired`, `softWarnMessage`, `budgetExceeded`

### Outcomes

- Hard stop → `errorKind: budget_exceeded`, `status: failed`, `useThisPrompt: false`
- Flat early-stop → clean `stopped` (best kept) — **not** `budget_exceeded`

## When PREDICTION runs

| Moment | Function | Gate / confirm? |
| ------ | -------- | --------------- |
| **Compose Run / agent start** | `seedPromptSdlcRunCostProposal` | Preview only unless auto-confirm (below). Covers early wizard rounds + preview Step4 modules. |
| **Agent dry-run** | POST `intent: estimate_budget` | No cycle; returns proposal DTO. |
| **Enter Step4** (`optimize_modules` after Separate) | `seedPromptSdlcStep4CostProposal` | Resets confirm; then Product auto-confirm or UI panel. |
| **Confirm** | `confirmPromptSdlcCostBudget` / agent `confirm_budget` | Hard ceilings active; budget guard applies. |

Rates: `resolvePromptSdlcWriterRateUsdPer1k` (claude-cli / codex / cursor / cursor-cloud / antigravity). Writer-agnostic control flow.

## Product call — compose PREDICTION + confirm (this branch)

**Preferred (Lead / AW Product, 2026-10-01):**

1. **Always show live estimate** on compose before Run: `estimatedSpendUsd` + `targetTokenBudget`, bound to `data-sdlc-estimated-spend` (and `data-sdlc-target-tokens`). Recompute client-side beside Cost controls as knobs/writer change; mirrors eng `proposePromptSdlcRunCostBudget` / agent `intent: estimate_budget`.
2. **Optional writer rate chip** — display resolved `rateUsdPer1kTokens` (`data-sdlc-writer-rate-chip`) next to the estimate (codex / claude-cli / cursor rates from `resolvePromptSdlcWriterRateUsdPer1k`).
3. **Auto-confirm when `maxSpendUsd` (ceiling) is filled** — do **not** require an explicit confirm panel as the default when a ceiling is set:
   - Compose Run and Step4 entry call `autoConfirmPromptSdlcCostFromMaxSpend`: `confirmedMaxSpendUsd = maxSpendUsd`, `confirmedTokenBudget = targetTokenBudget`.
   - If **estimate > maxSpendUsd**, still **auto-confirm** from the ceiling; show a **warn** only (`data-sdlc-estimate-over-ceiling`). Hard stop may fire earlier under the budget guard.
   - If **maxSpendUsd is unset**, keep the **explicit Step4 confirm panel** (edit/approve), same spirit as pre-Step4 budget confirm.
   - **Agents:** no panel when they POST `confirmed*` (eng already accepts start-body confirm).

## UI surfaces wired

- Compose knobs + tips (`maxTrials` / `maxSpendUsd` / `earlyStop`)
- Compose live estimate + rate chip (`data-sdlc-estimated-spend`, `data-sdlc-writer-rate-chip`)
- Auto-confirm from `maxSpendUsd` on compose start + Step4 entry
- Pre-Step4 confirm panel when ceiling unset (`!budgetConfirmed`)
- Run badge + history labels for `budget_exceeded`
- Agent snapshot fields from API `buildPromptSdlcAgentSnapshot`

## Agent API

- `POST /prompt-optimizer/agent` start body may include `maxTrials`, `maxSpendUsd`, `earlyStop`, `earlyStopFlatRounds`, `rateUsdPer1kTokens`, `confirmedTokenBudget`, `confirmedMaxSpendUsd`.
- `POST` `{ "intent": "estimate_budget", "judge"|"writerId", "maxTrials", "maxRounds"? }` → prediction without starting.
- `POST ?cycle=` `{ "intent": "confirm_budget", "confirmedTokenBudget", … }` → confirm ceilings.

## Install bundle

AWL ships compose chrome inside the install bundle. This branch bumps `AGENT_WITCH_INSTALL_BUNDLE_VERSION` and rebuilds `public/install/agent-witch/app/agent-witch.js` so Macs pick up the estimate / rate chip / auto-confirm chrome.
