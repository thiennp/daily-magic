import { isPromptSdlcTerminalStatus } from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { renderPromptSdlcWizardModulePromptList } from "./renderPromptSdlcWizardModulePromptList";
import { renderPromptSdlcWizardModuleTable } from "./renderPromptSdlcWizardModuleTable";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

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
  const sourceText = (cycle.revisions[0]?.promptText ?? "").trim();
  const sourceCompare =
    sourceText.length === 0
      ? ""
      : `<details class="sdlc-wizard-source-compare"><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${escapeHtml(sourceText)}</pre></details>`;
  return `<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts · copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${sourceCompare}${table}${prompts}</section>`;
};
