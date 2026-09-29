import type PromptSdlcWizardProgressView from "@/lib/promptSdlc/types/PromptSdlcWizardProgressView.type";

export const buildPromptSdlcWizardStepIndex = (
  wizard: PromptSdlcWizardProgressView,
): number => {
  if (wizard.gate !== null) {
    if (wizard.gate === "generalize") {
      return 0;
    }
    if (wizard.gate === "evaluate") {
      return 1;
    }
    if (wizard.gate === "separate") {
      return 2;
    }
    return 3;
  }
  if (wizard.phase === "generalize") {
    return 0;
  }
  if (wizard.phase === "evaluate") {
    return 1;
  }
  if (wizard.phase === "separate") {
    return 2;
  }
  if (wizard.phase === "optimize_modules") {
    return 3;
  }
  return 4;
};
