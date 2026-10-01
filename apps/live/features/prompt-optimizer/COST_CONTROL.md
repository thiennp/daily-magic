# Optimizer cost-control UI ↔ AW API

UI branch: `feat/aw-optimizer-cost-control-ui`
API on main: `#192` / `e28df08b` (`feat/aw-optimizer-cost-control-api` squash)

## DTO keys (stable)

### Proposal (judge→UI, before Step4)

| Key | Meaning |
| --- | --- |
| `targetTokenBudget` | Judge-proposed token target |
| `proposedTokenBudget` | Alias ≡ `targetTokenBudget` (snapshot + form hidden) |
| `estimatedSpendUsd` | Estimated $ for that target |
| `rateUsdPer1kTokens` | Optional; UI recomputes $ when tokens edited |

### Confirm (UI→API hard ceiling)

| Key | Meaning |
| --- | --- |
| `confirmedTokenBudget` | User-approved token hard ceiling |
| `confirmedMaxSpendUsd` | User-approved $ hard ceiling |
| `budgetConfirmed` | `true` after confirm |

Confirm via **wizard-continue** on `optimize_modules` with those fields (also agent `intent: confirm_budget`).

### Runtime knobs

`maxTrials`, `maxSpendUsd`, `earlyStop`, `earlyStopFlatRounds`

### Snapshot extras

`costControls.{…}`, `confirmationRequired`, `budgetConfirmed`, `softWarnFired`, `softWarnMessage`, `budgetExceeded`

### Outcomes

- Hard stop → `errorKind: budget_exceeded`, `status: failed`, `useThisPrompt: false`
- Flat early-stop → clean `stopped` (best kept) — **not** `budget_exceeded`

## UI surfaces wired

- Compose knobs + tips (`maxTrials` / `maxSpendUsd` / `earlyStop`)
- Pre-Step4 confirm panel (gate chrome when `!budgetConfirmed`)
- Run badge + history labels for `budget_exceeded`
- Agent snapshot fields from API `buildPromptSdlcAgentSnapshot`
