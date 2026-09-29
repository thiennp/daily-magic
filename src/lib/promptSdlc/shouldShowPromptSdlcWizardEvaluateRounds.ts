import type PromptSdlcWizardProgressView from "@/lib/promptSdlc/types/PromptSdlcWizardProgressView.type";

export const shouldShowPromptSdlcWizardEvaluateRounds = (
  wizard: PromptSdlcWizardProgressView,
): boolean =>
  wizard.phase === "evaluate" ||
  wizard.gate === "evaluate" ||
  wizard.phase === "optimize_modules" ||
  wizard.gate === "optimize_modules";
