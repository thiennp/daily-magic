import { readPromptSdlcWizardModulePassScore } from "./readPromptSdlcWizardModulePassScore";
import { summarizePromptSdlcWizardCompletion } from "./summarizePromptSdlcWizardCompletion";
import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

type ModuleStatus = PromptSdlcWizardState["modules"][number]["status"];

/**
 * DF-035 (c): the report is only exported for a finished run, so a module still
 * marked running/paused/pending did not finish — say so instead of "running".
 */
const finalModuleStatus = (
  status: ModuleStatus,
  cycleStatus: string,
): string => {
  if (status === "passed" || status === "stopped" || status === "failed") {
    return status;
  }
  if (status === "pending") {
    return "not run";
  }
  return cycleStatus === "failed" ? "failed" : "stopped";
};

export const buildPromptSdlcWizardResultMarkdown = (input: {
  readonly goal: string;
  readonly cycleStatus: string;
  readonly wizard: PromptSdlcWizardState;
}): string => {
  const summary = summarizePromptSdlcWizardCompletion(input.wizard);
  const modulePassScore = readPromptSdlcWizardModulePassScore(input.wizard);
  const lines: string[] = [
    "# Prompt optimizer — wizard result",
    "",
    `Goal: ${input.goal.trim()}`,
    `Run status: ${input.cycleStatus}`,
    `Modules passed: ${summary.passedModuleCount} / ${summary.totalModules} (pass ≥ ${modulePassScore})`,
    "",
    "## Modules",
    "",
    "| Module | Best score | Tokens | Status |",
    "| --- | ---: | ---: | --- |",
    ...summary.rows.map(
      (row) =>
        `| ${row.title.replaceAll("|", "\\|")} | ${row.bestScore ?? "—"} | ${row.tokens ?? "—"} | ${finalModuleStatus(row.status, input.cycleStatus)} |`,
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
