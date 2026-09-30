import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

export const markPromptSdlcWizardRunComplete = (
  wizard: PromptSdlcWizardState,
  judgeIsManual: boolean,
): PromptSdlcWizardState => ({
  ...wizard,
  gate: null,
  phase: "complete",
  additionalSkillSuggestionsStatus: judgeIsManual ? "skipped" : "pending",
  additionalSkillSuggestions:
    wizard.additionalSkillSuggestionsStatus === "ready"
      ? wizard.additionalSkillSuggestions
      : [],
  additionalSkillSuggestionsSummary:
    wizard.additionalSkillSuggestionsStatus === "ready"
      ? wizard.additionalSkillSuggestionsSummary
      : null,
});
