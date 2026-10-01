import {
  PROMPT_SDLC_DEFAULT_MAX_TRIALS,
  PROMPT_SDLC_DEFAULT_RATE_USD_PER_1K_TOKENS,
  PROMPT_SDLC_EARLY_TOKENS_PER_ROUND,
  PROMPT_SDLC_PREVIEW_STEP4_MODULE_COUNT,
  PROMPT_SDLC_STEP4_TOKENS_PER_MODULE_TRIAL,
} from "@/lib/promptOptimizer/promptSdlcCostControl.constant";
import { estimatePromptSdlcSpendUsd } from "@/lib/promptOptimizer/estimatePromptSdlcSpendUsd";
import { defaultPromptSdlcCostControls } from "@/lib/promptOptimizer/createEmptyPromptSdlcCostControl";
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
        resolvePromptSdlcWriterRateUsdPer1k(input.writerId) ??
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
    input.rateUsdPer1kTokens ??
    resolvePromptSdlcWriterRateUsdPer1k(input.writerId);
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
        resolvePromptSdlcWriterRateUsdPer1k(input.writerId),
      stub: false,
    };
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
  // Keep a live judge proposal if already non-stub.
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
