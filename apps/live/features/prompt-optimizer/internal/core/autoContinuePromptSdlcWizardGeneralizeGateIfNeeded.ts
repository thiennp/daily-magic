import { shouldSkipPromptSdlcWizardGeneralizeReview } from "../../../../adapters/promptSdlcAwcCore";

import { beginPromptSdlcWizardEvaluate } from "./advancePromptSdlcWizardLocal";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

/** Unpause Step 1 when generalize produced nothing to review (legacy paused cycles). */
export const autoContinuePromptSdlcWizardGeneralizeGateIfNeeded = (
  cycle: PromptSdlcLocalCycle,
): PromptSdlcLocalCycle => {
  const wizard = cycle.wizard;
  if (
    cycle.status !== "wizard_paused" ||
    wizard === undefined ||
    wizard.gate !== "generalize"
  ) {
    return cycle;
  }
  if (!shouldSkipPromptSdlcWizardGeneralizeReview(wizard)) {
    return cycle;
  }
  return beginPromptSdlcWizardEvaluate({
    ...cycle,
    wizard: { ...wizard, gate: null },
  });
};
