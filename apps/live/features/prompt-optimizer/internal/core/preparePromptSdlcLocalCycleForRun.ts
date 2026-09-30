import { autoContinuePromptSdlcWizardEvaluateGateIfNeeded } from "./autoContinuePromptSdlcWizardEvaluateGateIfNeeded";
import { autoContinuePromptSdlcWizardGeneralizeGateIfNeeded } from "./autoContinuePromptSdlcWizardGeneralizeGateIfNeeded";
import { autoContinuePromptSdlcWizardSeparateGateIfNeeded } from "./autoContinuePromptSdlcWizardSeparateGateIfNeeded";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { savePromptSdlcLocalCycle } from "./promptSdlcLocalStore";

const applySkippableWizardUnpauses = (
  cycle: PromptSdlcLocalCycle,
): PromptSdlcLocalCycle => {
  const afterGeneralize =
    autoContinuePromptSdlcWizardGeneralizeGateIfNeeded(cycle);
  const afterEvaluate =
    autoContinuePromptSdlcWizardEvaluateGateIfNeeded(afterGeneralize);
  return autoContinuePromptSdlcWizardSeparateGateIfNeeded(afterEvaluate);
};

/** Applies skippable wizard gate unpauses before live render or background advance. */
export const preparePromptSdlcLocalCycleForRun = (
  storePath: string,
  cycle: PromptSdlcLocalCycle,
): PromptSdlcLocalCycle => {
  const next = applySkippableWizardUnpauses(cycle);
  if (next !== cycle) {
    savePromptSdlcLocalCycle(storePath, next);
    return next;
  }
  return cycle;
};
