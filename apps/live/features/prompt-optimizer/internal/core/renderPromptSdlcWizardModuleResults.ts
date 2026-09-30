import { isPromptSdlcTerminalStatus } from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { renderPromptSdlcWizardModulePromptList } from "./renderPromptSdlcWizardModulePromptList";
import { renderPromptSdlcWizardModuleTable } from "./renderPromptSdlcWizardModuleTable";

/** Primary module scores + prompts when the wizard run is complete. */
export const renderPromptSdlcWizardModuleResults = (
  cycle: PromptSdlcLocalCycle,
): string => {
  const wizard = cycle.wizard;
  if (
    wizard === undefined ||
    wizard.phase !== "complete" ||
    !isPromptSdlcTerminalStatus(cycle.status) ||
    wizard.modules.length === 0
  ) {
    return "";
  }
  const table = renderPromptSdlcWizardModuleTable(cycle);
  const prompts = renderPromptSdlcWizardModulePromptList(cycle);
  if (table.length === 0 && prompts.length === 0) {
    return "";
  }
  return `<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><h3 class="sdlc-run-panel-title">Module results</h3><button type="button" class="btn btn-secondary" data-sdlc-copy-wizard-modules>Copy all prompts</button></div>${table}${prompts}</section>`;
};
