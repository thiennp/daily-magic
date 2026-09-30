import { describe, expect, it } from "vitest";

import { preferMeasurablePromptSdlcGoalOptions } from "@/lib/promptOptimizer/preferMeasurablePromptSdlcGoalOptions";

describe("preferMeasurablePromptSdlcGoalOptions", () => {
  it("drops vague options when measurable ones exist", () => {
    const result = preferMeasurablePromptSdlcGoalOptions([
      "src/foo.ts exports bar; npm run test passes.",
      "Be helpful.",
      "vitest exits 0 for parse.test.ts.",
    ]);
    expect(result).toHaveLength(2);
    expect(result.some((item) => /helpful/i.test(item))).toBe(false);
  });

  it("keeps all options when none are measurable", () => {
    const vague = ["Be helpful.", "Do it well.", "Improve quality."];
    expect(preferMeasurablePromptSdlcGoalOptions(vague)).toEqual(vague);
  });
});
