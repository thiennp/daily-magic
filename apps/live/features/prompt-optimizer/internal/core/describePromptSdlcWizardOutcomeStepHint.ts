import {
  PROMPT_SDLC_WIZARD_PASS_SCORE,
  summarizePromptSdlcWizardCompletion,
} from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { formatPromptSdlcTokenCount } from "./sumPromptSdlcLocalTokens";

export const describePromptSdlcWizardOutcomeStepHint = (
  cycle: PromptSdlcLocalCycle,
  stepId: string,
): string => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return "No wizard data";
  }
  if (stepId === "wizard-1") {
    const variableCount = wizard.variables.length;
    if (wizard.templatedPrompt.trim().length > 0) {
      return variableCount > 0
        ? `Templated prompt · ${variableCount} variable${variableCount === 1 ? "" : "s"}`
        : "Templated prompt ready";
    }
    return variableCount > 0
      ? `${variableCount} variable${variableCount === 1 ? "" : "s"} captured`
      : "Generalize finished";
  }
  if (stepId === "wizard-2") {
    const scored = cycle.revisions.filter(
      (revision) =>
        revision.judgement !== null && revision.judgement !== undefined,
    ).length;
    if (scored > 0) {
      const best = cycle.revisions.reduce<number | null>((max, revision) => {
        const score = revision.judgement?.score ?? null;
        if (score === null) {
          return max;
        }
        return max === null ? score : Math.max(max, score);
      }, null);
      return best === null
        ? `${scored} scored revision${scored === 1 ? "" : "s"}`
        : `Best score ${best} · ${scored} revision${scored === 1 ? "" : "s"}`;
    }
    return wizard.phase === "complete" || wizard.gate === null
      ? "Evaluate finished"
      : "Evaluate not run yet";
  }
  if (stepId === "wizard-3") {
    const moduleCount =
      wizard.modules.length > 0
        ? wizard.modules.length
        : wizard.splitOptions.length;
    if (moduleCount > 0) {
      return `${moduleCount} module${moduleCount === 1 ? "" : "s"} defined`;
    }
    return wizard.phase === "complete"
      ? "Separate finished"
      : "Separate not run yet";
  }
  if (stepId === "wizard-4") {
    if (wizard.modules.length === 0) {
      return "No module trials yet";
    }
    const summary = summarizePromptSdlcWizardCompletion(wizard);
    if (
      summary.terminalStatusSuggestion === "passed" &&
      summary.passedModuleCount === summary.totalModules
    ) {
      const lowest = summary.rows.reduce<number | null>((min, row) => {
        if (row.bestScore === null) {
          return min;
        }
        return min === null ? row.bestScore : Math.min(min, row.bestScore);
      }, null);
      const totalTokens = summary.rows.reduce(
        (sum, row) => sum + (row.tokens ?? 0),
        0,
      );
      if (lowest === null) {
        return `${formatPromptSdlcTokenCount(totalTokens)} tokens total`;
      }
      return `Lowest score ${lowest} · ${formatPromptSdlcTokenCount(totalTokens)} tokens total`;
    }
    return `${summary.passedModuleCount}/${summary.totalModules} passed · ≥ ${PROMPT_SDLC_WIZARD_PASS_SCORE}`;
  }
  return "";
};
