import { PROMPT_SDLC_GOAL_MAX_LENGTH } from "@/lib/promptOptimizer/promptSdlcLimits.constant";
import { extractPromptSdlcJsonObject } from "@/lib/promptOptimizer/wizard/extractPromptSdlcJsonObject";

const collapseWhitespace = (value: string): string =>
  value.replace(/\s+/gu, " ").trim();

const isVerdictShape = (value: unknown): boolean => {
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

const filterOptions = (
  rawOptions: readonly unknown[],
  sourcePrompt: string,
): readonly string[] => {
  const source = collapseWhitespace(sourcePrompt);
  const seen = new Set<string>();
  const kept: string[] = [];
  for (const item of rawOptions) {
    if (typeof item !== "string") {
      continue;
    }
    const trimmed = item.trim();
    if (trimmed.length === 0 || trimmed.length > PROMPT_SDLC_GOAL_MAX_LENGTH) {
      continue;
    }
    const key = collapseWhitespace(trimmed);
    if (key.length === 0 || key === source || seen.has(key)) {
      continue;
    }
    seen.add(key);
    kept.push(trimmed);
    if (kept.length >= 3) {
      break;
    }
  }
  return kept;
};

export type PromptSdlcGoalSuggestionsParseResult =
  | { readonly ok: true; readonly options: readonly string[] }
  | { readonly ok: false; readonly errorMessage: string };

/** Parses writer JSON for goal suggestions. Empty options after filtering is an error. */
export const parsePromptSdlcGoalSuggestions = (
  raw: string,
  sourcePrompt: string,
): PromptSdlcGoalSuggestionsParseResult => {
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
      errorMessage: "The writer did not return goal suggestions.",
    };
  }

  if (isVerdictShape(parsed)) {
    return {
      ok: false,
      errorMessage: "The writer returned a score instead of goal suggestions.",
    };
  }

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !("options" in parsed) ||
    !Array.isArray((parsed as { options: unknown }).options)
  ) {
    return {
      ok: false,
      errorMessage: "The writer did not return goal suggestions.",
    };
  }

  const options = filterOptions(
    (parsed as { options: readonly unknown[] }).options,
    sourcePrompt,
  );
  if (options.length === 0) {
    return {
      ok: false,
      errorMessage: "No usable goal suggestions came back. Type your own goal.",
    };
  }

  return { ok: true, options };
};
