export interface PromptSdlcWizardModuleDraft {
  readonly id: string;
  readonly title: string;
  readonly prompt: string;
  readonly order: number;
}

export interface PromptSdlcWizardSplitOption {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly topology: "chain" | "parallel";
  readonly modules: readonly PromptSdlcWizardModuleDraft[];
  readonly recommended: boolean;
}
