# Optimizer scoring, timeout, and billing

**Status:** [SHIPPED policy] + evolving bundles  
**Slug:** `optimizer-scoring-billing`  
**Audience:** leads who care about cost and honesty

## Evaluate

Score, threshold, `passed` boolean, judge reasons.

## Policy (say this every time)

- **Billable-success = `passed` only**
- **`useThisPrompt` only on `passed`** — never on timeout, interrupt, or no_reply
- Distinct failed **errorKinds:** `timeout`, `interrupt`, `no_reply`
- **SIGKILL escalate** on stuck writers
- Judge / heuristic **`recommendTimeoutMs`** (judge-set budgets)

## Bundle notes (high level)

| Bundle        | Note                                                |
| ------------- | --------------------------------------------------- |
| **241**       | ~600s module timeout lane                           |
| **242** T1–T3 | Fail clarity, SIGKILL, judge-set timeout — approved |
| **T4**        | timeout→improver — **parked**                       |

## What we will not claim

Finer billing meters than “passed = billable-success,” or that Step 4 always finishes when writers stall.

One sentence: _You pay for passed evaluate success; `useThisPrompt` only on `passed`; timeout / interrupt / no_reply fail cleanly (SIGKILL on stuck writers)._

## Cost controls (API `feat/aw-optimizer-cost-control-api`)

- Before Step 4: judge proposal exposes **`targetTokenBudget`** + **`estimatedSpendUsd`** (+ optional `rateUsdPer1kTokens`).
- User must confirm → **`confirmedTokenBudget`** / **`confirmedMaxSpendUsd`** hard ceilings (`budgetConfirmed`).
- Soft warn near ceiling; hard stop → `errorKind: budget_exceeded`, status `failed`, **`useThisPrompt` false** (only `passed` billable/usable).
- Knobs: `maxTrials`, `maxSpendUsd`, `earlyStop` / `earlyStopFlatRounds`.
- Flat-score early-stop remains a clean **`stopped`** (best prompt kept); not `budget_exceeded`.
