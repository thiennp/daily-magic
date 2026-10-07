import {
  PROMPT_SDLC_DEFAULT_MAX_TRIALS,
  PROMPT_SDLC_DEFAULT_RATE_USD_PER_1K_TOKENS,
} from "@/lib/promptOptimizer/promptSdlcCostControl.constant";
import { resolvePromptSdlcStep4TokensPerModuleTrial } from "@/lib/promptOptimizer/resolvePromptSdlcWriterTokensPerCall";
import { estimatePromptSdlcSpendUsd } from "@/lib/promptOptimizer/estimatePromptSdlcSpendUsd";
import { defaultPromptSdlcCostControls } from "@/lib/promptOptimizer/createEmptyPromptSdlcCostControl";
import { readPromptSdlcLiveCostProposal } from "@/lib/promptOptimizer/readPromptSdlcLiveCostProposal";
import { resolvePromptSdlcWriterRateUsdPer1k } from "@/lib/promptOptimizer/resolvePromptSdlcWriterRateUsdPer1k";
import type {
  PromptSdlcCostControls,
  PromptSdlcCostProposal,
} from "@/lib/promptOptimizer/types/PromptSdlcCostControl.type";

/**
 * Judge-side / heuristic cost PREDICTION.
 * Prefer live judge/API fields when present; else heuristic.
 * Product binds targetTokenBudget + estimatedSpendUsd; user must confirm before Step4.
 */
export const proposePromptSdlcCostBudget = (input: {
  readonly moduleCount: number;
  readonly maxTrials?: number;
  readonly rateUsdPer1kTokens?: number | null;
  /** When set and rate omitted, pick a writer-aware stub rate (codex/cursor/claude). */
  readonly writerId?: string | null;
  readonly fromJudge?: Partial<PromptSdlcCostProposal> | null;
  readonly existing?: PromptSdlcCostControls | null;
}): PromptSdlcCostProposal => {
  const live = readPromptSdlcLiveCostProposal({
    fromJudge: input.fromJudge,
    rateUsdPer1kTokens: input.rateUsdPer1kTokens,
    writerId: input.writerId,
    fallbackDefaultRate: true,
  });
  if (live !== null) {
    return live;
  }

  const modules = Math.max(1, Math.floor(input.moduleCount));
  const trials = Math.max(
    1,
    Math.floor(input.maxTrials ?? PROMPT_SDLC_DEFAULT_MAX_TRIALS),
  );
  const rate =
    input.rateUsdPer1kTokens ??
    resolvePromptSdlcWriterRateUsdPer1k(input.writerId) ??
    PROMPT_SDLC_DEFAULT_RATE_USD_PER_1K_TOKENS;
  const targetTokenBudget =
    modules *
    trials *
    resolvePromptSdlcStep4TokensPerModuleTrial(input.writerId);
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
  readonly writerId?: string | null;
}): PromptSdlcCostControls => {
  const base = input.existing ?? defaultPromptSdlcCostControls();
  const proposal = proposePromptSdlcCostBudget({
    moduleCount: input.moduleCount,
    maxTrials: base.maxTrials,
    rateUsdPer1kTokens: base.rateUsdPer1kTokens,
    writerId: input.writerId,
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
