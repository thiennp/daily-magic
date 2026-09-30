import { readPromptSdlcWizardModulePassScore } from "./readPromptSdlcWizardModulePassScore";
import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

export type PromptSdlcWizardCompletionModuleRow = {
  readonly moduleId: string;
  readonly title: string;
  readonly bestScore: number | null;
  readonly tokens: number | null;
  readonly status: PromptSdlcWizardState["modules"][number]["status"];
};

export type PromptSdlcWizardCompletionSummary = {
  readonly passedModuleCount: number;
  readonly totalModules: number;
  readonly terminalStatusSuggestion: "passed" | "stopped";
  readonly rows: readonly PromptSdlcWizardCompletionModuleRow[];
};

const sumRoundTokens = (
  wizard: PromptSdlcWizardState,
  moduleIndex: number,
): number | null => {
  const statistics = wizard.modules[moduleIndex]?.statistics;
  if (statistics === null || statistics === undefined) {
    return null;
  }
  const total = statistics.rounds.reduce(
    (sum, round) => sum + (round.tokens ?? 0),
    0,
  );
  return total > 0 ? total : null;
};

const modulePassed = (
  module: PromptSdlcWizardState["modules"][number],
  modulePassScore: number,
): boolean =>
  module.status === "passed" &&
  (module.statistics?.bestScore ?? 0) >= modulePassScore;

export const summarizePromptSdlcWizardCompletion = (
  wizard: PromptSdlcWizardState,
): PromptSdlcWizardCompletionSummary => {
  const modulePassScore = readPromptSdlcWizardModulePassScore(wizard);
  const rows = wizard.modules.map((module, index) => ({
    moduleId: module.moduleId,
    title: module.title,
    bestScore: module.statistics?.bestScore ?? null,
    tokens: sumRoundTokens(wizard, index),
    status: module.status,
  }));
  const totalModules = rows.length;
  const passedModuleCount = rows.filter((_, index) =>
    modulePassed(wizard.modules[index], modulePassScore),
  ).length;
  const terminalStatusSuggestion =
    totalModules > 0 && passedModuleCount === totalModules
      ? ("passed" as const)
      : ("stopped" as const);
  return {
    passedModuleCount,
    totalModules,
    terminalStatusSuggestion,
    rows,
  };
};
