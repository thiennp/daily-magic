import { PROMPT_SDLC_WIZARD_MODULE_PASS_SCORE } from "./promptSdlcWizardLimits.constant";
import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

export const readPromptSdlcWizardModulePassScore = (
  wizard: Pick<PromptSdlcWizardState, "modulePassScore"> | undefined,
): number => {
  const score = wizard?.modulePassScore;
  if (typeof score === "number" && score >= 1 && score <= 100) {
    return score;
  }
  return PROMPT_SDLC_WIZARD_MODULE_PASS_SCORE;
};
