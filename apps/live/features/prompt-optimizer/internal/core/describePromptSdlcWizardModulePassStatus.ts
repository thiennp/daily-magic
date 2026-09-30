import { PROMPT_SDLC_WIZARD_PASS_SCORE } from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";

export const isPromptSdlcWizardModulePassed = (
  module: PromptSdlcWizardState["modules"][number],
): boolean =>
  module.status === "passed" &&
  (module.statistics?.bestScore ?? 0) >= PROMPT_SDLC_WIZARD_PASS_SCORE;

export const describePromptSdlcWizardModulePassStatus = (
  module: PromptSdlcWizardState["modules"][number],
): string => {
  if (isPromptSdlcWizardModulePassed(module)) {
    return "Passed";
  }
  const score = module.statistics?.bestScore;
  if (
    score !== null &&
    score !== undefined &&
    score < PROMPT_SDLC_WIZARD_PASS_SCORE
  ) {
    return `Below pass (${score})`;
  }
  return module.status;
};
