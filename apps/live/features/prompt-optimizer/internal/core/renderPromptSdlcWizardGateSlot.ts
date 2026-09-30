import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { renderPromptSdlcWizardAccordion } from "./renderPromptSdlcWizardAccordion";
import { renderPromptSdlcWizardChosenModulesSummary } from "./renderPromptSdlcWizardSplitChunks";
import { isPromptSdlcTerminalStatus } from "../../../../adapters/promptSdlcAwcCore";

/** Live poll replaces this slot when a wizard step finishes at a gate. */
export const renderPromptSdlcWizardGateSlot = (
  cycle: PromptSdlcLocalCycle | null,
): string => {
  if (cycle === null) {
    return `<div id="prompt-optimizer-wizard-gate-slot"></div>`;
  }
  if (cycle.wizard !== undefined && isPromptSdlcTerminalStatus(cycle.status)) {
    return `<div id="prompt-optimizer-wizard-gate-slot"></div>`;
  }
  const accordion = renderPromptSdlcWizardAccordion(cycle);
  const separatedSummary = renderPromptSdlcWizardChosenModulesSummary(cycle);
  return `<div id="prompt-optimizer-wizard-gate-slot">${accordion}${separatedSummary}</div>`;
};
