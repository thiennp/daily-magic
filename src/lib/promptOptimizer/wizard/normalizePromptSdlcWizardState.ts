import { PROMPT_SDLC_WIZARD_MODULE_PASS_SCORE } from "./promptSdlcWizardLimits.constant";
import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

/** Backfill fields missing from older `prompt-optimizer-cycles.json` wizard blobs. */
export const normalizePromptSdlcWizardState = (
  wizard: PromptSdlcWizardState,
): PromptSdlcWizardState => ({
  ...wizard,
  modulePassScore:
    wizard.modulePassScore ?? PROMPT_SDLC_WIZARD_MODULE_PASS_SCORE,
  parameterValues: wizard.parameterValues ?? {},
  pendingStepInstructions: wizard.pendingStepInstructions ?? "",
  selectedSplitTopology: wizard.selectedSplitTopology ?? null,
  modules: wizard.modules.map((module) => ({
    ...module,
    statistics: module.statistics ?? null,
  })),
  orchestratorSkill: wizard.orchestratorSkill ?? null,
  additionalSkillSuggestions: wizard.additionalSkillSuggestions ?? [],
  additionalSkillSuggestionsStatus:
    wizard.additionalSkillSuggestionsStatus ?? "idle",
  additionalSkillSuggestionsSummary:
    wizard.additionalSkillSuggestionsSummary ?? null,
  lastWriterParseFailureReply: wizard.lastWriterParseFailureReply ?? null,
});
