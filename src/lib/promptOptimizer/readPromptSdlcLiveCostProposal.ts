import { PROMPT_SDLC_DEFAULT_RATE_USD_PER_1K_TOKENS } from "@/lib/promptOptimizer/promptSdlcCostControl.constant";
import { resolvePromptSdlcWriterRateUsdPer1k } from "@/lib/promptOptimizer/resolvePromptSdlcWriterRateUsdPer1k";
import type { PromptSdlcCostProposal } from "@/lib/promptOptimizer/types/PromptSdlcCostControl.type";

/** Prefer a live judge/API proposal when both budget fields are valid. */
export const readPromptSdlcLiveCostProposal = (input: {
  readonly fromJudge?: Partial<PromptSdlcCostProposal> | null;
  readonly rateUsdPer1kTokens?: number | null;
  readonly writerId?: string | null;
  readonly fallbackDefaultRate?: boolean;
}): PromptSdlcCostProposal | null => {
  const api = input.fromJudge;
  if (
    api === null ||
    api === undefined ||
    typeof api.targetTokenBudget !== "number" ||
    !Number.isFinite(api.targetTokenBudget) ||
    api.targetTokenBudget <= 0 ||
    typeof api.estimatedSpendUsd !== "number" ||
    !Number.isFinite(api.estimatedSpendUsd) ||
    api.estimatedSpendUsd < 0
  ) {
    return null;
  }

  const writerRate = resolvePromptSdlcWriterRateUsdPer1k(input.writerId);
  const rate =
    api.rateUsdPer1kTokens ??
    input.rateUsdPer1kTokens ??
    writerRate ??
    (input.fallbackDefaultRate === true
      ? PROMPT_SDLC_DEFAULT_RATE_USD_PER_1K_TOKENS
      : writerRate);

  return {
    targetTokenBudget: Math.round(api.targetTokenBudget),
    estimatedSpendUsd: api.estimatedSpendUsd,
    rateUsdPer1kTokens: rate,
    stub: false,
  };
};
