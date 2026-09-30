import type PromptSdlcWizardAdditionalSkillSuggestion from "./types/PromptSdlcWizardAdditionalSkillSuggestion.type";

export const isPromptSdlcWizardSkillSuggestionsVerdictShape = (
  value: unknown,
): boolean => {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const record = value as {
    score?: unknown;
    passed?: unknown;
    reasons?: unknown;
  };
  return (
    typeof record.score === "number" &&
    typeof record.passed === "boolean" &&
    typeof record.reasons === "string"
  );
};

export const readPromptSdlcWizardAdditionalSkillSuggestionFromJson = (
  value: unknown,
): PromptSdlcWizardAdditionalSkillSuggestion | null => {
  if (typeof value !== "object" || value === null) {
    return null;
  }
  const record = value as {
    fileName?: unknown;
    name?: unknown;
    description?: unknown;
    rationale?: unknown;
  };
  if (
    typeof record.fileName !== "string" ||
    typeof record.name !== "string" ||
    typeof record.description !== "string" ||
    typeof record.rationale !== "string"
  ) {
    return null;
  }
  return {
    fileName: record.fileName,
    name: record.name,
    description: record.description,
    rationale: record.rationale,
  };
};
