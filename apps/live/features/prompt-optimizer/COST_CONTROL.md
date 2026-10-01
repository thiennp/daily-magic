# Optimizer cost-control UI ↔ AW API

UI branch: `feat/aw-optimizer-cost-control-ui`
API on main: `#192` / `e28df08b` (`feat/aw-optimizer-cost-control-api` squash)
Prediction eng: `feat/aw-optimizer-cost-prediction` (this doc)

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
| **Compose Run / agent start** | `seedPromptSdlcRunCostProposal` | Preview only (`budgetConfirmed` false). Covers early wizard rounds + preview Step4 modules. |
| **Agent dry-run** | POST `intent: estimate_budget` | No cycle; returns proposal DTO. |
| **Enter Step4** (`optimize_modules` after Separate) | `seedPromptSdlcStep4CostProposal` | Resets confirm; UI confirm panel until user approves. |
| **Confirm** | `confirmPromptSdlcCostBudget` / agent `confirm_budget` | Hard ceilings active; budget guard applies. |

Rates: `resolvePromptSdlcWriterRateUsdPer1k` (claude-cli / codex / cursor / cursor-cloud / antigravity). Writer-agnostic control flow.

## UI surfaces wired

- Compose knobs + tips (`maxTrials` / `maxSpendUsd` / `earlyStop`)
- Pre-Step4 confirm panel (gate chrome when `!budgetConfirmed`)
- Run badge + history labels for `budget_exceeded`
- Agent snapshot fields from API `buildPromptSdlcAgentSnapshot`

## Product stubs / asks (prediction)

1. **Compose pre-Run estimate** — show `estimatedSpendUsd` / `targetTokenBudget` live as knobs/writer change (call `proposePromptSdlcRunCostBudget` client-side or hit agent `estimate_budget`). Hook: recompute beside Cost controls; bind `data-sdlc-estimated-spend`.
2. **Writer rate chip** — display resolved `rateUsdPer1kTokens` next to judge/improver.
3. **Optional auto-confirm when `maxSpendUsd` filled** — Product decision; eng already accepts start-body `confirmedTokenBudget` / `confirmedMaxSpendUsd` for agents.

## Agent API

- `POST /prompt-optimizer/agent` start body may include `maxTrials`, `maxSpendUsd`, `earlyStop`, `earlyStopFlatRounds`, `rateUsdPer1kTokens`, `confirmedTokenBudget`, `confirmedMaxSpendUsd`.
- `POST` `{ "intent": "estimate_budget", "judge"|"writerId", "maxTrials", "maxRounds"? }` → prediction without starting.
- `POST ?cycle=` `{ "intent": "confirm_budget", "confirmedTokenBudget", … }` → confirm ceilings.
