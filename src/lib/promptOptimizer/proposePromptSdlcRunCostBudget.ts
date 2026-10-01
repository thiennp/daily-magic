import {
  PROMPT_SDLC_DEFAULT_MAX_TRIALS,
  PROMPT_SDLC_EARLY_TOKENS_PER_ROUND,
  PROMPT_SDLC_PREVIEW_STEP4_MODULE_COUNT,
  PROMPT_SDLC_STEP4_TOKENS_PER_MODULE_TRIAL,
} from "@/lib/promptOptimizer/promptSdlcCostControl.constant";
import { estimatePromptSdlcSpendUsd } from "@/lib/promptOptimizer/estimatePromptSdlcSpendUsd";
import { defaultPromptSdlcCostControls } from "@/lib/promptOptimizer/createEmptyPromptSdlcCostControl";
import { applyPromptSdlcCostProposal } from "@/lib/promptOptimizer/proposePromptSdlcCostBudget";
import { readPromptSdlcLiveCostProposal } from "@/lib/promptOptimizer/readPromptSdlcLiveCostProposal";
import { resolvePromptSdlcWriterRateUsdPer1k } from "@/lib/promptOptimizer/resolvePromptSdlcWriterRateUsdPer1k";
import type {
  PromptSdlcCostControls,
  PromptSdlcCostProposal,
} from "@/lib/promptOptimizer/types/PromptSdlcCostControl.type";

/**
 * Full-run PREDICTION before any wizard spend (compose / agent start).
 * earlyRounds × early tokens + preview Step4 modules × trials.
 * Step4 gate later re-seeds with the real module count via seedPromptSdlcStep4CostProposal.
 */
export const proposePromptSdlcRunCostBudget = (input: {
  readonly maxRounds?: number;
  readonly maxTrials?: number;
  readonly previewModuleCount?: number;
  readonly rateUsdPer1kTokens?: number | null;
  readonly writerId?: string | null;
  readonly fromJudge?: Partial<PromptSdlcCostProposal> | null;
}): PromptSdlcCostProposal => {
  const live = readPromptSdlcLiveCostProposal({
    fromJudge: input.fromJudge,
    rateUsdPer1kTokens: input.rateUsdPer1kTokens,
    writerId: input.writerId,
  });
  if (live !== null) {
    return live;
  }

  const earlyRounds = Math.max(1, Math.floor(input.maxRounds ?? 3));
  const trials = Math.max(
    1,
    Math.floor(input.maxTrials ?? PROMPT_SDLC_DEFAULT_MAX_TRIALS),
  );
  const previewModules = Math.max(
    1,
    Math.floor(
      input.previewModuleCount ?? PROMPT_SDLC_PREVIEW_STEP4_MODULE_COUNT,
    ),
  );
  const rate =
    input.rateUsdPer1kTokens ??
    resolvePromptSdlcWriterRateUsdPer1k(input.writerId);
  const earlyTokens = earlyRounds * PROMPT_SDLC_EARLY_TOKENS_PER_ROUND;
  const step4Tokens =
    previewModules * trials * PROMPT_SDLC_STEP4_TOKENS_PER_MODULE_TRIAL;
  const targetTokenBudget = earlyTokens + step4Tokens;
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

/**
 * Seed cost PREDICTION at run start (UI compose Run / agent POST).
 * Populates targetTokenBudget + estimatedSpendUsd before any LLM spend.
 * Does not confirm; Step4 gate still requires confirmPromptSdlcCostBudget.
 */
export const seedPromptSdlcRunCostProposal = (input: {
  readonly existing?: PromptSdlcCostControls | null;
  readonly maxRounds?: number;
  readonly writerId?: string | null;
}): PromptSdlcCostControls => {
  const base = input.existing ?? defaultPromptSdlcCostControls();
  if (
    base.proposalStub === false &&
    base.targetTokenBudget !== null &&
    base.estimatedSpendUsd !== null
  ) {
    return base;
  }
  const proposal = proposePromptSdlcRunCostBudget({
    maxRounds: input.maxRounds,
    maxTrials: base.maxTrials,
    rateUsdPer1kTokens: base.rateUsdPer1kTokens,
    writerId: input.writerId,
  });
  return applyPromptSdlcCostProposal(base, proposal);
};
