import type { PromptSdlcWizardGatePhase } from "./types/PromptSdlcWizardPhase.constant";

export const createEmptyPromptSdlcWizardAvoidByStep = (): Readonly<
  Record<PromptSdlcWizardGatePhase, readonly string[]>
> => ({
  generalize: [],
  evaluate: [],
  separate: [],
  optimize_modules: [],
});
