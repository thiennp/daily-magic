import type { PromptSdlcWizardModuleRun } from "./types/PromptSdlcWizardState.type";
import type { PromptSdlcWizardSplitOption } from "./types/PromptSdlcWizardSplitOption.type";

export const modulesFromPromptSdlcWizardSplitOption = (
  option: PromptSdlcWizardSplitOption,
): readonly PromptSdlcWizardModuleRun[] =>
  [...option.modules]
    .sort((left, right) => left.order - right.order)
    .map((item) => ({
      moduleId: item.id,
      title: item.title,
      prompt: item.prompt,
      status: "pending" as const,
      selectedRevisionRound: null,
      statistics: null,
    }));
