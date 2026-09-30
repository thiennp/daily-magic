import {
  buildPromptSdlcWizardSubstitutionMap,
  listPromptTemplatePlaceholders,
  readPostedWizardParameterFieldName,
  readPromptSdlcWizardChainPriorOutput,
} from "../../../../adapters/promptSdlcAwcCore";

import { describePromptSdlcWizardChainPriorHandoff } from "./describePromptSdlcWizardChainPriorHandoff";
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
  const moduleIndex = wizard.currentModuleIndex;
  const chainPrior = readPromptSdlcWizardChainPriorOutput(wizard, moduleIndex);
  const chainHandoff =
    moduleIndex > 0 || wizard.selectedSplitTopology === "chain"
      ? `<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module’s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${escapeHtml(describePromptSdlcWizardChainPriorHandoff(chainPrior))}</pre></div>`
      : "";
  const placeholders = listPromptTemplatePlaceholders(input.modulePrompt);
  if (placeholders.length === 0) {
    return chainHandoff.length > 0
      ? `<div class="sdlc-wizard-module-params">${chainHandoff}</div>`
      : "";
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
  return `<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${chainHandoff}${fields}</div>`;
};
