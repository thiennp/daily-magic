import { readPromptSdlcWizardModulePassScore } from "./readPromptSdlcWizardModulePassScore";
import { summarizePromptSdlcWizardCompletion } from "./summarizePromptSdlcWizardCompletion";
import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

/** Plain-text wizard run summary for the judge skill-suggestion pass. */
export const buildPromptSdlcWizardSkillSuggestionsSummaryText = (input: {
  readonly goal: string;
  readonly cycleStatus: string;
  readonly wizard: PromptSdlcWizardState;
}): string => {
  const summary = summarizePromptSdlcWizardCompletion(input.wizard);
  const modulePassScore = readPromptSdlcWizardModulePassScore(input.wizard);
  const lines = [
    `Goal: ${input.goal.trim()}`,
    `Run status: ${input.cycleStatus}`,
    `Modules passed: ${summary.passedModuleCount} / ${summary.totalModules} (pass ≥ ${modulePassScore})`,
    "",
    "Module results:",
    ...summary.rows.map(
      (row) =>
        `- ${row.title}: best score ${row.bestScore ?? "—"}, status ${row.status}`,
    ),
  ];
  if (input.wizard.templatedPrompt.trim().length > 0) {
    lines.push(
      "",
      "Generalized template:",
      input.wizard.templatedPrompt.trim(),
    );
  }
  const evaluateAttempt = input.wizard.attempts.find(
    (item) => item.step === "evaluate",
  );
  if (evaluateAttempt !== undefined) {
    lines.push(
      "",
      "Step 2 evaluate snapshot:",
      JSON.stringify(evaluateAttempt.output),
    );
  }
  return lines.join("\n");
};
