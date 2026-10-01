import {
  PROMPT_SDLC_DEFAULT_MAX_TRIALS,
  PROMPT_SDLC_DEFAULT_RATE_USD_PER_1K_TOKENS,
} from "@/lib/promptOptimizer/promptSdlcCostControl.constant";
import type {
  PromptSdlcCostControlKnobs,
  PromptSdlcCostControls,
} from "@/lib/promptOptimizer/types/PromptSdlcCostControl.type";

export const defaultPromptSdlcCostControls = (
  input?: Partial<PromptSdlcCostControlKnobs>,
): PromptSdlcCostControls => ({
  maxTrials: input?.maxTrials ?? PROMPT_SDLC_DEFAULT_MAX_TRIALS,
  maxSpendUsd: input?.maxSpendUsd ?? null,
  earlyStop: input?.earlyStop ?? true,
  earlyStopFlatRounds: input?.earlyStopFlatRounds ?? 3,
  targetTokenBudget: null,
  estimatedSpendUsd: null,
  rateUsdPer1kTokens: PROMPT_SDLC_DEFAULT_RATE_USD_PER_1K_TOKENS,
  proposalStub: true,
  confirmedTokenBudget: null,
  confirmedMaxSpendUsd: null,
  budgetConfirmed: false,
  softWarnFired: false,
  softWarnMessage: null,
  budgetExceeded: false,
});

/** @deprecated Prefer defaultPromptSdlcCostControls. */
export const createEmptyPromptSdlcCostControl = defaultPromptSdlcCostControls;
