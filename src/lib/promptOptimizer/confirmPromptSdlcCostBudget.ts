import { estimatePromptSdlcSpendUsd } from "@/lib/promptOptimizer/estimatePromptSdlcSpendUsd";
import { PROMPT_SDLC_DEFAULT_RATE_USD_PER_1K_TOKENS } from "@/lib/promptOptimizer/promptSdlcCostControl.constant";
import { defaultPromptSdlcCostControls } from "@/lib/promptOptimizer/createEmptyPromptSdlcCostControl";
import type { PromptSdlcCostControls } from "@/lib/promptOptimizer/types/PromptSdlcCostControl.type";

export type ConfirmPromptSdlcCostBudgetResult =
  | { readonly ok: true; readonly costControls: PromptSdlcCostControls }
  | { readonly ok: false; readonly errorMessage: string };

/** Apply user-edited confirmed ceilings; required before Step 4 module runs. */
export const confirmPromptSdlcCostBudget = (input: {
  readonly existing?: PromptSdlcCostControls | null;
  readonly confirmedTokenBudget: number;
  readonly confirmedMaxSpendUsd?: number | null;
  readonly rateUsdPer1kTokens?: number | null;
}): ConfirmPromptSdlcCostBudgetResult => {
  const tokens = Number(input.confirmedTokenBudget);
  if (!Number.isFinite(tokens) || tokens < 1 || !Number.isInteger(tokens)) {
    return {
      ok: false,
      errorMessage: "confirmedTokenBudget must be a whole number ≥ 1.",
    };
  }

  const base = input.existing ?? defaultPromptSdlcCostControls();
  const rate =
    input.rateUsdPer1kTokens ??
    base.rateUsdPer1kTokens ??
    PROMPT_SDLC_DEFAULT_RATE_USD_PER_1K_TOKENS;

  let maxSpend = input.confirmedMaxSpendUsd;
  if (maxSpend === undefined || maxSpend === null) {
    maxSpend = estimatePromptSdlcSpendUsd({
      tokens,
      rateUsdPer1kTokens: rate,
    });
  }
  if (!Number.isFinite(maxSpend) || maxSpend < 0) {
    return {
      ok: false,
      errorMessage: "confirmedMaxSpendUsd must be zero or a positive number.",
    };
  }

  return {
    ok: true,
    costControls: {
      ...base,
      targetTokenBudget: base.targetTokenBudget ?? tokens,
      estimatedSpendUsd: base.estimatedSpendUsd ?? maxSpend,
      rateUsdPer1kTokens: rate,
      confirmedTokenBudget: tokens,
      confirmedMaxSpendUsd: Math.round(maxSpend * 10_000) / 10_000,
      budgetConfirmed: true,
      softWarnFired: false,
      softWarnMessage: null,
      budgetExceeded: false,
    },
  };
};
