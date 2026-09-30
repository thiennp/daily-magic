import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { renderPromptSdlcWizardAccordion } from "./renderPromptSdlcWizardAccordion";
import { renderPromptSdlcWizardChosenModulesSummary } from "./renderPromptSdlcWizardSplitChunks";

/** Live poll replaces this slot when a wizard step finishes at a gate. */
export const renderPromptSdlcWizardGateSlot = (
  cycle: PromptSdlcLocalCycle | null,
): string => {
  if (cycle === null) {
    return `<div id="prompt-optimizer-wizard-gate-slot"></div>`;
  }
  const accordion = renderPromptSdlcWizardAccordion(cycle);
  const separatedSummary = renderPromptSdlcWizardChosenModulesSummary(cycle);
  return `<div id="prompt-optimizer-wizard-gate-slot">${accordion}${separatedSummary}</div>`;
};
