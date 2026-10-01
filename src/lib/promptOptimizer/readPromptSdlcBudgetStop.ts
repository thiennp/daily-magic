import {
  PROMPT_SDLC_BUDGET_SOFT_WARN_RATIO,
  PROMPT_SDLC_SOFT_WARN_BUDGET,
  PROMPT_SDLC_STOP_BUDGET_EXCEEDED,
} from "@/lib/promptOptimizer/promptSdlcCostControl.constant";
import { estimatePromptSdlcSpendUsd } from "@/lib/promptOptimizer/estimatePromptSdlcSpendUsd";
import type { PromptSdlcCostControls } from "@/lib/promptOptimizer/types/PromptSdlcCostControl.type";

export type PromptSdlcBudgetStop =
  | {
      readonly kind: "hard_stop";
      readonly errorMessage: string;
      readonly errorKind: "budget_exceeded";
      readonly costControls: PromptSdlcCostControls;
    }
  | {
      readonly kind: "soft_warn";
      readonly softWarnMessage: string;
      readonly costControls: PromptSdlcCostControls;
    }
  | null;

/**
 * Soft warn then hard stop against confirmed ceilings.
 * Hard stop → cycle/module failed with errorKind budget_exceeded (not billable;
 * useThisPrompt stays false — only passed is usable).
 */
export const readPromptSdlcBudgetStop = (input: {
  readonly costControls: PromptSdlcCostControls | null | undefined;
  readonly spentTokens: number;
}): PromptSdlcBudgetStop => {
  const controls = input.costControls;
  if (
    controls === null ||
    controls === undefined ||
    !controls.budgetConfirmed
  ) {
    return null;
  }

  const rate = controls.rateUsdPer1kTokens ?? 0;
  const spentUsd = estimatePromptSdlcSpendUsd({
    tokens: input.spentTokens,
    rateUsdPer1kTokens: rate,
  });
  const tokenCeiling = controls.confirmedTokenBudget;
  const spendCeiling = controls.confirmedMaxSpendUsd;
  const overTokens =
    tokenCeiling !== null &&
    tokenCeiling > 0 &&
    input.spentTokens >= tokenCeiling;
  const overSpend =
    spendCeiling !== null &&
    spendCeiling > 0 &&
    spentUsd >= spendCeiling;

  if (overTokens || overSpend) {
    return {
      kind: "hard_stop",
      errorMessage: PROMPT_SDLC_STOP_BUDGET_EXCEEDED,
      errorKind: "budget_exceeded",
      costControls: {
        ...controls,
        softWarnFired: true,
        softWarnMessage: PROMPT_SDLC_STOP_BUDGET_EXCEEDED,
        budgetExceeded: true,
      },
    };
  }

  const ratio = PROMPT_SDLC_BUDGET_SOFT_WARN_RATIO;
  const nearTokens =
    tokenCeiling !== null &&
    tokenCeiling > 0 &&
    input.spentTokens >= tokenCeiling * ratio;
  const nearSpend =
    spendCeiling !== null &&
    spendCeiling > 0 &&
    spentUsd >= spendCeiling * ratio;
  if ((nearTokens || nearSpend) && !controls.softWarnFired) {
    return {
      kind: "soft_warn",
      softWarnMessage: PROMPT_SDLC_SOFT_WARN_BUDGET,
      costControls: {
        ...controls,
        softWarnFired: true,
        softWarnMessage: PROMPT_SDLC_SOFT_WARN_BUDGET,
      },
    };
  }

  return null;
};

export const isPromptSdlcCostBudgetConfirmed = (
  costControls: PromptSdlcCostControls | null | undefined,
): boolean =>
  costControls?.budgetConfirmed === true &&
  costControls.confirmedTokenBudget !== null;
