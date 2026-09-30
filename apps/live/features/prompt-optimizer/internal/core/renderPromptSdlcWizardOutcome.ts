import { isPromptSdlcTerminalStatus } from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { describePromptSdlcWizardOutcomeStepHint } from "./describePromptSdlcWizardOutcomeStepHint";
import { renderPromptSdlcWizardStepModalBody } from "./renderPromptSdlcWizardStepModalBody";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const renderOutcomeStep = (
  cycle: PromptSdlcLocalCycle,
  stepId: string,
  wizard: NonNullable<PromptSdlcLocalCycle["wizard"]>,
): string => {
  const body = renderPromptSdlcWizardStepModalBody(cycle, stepId);
  if (body.trim().length === 0) {
    return "";
  }
  const title =
    stepId === "wizard-1"
      ? "Step 1 — Generalize"
      : stepId === "wizard-2"
        ? "Step 2 — Evaluate"
        : stepId === "wizard-3"
          ? "Step 3 — Separate"
          : "Step 4 — Optimize modules";
  const hint = describePromptSdlcWizardOutcomeStepHint(cycle, stepId);
  const summaryLine = `${escapeHtml(title)} <span class="muted sdlc-wizard-outcome-step-hint">${escapeHtml(hint)}</span>`;
  const openStep4 =
    stepId === "wizard-4" && wizard.phase === "complete" ? " open" : "";
  const stepAnchor = `prompt-optimizer-wizard-outcome-${stepId}`;
  return `<details class="sdlc-wizard-outcome-step" id="${stepAnchor}"${openStep4}><summary aria-controls="${stepAnchor}-body">${summaryLine}</summary><div class="sdlc-wizard-outcome-step-body" id="${stepAnchor}-body">${body}</div></details>`;
};

export const renderPromptSdlcWizardOutcome = (
  cycle: PromptSdlcLocalCycle,
): string => {
  const wizard = cycle.wizard;
  if (wizard === undefined || !isPromptSdlcTerminalStatus(cycle.status)) {
    return "";
  }

  const wizardComplete = wizard.phase === "complete";
  const stepIds = wizardComplete
    ? (["wizard-1", "wizard-2", "wizard-3"] as const)
    : (["wizard-1", "wizard-2", "wizard-3", "wizard-4"] as const);

  const stepBodies = stepIds
    .map((stepId) => renderOutcomeStep(cycle, stepId, wizard))
    .join("");

  const outcomeActions = wizardComplete
    ? `<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>`
    : `<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>`;

  const processBlock = wizardComplete
    ? `<div class="sdlc-wizard-process-details-body">${stepBodies}</div>`
    : stepBodies;

  const panelTitle = wizardComplete
    ? "Pipeline · steps 1–3 (Step 4 in Module results)"
    : "Step details";

  const step4Note = wizardComplete
    ? `<p class="muted sdlc-wizard-outcome-step4-note">Step 4 — Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>`
    : "";

  return `<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${panelTitle}</h3>${outcomeActions}</div>${step4Note}${processBlock}</div>`;
};
