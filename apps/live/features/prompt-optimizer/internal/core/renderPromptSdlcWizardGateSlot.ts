import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { renderPromptSdlcWizardGate } from "./renderPromptSdlcWizardGate";
import { renderPromptSdlcWizardStepInProgress } from "./renderPromptSdlcWizardStepInProgress";
import { renderPromptSdlcWizardChosenModulesSummary } from "./renderPromptSdlcWizardSplitChunks";

/** Live poll replaces this slot when a wizard step finishes at a gate. */
export const renderPromptSdlcWizardGateSlot = (
  cycle: PromptSdlcLocalCycle | null,
): string => {
  if (cycle === null) {
    return `<div id="prompt-optimizer-wizard-gate-slot"></div>`;
  }
  const inProgress = renderPromptSdlcWizardStepInProgress(cycle);
  const gate = renderPromptSdlcWizardGate(cycle);
  const separatedSummary = renderPromptSdlcWizardChosenModulesSummary(cycle);
  return `<div id="prompt-optimizer-wizard-gate-slot">${inProgress}${gate}${separatedSummary}</div>`;
};
