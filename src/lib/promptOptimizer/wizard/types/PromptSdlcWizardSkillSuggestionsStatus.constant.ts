export const PROMPT_SDLC_WIZARD_SKILL_SUGGESTIONS_STATUSES = [
  "idle",
  "pending",
  "ready",
  "skipped",
] as const;

export type PromptSdlcWizardSkillSuggestionsStatus =
  (typeof PROMPT_SDLC_WIZARD_SKILL_SUGGESTIONS_STATUSES)[number];
