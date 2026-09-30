import { PROMPT_SDLC_WIZARD_PASS_SCORE } from "./promptSdlcWizardLimits.constant";
import { summarizePromptSdlcWizardCompletion } from "./summarizePromptSdlcWizardCompletion";
import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

export const buildPromptSdlcWizardResultMarkdown = (input: {
  readonly goal: string;
  readonly cycleStatus: string;
  readonly wizard: PromptSdlcWizardState;
}): string => {
  const summary = summarizePromptSdlcWizardCompletion(input.wizard);
  const lines: string[] = [
    "# Prompt optimizer — wizard result",
    "",
    `Goal: ${input.goal.trim()}`,
    `Run status: ${input.cycleStatus}`,
    `Modules passed: ${summary.passedModuleCount} / ${summary.totalModules} (pass ≥ ${PROMPT_SDLC_WIZARD_PASS_SCORE})`,
    "",
    "## Modules",
    "",
    "| Module | Best score | Tokens | Status |",
    "| --- | ---: | ---: | --- |",
    ...summary.rows.map(
      (row) =>
        `| ${row.title.replaceAll("|", "\\|")} | ${row.bestScore ?? "—"} | ${row.tokens ?? "—"} | ${row.status} |`,
    ),
  ];

  if (input.wizard.templatedPrompt.trim().length > 0) {
    lines.push(
      "",
      "## Generalized template",
      "",
      "```",
      input.wizard.templatedPrompt.trim(),
      "```",
    );
  }

  input.wizard.modules.forEach((module, index) => {
    const output = module.statistics?.bestRunOutput?.trim();
    if (output === undefined || output.length === 0) {
      return;
    }
    lines.push(
      "",
      `## Module ${index + 1}: ${module.title}`,
      "",
      "```",
      output,
      "```",
    );
  });

  return `${lines.join("\n")}\n`;
};
