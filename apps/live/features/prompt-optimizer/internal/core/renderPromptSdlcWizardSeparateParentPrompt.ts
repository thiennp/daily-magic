import { readPromptSdlcWizardEvaluatePromptText } from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const renderPromptSdlcWizardSeparateParentPrompt = (
  cycle: PromptSdlcLocalCycle,
): string => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return "";
  }
  const parentText = readPromptSdlcWizardEvaluatePromptText({
    wizard,
    revisions: cycle.revisions.map((item) => ({
      roundNumber: item.roundNumber,
      promptText: item.promptText,
      score: item.judgement?.score,
    })),
  }).trim();
  if (parentText.length === 0) {
    return "";
  }
  const orchestrator = wizard.orchestratorSkill;
  const orchestratorLine =
    orchestrator === null
      ? ""
      : `<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${escapeHtml(orchestrator.fileName)}</code> — ${escapeHtml(orchestrator.name)}. <span class="muted">This skill stays the orchestrator; the prompt below is what Step 2 selected to split.</span></p>`;
  return `<section class="sdlc-wizard-parent-prompt" aria-label="Orchestrator parent prompt">
    <h3 class="sdlc-wizard-parent-prompt-title">Orchestrator prompt (parent)</h3>
    ${orchestratorLine}
    <pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${escapeHtml(parentText)}</pre>
  </section>`;
};
