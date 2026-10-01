import {
  readPromptSdlcWizardEvaluatePromptText,
  type PromptSdlcWizardSplitOption,
} from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { renderPromptSdlcWizardSplitOptionChunks } from "./renderPromptSdlcWizardSplitChunks";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const readParentHandoff = (cycle: PromptSdlcLocalCycle): string => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return "";
  }
  return readPromptSdlcWizardEvaluatePromptText({
    wizard,
    revisions: cycle.revisions.map((item) => ({
      roundNumber: item.roundNumber,
      promptText: item.promptText,
      score: item.judgement?.score,
    })),
  }).trim();
};

export const renderPromptSdlcWizardSplitOptionDetail = (
  cycle: PromptSdlcLocalCycle,
  option: PromptSdlcWizardSplitOption,
): string => {
  const orchestration =
    option.topology === "chain"
      ? "Chain orchestration: modules run in order; each module’s runner can read the previous module’s output when building context."
      : "Parallel orchestration: modules are independent; runners do not see other modules’ output (faster, but wording may overlap).";
  const parentText = readParentHandoff(cycle);
  const wizard = cycle.wizard;
  const orchestratorLine =
    wizard?.orchestratorSkill === null ||
    wizard?.orchestratorSkill === undefined
      ? ""
      : `<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${escapeHtml(wizard.orchestratorSkill.fileName)}</code> — ${escapeHtml(wizard.orchestratorSkill.name)}.</p>`;
  const parentBlock =
    parentText.length === 0
      ? ""
      : `<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${orchestratorLine}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${escapeHtml(parentText)}</pre></details>`;
  const moduleCount = option.modules.length;
  const modulesHeading =
    moduleCount === 0
      ? ""
      : `<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${moduleCount})</h4>`;
  const chunks = renderPromptSdlcWizardSplitOptionChunks(option);
  return `<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${escapeHtml(orchestration)} <span class="muted">${escapeHtml(option.summary)}</span></p>
    ${parentBlock}
    ${modulesHeading}
    ${chunks}
  </div>`;
};
