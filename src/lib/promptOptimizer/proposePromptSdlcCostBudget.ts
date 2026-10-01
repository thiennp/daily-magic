import {
  PROMPT_SDLC_DEFAULT_MAX_TRIALS,
  PROMPT_SDLC_DEFAULT_RATE_USD_PER_1K_TOKENS,
  PROMPT_SDLC_STEP4_TOKENS_PER_MODULE_TRIAL,
} from "@/lib/promptOptimizer/promptSdlcCostControl.constant";
import { estimatePromptSdlcSpendUsd } from "@/lib/promptOptimizer/estimatePromptSdlcSpendUsd";
import { defaultPromptSdlcCostControls } from "@/lib/promptOptimizer/createEmptyPromptSdlcCostControl";
import type {
  PromptSdlcCostControls,
  PromptSdlcCostProposal,
} from "@/lib/promptOptimizer/types/PromptSdlcCostControl.type";

/**
 * Judge-side Step 4 proposal.
 * Prefer live judge/API fields when present; else heuristic from modules × trials.
 * Product binds targetTokenBudget + estimatedSpendUsd; user must confirm.
 */
export const proposePromptSdlcCostBudget = (input: {
  readonly moduleCount: number;
  readonly maxTrials?: number;
  readonly rateUsdPer1kTokens?: number | null;
  readonly fromJudge?: Partial<PromptSdlcCostProposal> | null;
  readonly existing?: PromptSdlcCostControls | null;
}): PromptSdlcCostProposal => {
  const api = input.fromJudge;
  if (
    api !== null &&
    api !== undefined &&
    typeof api.targetTokenBudget === "number" &&
    Number.isFinite(api.targetTokenBudget) &&
    api.targetTokenBudget > 0 &&
    typeof api.estimatedSpendUsd === "number" &&
    Number.isFinite(api.estimatedSpendUsd) &&
    api.estimatedSpendUsd >= 0
  ) {
    return {
      targetTokenBudget: Math.round(api.targetTokenBudget),
      estimatedSpendUsd: api.estimatedSpendUsd,
      rateUsdPer1kTokens:
        api.rateUsdPer1kTokens ??
        input.rateUsdPer1kTokens ??
        PROMPT_SDLC_DEFAULT_RATE_USD_PER_1K_TOKENS,
      stub: false,
    };
  }

  const modules = Math.max(1, Math.floor(input.moduleCount));
  const trials = Math.max(
    1,
    Math.floor(input.maxTrials ?? PROMPT_SDLC_DEFAULT_MAX_TRIALS),
  );
  const rate =
    input.rateUsdPer1kTokens ?? PROMPT_SDLC_DEFAULT_RATE_USD_PER_1K_TOKENS;
  const targetTokenBudget =
    modules * trials * PROMPT_SDLC_STEP4_TOKENS_PER_MODULE_TRIAL;
  return {
    targetTokenBudget,
    estimatedSpendUsd: estimatePromptSdlcSpendUsd({
      tokens: targetTokenBudget,
      rateUsdPer1kTokens: rate,
    }),
    rateUsdPer1kTokens: rate,
    stub: true,
  };
};

export const applyPromptSdlcCostProposal = (
  controls: PromptSdlcCostControls,
  proposal: PromptSdlcCostProposal,
): PromptSdlcCostControls => ({
  ...controls,
  targetTokenBudget: proposal.targetTokenBudget,
  estimatedSpendUsd: proposal.estimatedSpendUsd,
  rateUsdPer1kTokens:
    proposal.rateUsdPer1kTokens ?? controls.rateUsdPer1kTokens,
  proposalStub: proposal.stub === true,
  budgetConfirmed: false,
  confirmedTokenBudget: null,
  confirmedMaxSpendUsd: null,
  softWarnFired: false,
  softWarnMessage: null,
  budgetExceeded: false,
});

export const seedPromptSdlcStep4CostProposal = (input: {
  readonly moduleCount: number;
  readonly existing?: PromptSdlcCostControls | null;
}): PromptSdlcCostControls => {
  const base = input.existing ?? defaultPromptSdlcCostControls();
  const proposal = proposePromptSdlcCostBudget({
    moduleCount: input.moduleCount,
    maxTrials: base.maxTrials,
    rateUsdPer1kTokens: base.rateUsdPer1kTokens,
    fromJudge:
      base.targetTokenBudget !== null &&
      base.estimatedSpendUsd !== null &&
      base.proposalStub === false
        ? {
            targetTokenBudget: base.targetTokenBudget,
            estimatedSpendUsd: base.estimatedSpendUsd,
            rateUsdPer1kTokens: base.rateUsdPer1kTokens,
          }
        : null,
    existing: base,
  });
  return applyPromptSdlcCostProposal(base, proposal);
};
