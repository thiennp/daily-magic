import {
  PROMPT_SDLC_WIZARD_PASS_SCORE,
  summarizePromptSdlcWizardCompletion,
} from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { describePromptSdlcWizardModulePassStatus } from "./describePromptSdlcWizardModulePassStatus";
import { isPromptSdlcWizardModulePassed } from "./describePromptSdlcWizardModulePassStatus";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

/** Score table for wizard step 4 / outcome (no duplicate page-level heading). */
export const renderPromptSdlcWizardModuleTable = (
  cycle: PromptSdlcLocalCycle,
): string => {
  const wizard = cycle.wizard;
  if (wizard === undefined || wizard.modules.length === 0) {
    return "";
  }
  const summary = summarizePromptSdlcWizardCompletion(wizard);
  const headline =
    summary.terminalStatusSuggestion === "passed"
      ? ""
      : `${summary.passedModuleCount} of ${summary.totalModules} modules passed. Some modules were skipped, stopped, or below ${PROMPT_SDLC_WIZARD_PASS_SCORE}.`;
  const nearPassFloor = PROMPT_SDLC_WIZARD_PASS_SCORE - 10;
  const rows = summary.rows
    .map((row, index) => {
      const wizardModule = wizard.modules[index];
      const scoreCell =
        row.bestScore === null
          ? "—"
          : `${row.bestScore} / ≥${PROMPT_SDLC_WIZARD_PASS_SCORE}`;
      const nearPass =
        row.bestScore !== null &&
        row.bestScore >= nearPassFloor &&
        row.bestScore < PROMPT_SDLC_WIZARD_PASS_SCORE;
      const rowClass = nearPass ? ' class="sdlc-score-near-pass"' : "";
      const statusLabel =
        wizardModule === undefined
          ? row.status
          : describePromptSdlcWizardModulePassStatus(wizardModule);
      const statusCell =
        wizardModule !== undefined &&
        isPromptSdlcWizardModulePassed(wizardModule)
          ? `<span aria-label="Passed">✓</span>`
          : escapeHtml(statusLabel);
      return `<tr${rowClass}><td>${escapeHtml(row.title)}</td><td>${escapeHtml(scoreCell)}</td><td>${row.tokens ?? "—"}</td><td>${statusCell}</td></tr>`;
    })
    .join("");
  const headlineBlock =
    headline.length === 0 ? "" : `<p class="muted">${escapeHtml(headline)}</p>`;
  return `<div class="sdlc-wizard-outcome-module-table">${headlineBlock}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div>`;
};
