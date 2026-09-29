import type { PromptSdlcWizardSplitOption } from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const renderModuleList = (
  modules: readonly { readonly title: string; readonly prompt: string }[],
): string => {
  if (modules.length === 0) {
    return "";
  }
  return `<ol class="sdlc-wizard-chunks">${modules
    .map(
      (item) =>
        `<li class="sdlc-wizard-chunk"><strong>${escapeHtml(item.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${escapeHtml(item.prompt)}</pre></li>`,
    )
    .join("")}</ol>`;
};

export const renderPromptSdlcWizardSplitOptionChunks = (
  option: PromptSdlcWizardSplitOption,
): string =>
  renderModuleList(
    [...option.modules]
      .sort((left, right) => left.order - right.order)
      .map((item) => ({ title: item.title, prompt: item.prompt })),
  );

/** Read-only module list after the user picked a split (step 4 and in-flight optimize). */
export const renderPromptSdlcWizardChosenModulesSummary = (
  cycle: PromptSdlcLocalCycle,
): string => {
  const wizard = cycle.wizard;
  if (wizard === undefined || wizard.modules.length === 0) {
    return "";
  }
  if (
    wizard.phase !== "optimize_modules" &&
    wizard.gate !== "optimize_modules"
  ) {
    return "";
  }
  const splitTitle =
    wizard.selectedSplitOptionId === null
      ? null
      : wizard.splitOptions.find(
          (item) => item.id === wizard.selectedSplitOptionId,
        )?.title;
  const heading =
    splitTitle === null || splitTitle === undefined
      ? "Separated modules"
      : `Separated modules (${escapeHtml(splitTitle)})`;
  return `<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 — Separate</p>
    <h2>${heading}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${renderModuleList(
      wizard.modules.map((item) => ({
        title: item.title,
        prompt: item.prompt,
      })),
    )}
  </section>`;
};
