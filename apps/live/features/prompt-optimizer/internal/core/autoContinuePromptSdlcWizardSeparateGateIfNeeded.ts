import { shouldSkipPromptSdlcWizardSeparateReview } from "../../../../adapters/promptSdlcAwcCore";

import { beginPromptSdlcWizardOptimizeModulesAfterSeparate } from "./beginPromptSdlcWizardOptimizeModulesAfterSeparate";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

/** Unpause Step 3 when separate produced a single module (nothing to pick). */
export const autoContinuePromptSdlcWizardSeparateGateIfNeeded = (
  cycle: PromptSdlcLocalCycle,
): PromptSdlcLocalCycle => {
  const wizard = cycle.wizard;
  if (
    cycle.status !== "wizard_paused" ||
    wizard === undefined ||
    wizard.gate !== "separate"
  ) {
    return cycle;
  }
  if (!shouldSkipPromptSdlcWizardSeparateReview(wizard.splitOptions)) {
    return cycle;
  }
  const option = wizard.splitOptions[0];
  return beginPromptSdlcWizardOptimizeModulesAfterSeparate(cycle, option);
};
