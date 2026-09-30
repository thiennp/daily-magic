import { describe, expect, it } from "vitest";

import {
  isMeasurablePromptSdlcGoal,
  scorePromptSdlcSuggestedGoals,
} from "@/lib/promptOptimizer/scorePromptSdlcSuggestedGoal";

describe("isMeasurablePromptSdlcGoal", () => {
  it("accepts file and command checks", () => {
    expect(
      isMeasurablePromptSdlcGoal(
        "Update replies/latest.md using only ticket facts; npm run test passes.",
      ),
    ).toBe(true);
  });

  it("rejects vague goals", () => {
    expect(isMeasurablePromptSdlcGoal("Be helpful and make it better.")).toBe(
      false,
    );
  });
});

describe("scorePromptSdlcSuggestedGoals", () => {
  it("requires every option to be measurable", () => {
    const result = scorePromptSdlcSuggestedGoals([
      "File src/foo.ts exports parseBar.",
      "Be helpful.",
    ]);
    expect(result.passes).toBe(false);
    expect(result.measurableCount).toBe(1);
  });
});
