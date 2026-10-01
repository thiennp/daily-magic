import { shouldSkipPromptSdlcWizardEvaluateReview } from "../../../../adapters/promptSdlcAwcCore";

import { beginPromptSdlcWizardSeparateAfterEvaluate } from "./beginPromptSdlcWizardSeparateAfterEvaluate";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

/** Unpause Step 2 when the best revision already passed the quality gate. */
export const autoContinuePromptSdlcWizardEvaluateGateIfNeeded = (
  cycle: PromptSdlcLocalCycle,
): PromptSdlcLocalCycle => {
  const wizard = cycle.wizard;
  if (
    cycle.status !== "wizard_paused" ||
    wizard === undefined ||
    wizard.gate !== "evaluate"
  ) {
    return cycle;
  }
  if (
    !shouldSkipPromptSdlcWizardEvaluateReview({
      revisions: cycle.revisions,
      wizard,
      passScore: cycle.passScore,
    })
  ) {
    return cycle;
  }
  return beginPromptSdlcWizardSeparateAfterEvaluate(cycle);
};
