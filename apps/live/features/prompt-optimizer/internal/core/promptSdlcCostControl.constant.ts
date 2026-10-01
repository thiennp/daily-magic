/**
 * Optimizer cost-control UI copy.
 * Contract: src/lib/promptOptimizer (API on main via #192).
 * Proposal: targetTokenBudget (+ alias proposedTokenBudget), estimatedSpendUsd, rateUsdPer1kTokens?
 * Confirm POST: confirmedTokenBudget, confirmedMaxSpendUsd → budgetConfirmed
 * Knobs: maxTrials, maxSpendUsd, earlyStop, earlyStopFlatRounds
 * Hard stop: errorKind budget_exceeded; flat early-stop = clean stopped
 */

export {
  PROMPT_SDLC_DEFAULT_MAX_TRIALS,
  PROMPT_SDLC_MAX_TRIALS_LIMIT,
  PROMPT_SDLC_BUDGET_SOFT_WARN_RATIO,
  PROMPT_SDLC_BUDGET_CONFIRM_REQUIRED,
  PROMPT_SDLC_SOFT_WARN_BUDGET,
  PROMPT_SDLC_STOP_BUDGET_EXCEEDED,
  PROMPT_SDLC_STEP4_TOKENS_PER_MODULE_TRIAL,
} from "../../../../adapters/promptSdlcAwcCore";

export const PROMPT_SDLC_COST_COPY = {
  knobsSectionTitle: "Cost controls",
  knobsSectionLede:
    "Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",
  maxTrialsLabel: "Max trials",
  maxSpendUsdLabel: "Max spend (USD)",
  earlyStopLabel: "Early-stop when scores flat",
  earlyStopHint:
    "Stop when judged scores stop rising. That is a clean stopped outcome — not budget_exceeded.",
  confirmTitle: "Confirm Step 4 cost ceiling",
  confirmLede:
    "Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",
  proposedTokenLabel: "Proposed token budget (targetTokenBudget)",
  estimatedSpendLabel: "Estimated spend (USD)",
  confirmedTokenLabel: "Confirmed token budget",
  confirmedSpendLabel: "Confirmed max spend (USD)",
  rateLabel: "Rate (USD / 1k tokens)",
  stubProposalNote:
    "Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",
  approveLabel: "Approve and start Step 4",
  confirmEditLabel: "Confirm edited ceiling",
  softWarnLabel: "Approaching budget",
  budgetExceededBadge: "Budget exceeded",
  budgetExceededFailedLabel: "Failed · budget exceeded",
  budgetExceededMessage:
    "Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false.",
} as const;
