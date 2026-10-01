import { collectPromptSdlcWizardCumulativeTokens } from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { sumPromptSdlcLocalTokens } from "./sumPromptSdlcLocalTokens";

import { readPromptSdlcBudgetStop } from "../../../../adapters/promptSdlcAwcCore";
/** Spent tokens for budget checks: wizard cumulative when present, else cycle sum. */
export const readPromptSdlcCycleSpentTokens = (
  cycle: PromptSdlcLocalCycle,
): number => {
  if (cycle.wizard !== undefined) {
    const wizardTokens = collectPromptSdlcWizardCumulativeTokens(cycle.wizard);
    const cycleTokens = sumPromptSdlcLocalTokens(cycle);
    return (wizardTokens ?? 0) + cycleTokens;
  }
  return sumPromptSdlcLocalTokens(cycle);
};

/**
 * Soft-warn (persist flag) or hard-fail with errorKind budget_exceeded.
 * useThisPrompt stays false (only passed is usable).
 */
export const applyPromptSdlcBudgetGuard = (
  cycle: PromptSdlcLocalCycle,
): PromptSdlcLocalCycle => {
  const stop = readPromptSdlcBudgetStop({
    costControls: cycle.costControls,
    spentTokens: readPromptSdlcCycleSpentTokens(cycle),
  });
  if (stop === null) {
    return cycle;
  }
  if (stop.kind === "soft_warn") {
    return {
      ...cycle,
      costControls: stop.costControls,
      updatedAt: new Date().toISOString(),
    };
  }
  return {
    ...cycle,
    status: "failed",
    errorMessage: stop.errorMessage,
    errorKind: stop.errorKind,
    costControls: stop.costControls,
    judgePhase: undefined,
    updatedAt: new Date().toISOString(),
  };
};
