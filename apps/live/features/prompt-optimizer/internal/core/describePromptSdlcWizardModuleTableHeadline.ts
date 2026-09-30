import {
  PROMPT_SDLC_WIZARD_PASS_SCORE,
  type PromptSdlcWizardCompletionSummary,
} from "../../../../adapters/promptSdlcAwcCore";

export const describePromptSdlcWizardModuleTableHeadline = (
  summary: PromptSdlcWizardCompletionSummary,
): string => {
  if (summary.terminalStatusSuggestion === "passed") {
    return "";
  }
  const belowCount = summary.rows.filter(
    (row) =>
      row.bestScore !== null && row.bestScore < PROMPT_SDLC_WIZARD_PASS_SCORE,
  ).length;
  if (
    belowCount > 0 &&
    belowCount === summary.totalModules - summary.passedModuleCount
  ) {
    return `${summary.passedModuleCount} of ${summary.totalModules} modules passed. ${belowCount} module${belowCount === 1 ? "" : "s"} scored below ${PROMPT_SDLC_WIZARD_PASS_SCORE}.`;
  }
  return `${summary.passedModuleCount} of ${summary.totalModules} modules passed. Some modules were skipped, stopped, or below ${PROMPT_SDLC_WIZARD_PASS_SCORE}.`;
};
