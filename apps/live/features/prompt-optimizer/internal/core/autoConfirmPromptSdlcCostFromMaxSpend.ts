import {
  confirmPromptSdlcCostBudget,
  type PromptSdlcCostControls,
} from "../../../../adapters/promptSdlcAwcCore";

/**
 * Product call (cost PREDICTION UI): when the user filled maxSpendUsd (or an
 * equivalent ceiling), auto-confirm hard ceilings from that spend cap + the
 * current targetTokenBudget. No explicit confirm panel. If estimate >
 * maxSpendUsd, callers still warn in chrome — confirm proceeds anyway.
 *
 * Agents already POST confirmed* and skip the panel the same way.
 * When maxSpendUsd is unset, leave budgetConfirmed false so the Step4
 * explicit confirm panel still shows.
 */
export const autoConfirmPromptSdlcCostFromMaxSpend = (
  controls: PromptSdlcCostControls,
): PromptSdlcCostControls => {
  if (controls.budgetConfirmed === true) {
    return controls;
  }
  if (controls.maxSpendUsd === null || controls.maxSpendUsd === undefined) {
    return controls;
  }
  const tokens = controls.targetTokenBudget;
  if (
    tokens === null ||
    tokens === undefined ||
    !Number.isFinite(tokens) ||
    tokens < 1
  ) {
    return controls;
  }
  const confirmed = confirmPromptSdlcCostBudget({
    existing: controls,
    confirmedTokenBudget: Math.round(tokens),
    confirmedMaxSpendUsd: controls.maxSpendUsd,
    rateUsdPer1kTokens: controls.rateUsdPer1kTokens,
  });
  return confirmed.ok ? confirmed.costControls : controls;
};

/** True when estimate exceeds the filled maxSpendUsd ceiling (warn-only). */
export const isPromptSdlcEstimateOverMaxSpend = (
  controls: Pick<
    PromptSdlcCostControls,
    "estimatedSpendUsd" | "maxSpendUsd"
  >,
): boolean => {
  const estimate = controls.estimatedSpendUsd;
  const ceiling = controls.maxSpendUsd;
  if (
    estimate === null ||
    estimate === undefined ||
    ceiling === null ||
    ceiling === undefined
  ) {
    return false;
  }
  return estimate > ceiling;
};
