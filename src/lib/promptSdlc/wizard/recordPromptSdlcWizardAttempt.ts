import type PromptSdlcWizardAttempt from "./types/PromptSdlcWizardAttempt.type";
import type { PromptSdlcWizardGatePhase } from "./types/PromptSdlcWizardPhase.constant";
import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

export const recordPromptSdlcWizardAttempt = (input: {
  readonly wizard: PromptSdlcWizardState;
  readonly step: PromptSdlcWizardGatePhase;
  readonly output: unknown;
  readonly userFeedback: string | null;
  readonly stepInstructions: string | null;
}): PromptSdlcWizardState => {
  const prior = input.wizard.attempts.filter(
    (item) => item.step === input.step,
  );
  const attempt: PromptSdlcWizardAttempt = {
    id: crypto.randomUUID(),
    step: input.step,
    attemptNumber: prior.length + 1,
    userFeedback: input.userFeedback,
    stepInstructions: input.stepInstructions,
    createdAt: new Date().toISOString(),
    output: input.output,
  };
  return {
    ...input.wizard,
    attempts: [...input.wizard.attempts, attempt],
  };
};
