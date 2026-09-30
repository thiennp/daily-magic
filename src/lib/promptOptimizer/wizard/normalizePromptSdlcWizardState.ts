import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

/** Backfill fields missing from older `prompt-optimizer-cycles.json` wizard blobs. */
export const normalizePromptSdlcWizardState = (
  wizard: PromptSdlcWizardState,
): PromptSdlcWizardState => ({
  ...wizard,
  parameterValues: wizard.parameterValues ?? {},
  pendingStepInstructions: wizard.pendingStepInstructions ?? "",
  selectedSplitTopology: wizard.selectedSplitTopology ?? null,
  modules: wizard.modules.map((module) => ({
    ...module,
    statistics: module.statistics ?? null,
  })),
});
