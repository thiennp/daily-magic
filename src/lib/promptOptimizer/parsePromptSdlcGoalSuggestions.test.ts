import { describe, expect, it } from "vitest";

import { parsePromptSdlcGoalSuggestions } from "@/lib/promptOptimizer/parsePromptSdlcGoalSuggestions";

const source = "Update replies/latest.md using only ticket facts.";

describe("parsePromptSdlcGoalSuggestions", () => {
  it("keeps up to three distinct goals", () => {
    const result = parsePromptSdlcGoalSuggestions(
      JSON.stringify({
        options: [
          "Reply cites only ticket facts.",
          "Reply cites only ticket facts.",
          "File replies/latest.md exists.",
          "Fourth is dropped.",
        ],
      }),
      source,
    );
    expect(result).toEqual({
      ok: true,
      options: [
        "Reply cites only ticket facts.",
        "File replies/latest.md exists.",
        "Fourth is dropped.",
      ],
    });
  });

  it("rejects a judge verdict shape", () => {
    const result = parsePromptSdlcGoalSuggestions(
      JSON.stringify({ score: 40, passed: false, reasons: "weak" }),
      source,
    );
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errorMessage).toContain("score");
    }
  });

  it("rejects options that duplicate the source prompt", () => {
    const result = parsePromptSdlcGoalSuggestions(
      JSON.stringify({ options: [source, "Something else measurable."] }),
      source,
    );
    expect(result).toEqual({
      ok: true,
      options: ["Something else measurable."],
    });
  });

  it("rejects empty usable options", () => {
    const result = parsePromptSdlcGoalSuggestions(
      JSON.stringify({ options: ["", 2, source] }),
      source,
    );
    expect(result.ok).toBe(false);
  });
});
