import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const renderPromptSdlcWizardModulePromptList = (
  cycle: PromptSdlcLocalCycle,
): string => {
  const wizard = cycle.wizard;
  if (wizard === undefined || wizard.modules.length === 0) {
    return "";
  }
  const items = wizard.modules
    .map((item) => {
      return `<li class="sdlc-wizard-module-prompt"><strong>${escapeHtml(item.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${escapeHtml(item.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one" data-sdlc-copy-module-prompt>Copy</button></div></li>`;
    })
    .join("");
  return `<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${items}</ul>`;
};
