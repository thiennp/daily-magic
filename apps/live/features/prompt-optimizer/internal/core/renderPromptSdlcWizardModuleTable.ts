import {
  readPromptSdlcWizardModulePassScore,
  summarizePromptSdlcWizardCompletion,
} from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { describePromptSdlcWizardModulePassStatus } from "./describePromptSdlcWizardModulePassStatus";
import { isPromptSdlcWizardModulePassed } from "./describePromptSdlcWizardModulePassStatus";
import { describePromptSdlcWizardModuleTableHeadline } from "./describePromptSdlcWizardModuleTableHeadline";

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
  const modulePassScore = readPromptSdlcWizardModulePassScore(wizard);
  const headline =
    summary.terminalStatusSuggestion === "passed"
      ? ""
      : describePromptSdlcWizardModuleTableHeadline(summary, modulePassScore);
  const nearPassFloor = modulePassScore - 10;
  const rows = summary.rows
    .map((row, index) => {
      const wizardModule = wizard.modules[index];
      const scoreCell =
        row.bestScore === null ? "—" : `${row.bestScore} / ≥${modulePassScore}`;
      const nearPass =
        row.bestScore !== null &&
        row.bestScore >= nearPassFloor &&
        row.bestScore < modulePassScore;
      const rowClass = nearPass ? ' class="sdlc-score-near-pass"' : "";
      const statusLabel =
        wizardModule === undefined
          ? row.status
          : describePromptSdlcWizardModulePassStatus(
              wizardModule,
              modulePassScore,
            );
      const statusCell =
        wizardModule !== undefined &&
        isPromptSdlcWizardModulePassed(wizardModule, modulePassScore)
          ? `<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>`
          : statusLabel === "Failed"
            ? `<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>`
            : statusLabel === "Stopped"
              ? `<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>`
              : escapeHtml(statusLabel);
      return `<tr${rowClass}><td>${escapeHtml(row.title)}</td><td>${escapeHtml(scoreCell)}</td><td>${row.tokens ?? "—"}</td><td>${statusCell}</td></tr>`;
    })
    .join("");
  const headlineBlock =
    headline.length === 0 ? "" : `<p class="muted">${escapeHtml(headline)}</p>`;
  return `<div class="sdlc-wizard-outcome-module-table">${headlineBlock}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div>`;
};
