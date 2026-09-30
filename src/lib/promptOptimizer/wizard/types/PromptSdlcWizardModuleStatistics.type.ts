export interface PromptSdlcWizardModuleRoundStatistics {
  readonly roundNumber: number;
  readonly score: number | null;
  readonly passed: boolean | null;
  readonly runOutput: string | null;
  readonly tokens: number | null;
}

export default interface PromptSdlcWizardModuleStatistics {
  readonly bestScore: number | null;
  readonly bestRound: number | null;
  readonly bestRunOutput: string | null;
  readonly rounds: readonly PromptSdlcWizardModuleRoundStatistics[];
}
