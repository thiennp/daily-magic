import { extractPromptSdlcJsonObject } from "./extractPromptSdlcJsonObject";
import { normalizePromptSdlcWizardAdditionalSkillSuggestions } from "./normalizePromptSdlcWizardAdditionalSkillSuggestions";
import {
  isPromptSdlcWizardSkillSuggestionsVerdictShape,
  readPromptSdlcWizardAdditionalSkillSuggestionFromJson,
} from "./readPromptSdlcWizardAdditionalSkillSuggestionFromJson";
import type PromptSdlcWizardAdditionalSkillSuggestion from "./types/PromptSdlcWizardAdditionalSkillSuggestion.type";

export type PromptSdlcWizardAdditionalSkillSuggestionsParseResult =
  | {
      readonly ok: true;
      readonly summary: string;
      readonly suggestions: readonly PromptSdlcWizardAdditionalSkillSuggestion[];
    }
  | { readonly ok: false; readonly errorMessage: string };

export const parsePromptSdlcWizardAdditionalSkillSuggestions = (
  raw: string,
  orchestratorFileName: string | null,
): PromptSdlcWizardAdditionalSkillSuggestionsParseResult => {
  const parsed = ((): unknown | null => {
    try {
      return extractPromptSdlcJsonObject(raw);
    } catch {
      return null;
    }
  })();
  if (parsed === null) {
    return {
      ok: false,
      errorMessage: "The judge did not return skill suggestions.",
    };
  }
  if (isPromptSdlcWizardSkillSuggestionsVerdictShape(parsed)) {
    return {
      ok: false,
      errorMessage: "The judge returned a score instead of skill suggestions.",
    };
  }
  if (typeof parsed !== "object" || parsed === null) {
    return {
      ok: false,
      errorMessage: "The judge did not return skill suggestions.",
    };
  }
  const record = parsed as { summary?: unknown; suggestions?: unknown };
  const summary =
    typeof record.summary === "string"
      ? record.summary.replace(/\s+/gu, " ").trim()
      : "";
  if (!Array.isArray(record.suggestions)) {
    return {
      ok: false,
      errorMessage: "The judge did not return skill suggestions.",
    };
  }
  const rawSuggestions = record.suggestions
    .map(readPromptSdlcWizardAdditionalSkillSuggestionFromJson)
    .filter(
      (item): item is PromptSdlcWizardAdditionalSkillSuggestion =>
        item !== null,
    );
  const suggestions = normalizePromptSdlcWizardAdditionalSkillSuggestions({
    suggestions: rawSuggestions,
    orchestratorFileName,
  });
  if (suggestions.length === 0) {
    return {
      ok: false,
      errorMessage: "No usable additional skill suggestions came back.",
    };
  }
  return {
    ok: true,
    summary,
    suggestions,
  };
};
