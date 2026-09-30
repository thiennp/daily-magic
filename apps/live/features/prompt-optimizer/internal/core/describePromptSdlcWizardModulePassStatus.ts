import { readPromptSdlcWizardModulePassScore } from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";

export const isPromptSdlcWizardModulePassed = (
  module: PromptSdlcWizardState["modules"][number],
  modulePassScore: number,
): boolean =>
  module.status === "passed" &&
  (module.statistics?.bestScore ?? 0) >= modulePassScore;

export const describePromptSdlcWizardModulePassStatus = (
  module: PromptSdlcWizardState["modules"][number],
  modulePassScore: number,
): string => {
  if (isPromptSdlcWizardModulePassed(module, modulePassScore)) {
    return "Passed";
  }
  const score = module.statistics?.bestScore;
  if (score !== null && score !== undefined && score < modulePassScore) {
    return `Below pass (${score})`;
  }
  return module.status;
};
