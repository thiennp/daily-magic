export const PROMPT_SDLC_WIZARD_PHASES = [
  "generalize",
  "evaluate",
  "separate",
  "optimize_modules",
  "complete",
] as const;

export type PromptSdlcWizardPhase = (typeof PROMPT_SDLC_WIZARD_PHASES)[number];

export const PROMPT_SDLC_WIZARD_GATE_PHASES = [
  "generalize",
  "evaluate",
  "separate",
  "optimize_modules",
] as const satisfies readonly PromptSdlcWizardPhase[];

export type PromptSdlcWizardGatePhase =
  (typeof PROMPT_SDLC_WIZARD_GATE_PHASES)[number];
