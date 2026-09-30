import {
  PROMPT_SDLC_WIZARD_PASS_SCORE,
  summarizePromptSdlcWizardCompletion,
} from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

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
  const rows = summary.rows
    .map((row) => {
      const scoreCell =
        row.bestScore === null
          ? "—"
          : summary.terminalStatusSuggestion === "passed"
            ? `${row.bestScore} / ≥${PROMPT_SDLC_WIZARD_PASS_SCORE}`
            : String(row.bestScore);
      return `<tr><td>${escapeHtml(row.title)}</td><td>${escapeHtml(scoreCell)}</td><td>${row.tokens ?? "—"}</td><td>${escapeHtml(row.status)}</td></tr>`;
    })
    .join("");
  const headlineBlock =
    headline.length === 0 ? "" : `<p class="muted">${escapeHtml(headline)}</p>`;
  return `<div class="sdlc-wizard-outcome-module-table">${headlineBlock}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th>Best score</th><th>Tokens</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div>`;
};
