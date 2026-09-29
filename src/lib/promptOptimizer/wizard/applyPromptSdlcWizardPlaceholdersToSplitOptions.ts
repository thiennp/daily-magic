import { restorePromptSdlcWizardPlaceholdersInText } from "./restorePromptSdlcWizardPlaceholdersInText";
import type { PromptSdlcWizardSplitOption } from "./types/PromptSdlcWizardSplitOption.type";
import type PromptSdlcWizardVariable from "./types/PromptSdlcWizardVariable.type";

export const applyPromptSdlcWizardPlaceholdersToSplitOptions = (
  options: readonly PromptSdlcWizardSplitOption[],
  variables: readonly PromptSdlcWizardVariable[],
): readonly PromptSdlcWizardSplitOption[] =>
  options.map((option) => ({
    ...option,
    modules: option.modules.map((module) => ({
      ...module,
      prompt: restorePromptSdlcWizardPlaceholdersInText(
        module.prompt,
        variables,
      ),
    })),
  }));
