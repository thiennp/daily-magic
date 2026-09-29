import { PROMPT_SDLC_WIZARD_MAX_FEEDBACK_ITEMS } from "./promptSdlcWizardLimits.constant";
import type { PromptSdlcWizardGatePhase } from "./types/PromptSdlcWizardPhase.constant";
import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

export const appendPromptSdlcWizardFeedback = (
  wizard: PromptSdlcWizardState,
  step: PromptSdlcWizardGatePhase,
  feedback: string,
): PromptSdlcWizardState => {
  const trimmed = feedback.trim();
  if (trimmed.length === 0) {
    return wizard;
  }
  const prior = wizard.avoidByStep[step] ?? [];
  const next = [trimmed, ...prior].slice(
    0,
    PROMPT_SDLC_WIZARD_MAX_FEEDBACK_ITEMS,
  );
  return {
    ...wizard,
    avoidByStep: {
      ...wizard.avoidByStep,
      [step]: next,
    },
    gate: null,
  };
};
