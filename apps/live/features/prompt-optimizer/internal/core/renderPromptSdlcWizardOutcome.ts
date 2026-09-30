import { isPromptSdlcTerminalStatus } from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { describePromptSdlcWizardOutcomeStepHint } from "./describePromptSdlcWizardOutcomeStepHint";
import { renderPromptSdlcWizardModuleTable } from "./renderPromptSdlcWizardModuleTable";
import { renderPromptSdlcWizardStepModalBody } from "./renderPromptSdlcWizardStepModalBody";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const renderPromptSdlcWizardOutcome = (
  cycle: PromptSdlcLocalCycle,
): string => {
  const wizard = cycle.wizard;
  if (wizard === undefined || !isPromptSdlcTerminalStatus(cycle.status)) {
    return "";
  }

  const moduleTable = renderPromptSdlcWizardModuleTable(cycle);

  const stepBodies = ["wizard-1", "wizard-2", "wizard-3", "wizard-4"]
    .map((stepId) => {
      let body = renderPromptSdlcWizardStepModalBody(cycle, stepId);
      if (body.trim().length === 0) {
        return "";
      }
      if (stepId === "wizard-4" && moduleTable.length > 0) {
        body = `${moduleTable}${body}`;
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
    })
    .join("");

  const outcomeActions = `<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-jump-wizard-results>Go to results</button></div>`;

  return `<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">Step details</h3>${outcomeActions}</div>${stepBodies}</div>`;
};
