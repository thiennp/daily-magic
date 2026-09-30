import type { PromptSdlcWizardCompletionSummary } from "../../../../adapters/promptSdlcAwcCore";

export const describePromptSdlcWizardModuleTableHeadline = (
  summary: PromptSdlcWizardCompletionSummary,
  modulePassScore: number,
): string => {
  if (summary.terminalStatusSuggestion === "passed") {
    return "";
  }
  const belowCount = summary.rows.filter(
    (row) => row.bestScore !== null && row.bestScore < modulePassScore,
  ).length;
  if (
    belowCount > 0 &&
    belowCount === summary.totalModules - summary.passedModuleCount
  ) {
    return `${summary.passedModuleCount} of ${summary.totalModules} modules passed. ${belowCount} module${belowCount === 1 ? "" : "s"} scored below ${modulePassScore}.`;
  }
  return `${summary.passedModuleCount} of ${summary.totalModules} modules passed. Some modules were skipped, stopped, or below ${modulePassScore}.`;
};
