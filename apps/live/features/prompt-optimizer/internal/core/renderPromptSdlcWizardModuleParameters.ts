import {
  buildPromptSdlcWizardSubstitutionMap,
  listPromptTemplatePlaceholders,
  readPostedWizardParameterFieldName,
} from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const renderPromptSdlcWizardModuleParameters = (input: {
  readonly cycle: PromptSdlcLocalCycle;
  readonly modulePrompt: string;
}): string => {
  const wizard = input.cycle.wizard;
  if (wizard === undefined) {
    return "";
  }
  const placeholders = listPromptTemplatePlaceholders(input.modulePrompt);
  if (placeholders.length === 0) {
    return "";
  }
  const substitution = buildPromptSdlcWizardSubstitutionMap(wizard);
  const fields = placeholders
    .map((name) => {
      const variable = wizard.variables.find((item) => item.name === name);
      const fieldName = readPostedWizardParameterFieldName(name);
      const value = substitution[name] ?? "";
      const label =
        variable === undefined
          ? `{{${name}}}`
          : `{{${name}}} — ${variable.description}`;
      const hint =
        variable === undefined
          ? `<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>`
          : `<p class="muted">Step 1 sample: ${escapeHtml(variable.sampleValue)}</p>`;
      return `<div class="field">
        <label class="field-label" for="${escapeHtml(fieldName)}">${escapeHtml(label)}</label>
        ${hint}
        <input class="input" type="text" id="${escapeHtml(fieldName)}" name="${escapeHtml(fieldName)}" value="${escapeHtml(value)}" required>
      </div>`;
    })
    .join("");
  return `<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${fields}</div>`;
};
