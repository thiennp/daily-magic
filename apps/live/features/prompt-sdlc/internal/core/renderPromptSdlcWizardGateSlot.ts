import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { renderPromptSdlcWizardGate } from "./renderPromptSdlcWizardGate";
import { renderPromptSdlcWizardChosenModulesSummary } from "./renderPromptSdlcWizardSplitChunks";

/** Live poll replaces this slot when a wizard step finishes at a gate. */
export const renderPromptSdlcWizardGateSlot = (
  cycle: PromptSdlcLocalCycle | null,
): string => {
  if (cycle === null) {
    return `<div id="prompt-sdlc-wizard-gate-slot"></div>`;
  }
  const gate = renderPromptSdlcWizardGate(cycle);
  const separatedSummary = renderPromptSdlcWizardChosenModulesSummary(cycle);
  return `<div id="prompt-sdlc-wizard-gate-slot">${gate}${separatedSummary}</div>`;
};
