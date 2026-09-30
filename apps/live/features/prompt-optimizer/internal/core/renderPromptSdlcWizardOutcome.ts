import {
  isPromptSdlcTerminalStatus,
  PROMPT_SDLC_WIZARD_PASS_SCORE,
  summarizePromptSdlcWizardCompletion,
} from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { renderPromptSdlcWizardStepModalBody } from "./renderPromptSdlcWizardStepModalBody";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const renderModuleTable = (cycle: PromptSdlcLocalCycle): string => {
  const wizard = cycle.wizard;
  if (wizard === undefined || wizard.modules.length === 0) {
    return "";
  }
  const summary = summarizePromptSdlcWizardCompletion(wizard);
  const headline =
    summary.terminalStatusSuggestion === "passed"
      ? `${summary.passedModuleCount} of ${summary.totalModules} modules passed (score ≥ ${PROMPT_SDLC_WIZARD_PASS_SCORE}).`
      : `${summary.passedModuleCount} of ${summary.totalModules} modules passed. Some modules were skipped, stopped, or below ${PROMPT_SDLC_WIZARD_PASS_SCORE}.`;
  const rows = summary.rows
    .map(
      (row) =>
        `<tr><td>${escapeHtml(row.title)}</td><td>${row.bestScore ?? "—"}</td><td>${row.tokens ?? "—"}</td><td>${escapeHtml(row.status)}</td></tr>`,
    )
    .join("");
  return `<h3>Modules</h3><p class="muted">${escapeHtml(headline)}</p><table class="sdlc-wizard-outcome-table"><thead><tr><th>Module</th><th>Best score</th><th>Tokens</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>`;
};

export const renderPromptSdlcWizardOutcome = (
  cycle: PromptSdlcLocalCycle,
): string => {
  const wizard = cycle.wizard;
  if (wizard === undefined || !isPromptSdlcTerminalStatus(cycle.status)) {
    return "";
  }

  const modules = renderModuleTable(cycle);

  const stepBodies = ["wizard-1", "wizard-2", "wizard-3", "wizard-4"]
    .map((stepId) => {
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
      return `<details class="sdlc-wizard-outcome-step"><summary>${escapeHtml(title)}</summary><div class="sdlc-wizard-outcome-step-body">${body}</div></details>`;
    })
    .join("");

  const download = `<p class="actions"><a class="btn btn-secondary" href="/prompt-optimizer?cycle=${escapeHtml(cycle.id)}&amp;export=wizard-markdown">Download report (.md)</a></p>`;

  return `<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><h3 class="sdlc-run-panel-title">Wizard result</h3><p class="muted sdlc-wizard-outcome-lede">Pass score for modules is ${PROMPT_SDLC_WIZARD_PASS_SCORE}. Token counts come from writer usage on this Mac.</p>${download}${modules}${stepBodies}</div>`;
};
