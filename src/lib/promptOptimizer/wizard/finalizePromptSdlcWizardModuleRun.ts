import { collectPromptSdlcWizardModuleStatistics } from "./collectPromptSdlcWizardModuleStatistics";
import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

export const finalizePromptSdlcWizardModuleRun = (input: {
  readonly wizard: PromptSdlcWizardState;
  readonly moduleIndex: number;
  readonly revisions: readonly {
    readonly roundNumber: number;
    readonly promptText: string;
    readonly judgement: {
      readonly score: number | null;
      readonly passed: boolean | null;
    } | null;
    readonly run?: { readonly output: string; readonly tokens: number | null };
  }[];
  readonly cycleStatus: "passed" | "stopped" | "failed";
}): PromptSdlcWizardState => {
  const statistics = collectPromptSdlcWizardModuleStatistics({
    revisions: input.revisions,
  });
  const moduleStatus =
    input.cycleStatus === "passed"
      ? ("passed" as const)
      : input.cycleStatus === "failed"
        ? ("failed" as const)
        : ("stopped" as const);

  return {
    ...input.wizard,
    modules: input.wizard.modules.map((item, index) =>
      index === input.moduleIndex
        ? {
            ...item,
            status: moduleStatus,
            selectedRevisionRound: statistics.bestRound,
            statistics,
          }
        : item,
    ),
  };
};
