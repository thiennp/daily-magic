export type PromptSdlcWizardChainPriorNullReason =
  | "not-chain"
  | "first-module"
  | "prior-missing"
  | "prior-skipped"
  | "prior-no-output";

export default interface PromptSdlcWizardChainPriorOutput {
  readonly output: string | null;
  readonly nullReason: PromptSdlcWizardChainPriorNullReason | null;
}
