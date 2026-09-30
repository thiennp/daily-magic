export type PromptSdlcWizardPipelineStepState = "pending" | "active" | "done";

export interface PromptSdlcWizardPipelineStep {
  readonly id: string;
  readonly label: string;
  readonly state: PromptSdlcWizardPipelineStepState;
  readonly infoTitle: string;
  readonly infoBodyHtml: string;
}
