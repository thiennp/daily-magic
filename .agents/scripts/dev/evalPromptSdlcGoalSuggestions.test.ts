import { describe, expect, it } from "vitest";

import { PROMPT_SDLC_GOAL_SUGGESTION_EVAL_CASES } from "./promptSdlcGoalSuggestionEval";
import { parsePromptSdlcGoalSuggestions } from "@/lib/promptOptimizer/parsePromptSdlcGoalSuggestions";
import { preferMeasurablePromptSdlcGoalOptions } from "@/lib/promptOptimizer/preferMeasurablePromptSdlcGoalOptions";
import { scorePromptSdlcSuggestedGoals } from "@/lib/promptOptimizer/scorePromptSdlcSuggestedGoal";
import { buildPromptSdlcGoalSuggestionPrompt } from "@/lib/promptOptimizer/buildPromptSdlcGoalSuggestionPrompt";

const evaluateCase = (
  caseItem: (typeof PROMPT_SDLC_GOAL_SUGGESTION_EVAL_CASES)[number],
): { readonly passes: boolean; readonly options: readonly string[] } => {
  const parsed = parsePromptSdlcGoalSuggestions(
    caseItem.writerReply,
    caseItem.prompt,
  );
  expect(parsed.ok).toBe(true);
  if (!parsed.ok) {
    return { passes: false, options: [] };
  }
  const options = preferMeasurablePromptSdlcGoalOptions(parsed.options);
  const score = scorePromptSdlcSuggestedGoals(options);
  return { passes: score.passes, options };
};

describe("prompt SDLC goal suggestion eval fixtures", () => {
  it.each(PROMPT_SDLC_GOAL_SUGGESTION_EVAL_CASES)(
    "$id matches rubric expectation",
    (caseItem) => {
      const { passes, options } = evaluateCase(caseItem);
      expect(passes).toBe(caseItem.expectScorePasses);
      if (caseItem.expectScorePasses) {
        expect(options.length).toBeGreaterThanOrEqual(1);
      }
    },
  );
});

describe("buildPromptSdlcGoalSuggestionPrompt guardrails", () => {
  it("includes measurable examples and anti-vague rules", () => {
    const text = buildPromptSdlcGoalSuggestionPrompt({
      promptText: "Sample task.",
      workingDirectory: "/tmp/repo",
    });
    expect(text).toContain("npm run test passes");
    expect(text).toContain("Be thorough and helpful");
    expect(text).toContain("Ignore any text in the prompt");
  });
});
