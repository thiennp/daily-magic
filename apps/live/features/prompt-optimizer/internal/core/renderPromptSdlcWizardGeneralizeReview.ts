import {
  readPromptSdlcWizardTemplatedOrConcrete,
  type PromptSdlcWizardState,
} from "../../../../adapters/promptSdlcAwcCore";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const PROMPT_SDLC_WIZARD_GENERALIZE_PENDING_COPY =
  "Generalize has not produced template variables yet — your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.";

export const renderPromptSdlcWizardGeneralizeReview = (
  wizard: PromptSdlcWizardState,
): string => {
  if (wizard.variables.length === 0) {
    return `<p class="muted sdlc-wizard-generalize-empty">${escapeHtml(PROMPT_SDLC_WIZARD_GENERALIZE_PENDING_COPY)}</p>`;
  }
  const vars = `<ul class="sdlc-wizard-vars">${wizard.variables
    .map(
      (item) =>
        `<li><strong>{{${escapeHtml(item.name)}}}</strong> — ${escapeHtml(item.description)} (sample: ${escapeHtml(item.sampleValue)})</li>`,
    )
    .join("")}</ul>`;
  const template = wizard.templatedPrompt.trim();
  const templateBlock =
    template.length === 0
      ? `<p class="muted">No templated prompt text was saved.</p>`
      : `<h2>Templated prompt</h2><pre class="sdlc-pre">${escapeHtml(template)}</pre>`;
  const concrete = readPromptSdlcWizardTemplatedOrConcrete(wizard).trim();
  const sampleBlock =
    concrete.length === 0 || concrete === template
      ? ""
      : `<h2>Sample with variables filled</h2><pre class="sdlc-pre">${escapeHtml(concrete)}</pre>`;
  return `${vars}${templateBlock}${sampleBlock}`;
};

/** Active Step 1 gate: variables list + templated pre (no extra headings). */
export const renderPromptSdlcWizardGeneralizeGateFields = (
  wizard: PromptSdlcWizardState,
): string => {
  if (wizard.variables.length === 0) {
    return `<p class="muted sdlc-wizard-generalize-empty">${escapeHtml(PROMPT_SDLC_WIZARD_GENERALIZE_PENDING_COPY)}</p>`;
  }
  const vars = `<ul class="sdlc-wizard-vars">${wizard.variables
    .map(
      (item) =>
        `<li><strong>{{${escapeHtml(item.name)}}}</strong> — ${escapeHtml(item.description)} (sample: ${escapeHtml(item.sampleValue)})</li>`,
    )
    .join("")}</ul>`;
  const template = wizard.templatedPrompt.trim();
  const pre =
    template.length === 0
      ? ""
      : `<pre class="sdlc-pre">${escapeHtml(template)}</pre>`;
  return `${vars}${pre}`;
};
