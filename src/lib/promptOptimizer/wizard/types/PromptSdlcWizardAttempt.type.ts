import type { PromptSdlcWizardGatePhase } from "./PromptSdlcWizardPhase.constant";

export default interface PromptSdlcWizardAttempt {
  readonly id: string;
  readonly step: PromptSdlcWizardGatePhase;
  readonly attemptNumber: number;
  readonly userFeedback: string | null;
  readonly stepInstructions: string | null;
  readonly createdAt: string;
  /** JSON-serializable step output snapshot. */
  readonly output: unknown;
}
