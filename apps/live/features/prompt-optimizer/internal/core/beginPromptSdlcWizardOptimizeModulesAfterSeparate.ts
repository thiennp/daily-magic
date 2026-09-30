import {
  modulesFromPromptSdlcWizardSplitOption,
  seedPromptSdlcWizardParameterValues,
  type PromptSdlcWizardSplitOption,
} from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

/** Same transition as wizard-continue from the separate gate. */
export const beginPromptSdlcWizardOptimizeModulesAfterSeparate = (
  cycle: PromptSdlcLocalCycle,
  option: PromptSdlcWizardSplitOption,
): PromptSdlcLocalCycle => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return cycle;
  }
  const modules = modulesFromPromptSdlcWizardSplitOption(option);
  return {
    ...cycle,
    status: "wizard_paused",
    errorMessage: null,
    revisions: [],
    wizard: {
      ...wizard,
      gate: "optimize_modules",
      selectedSplitOptionId: option.id,
      selectedSplitTopology: option.topology,
      modules,
      phase: "optimize_modules",
      currentModuleIndex: 0,
      parameterValues:
        Object.keys(wizard.parameterValues ?? {}).length > 0
          ? (wizard.parameterValues ?? {})
          : seedPromptSdlcWizardParameterValues(wizard.variables),
    },
    updatedAt: new Date().toISOString(),
  };
};
