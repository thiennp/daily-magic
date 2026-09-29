import { describe, expect, it } from "vitest";

import { selectPromptSdlcBestPrompt } from "@/lib/promptOptimizer/selectPromptSdlcBestPrompt";

describe("selectPromptSdlcBestPrompt", () => {
  it("keeps the highest score, and the later round when the scores match", () => {
    expect(
      selectPromptSdlcBestPrompt([
        {
          roundNumber: 0,
          promptText: "Be helpful.",
          score: 40,
          reasons: "Vague.",
        },
        {
          roundNumber: 1,
          promptText: "Name the stop.",
          score: 91,
          reasons: "Ready.",
        },
        {
          roundNumber: 2,
          promptText: "Name the stop and the source.",
          score: 91,
          reasons: "Still ready.",
        },
        {
          roundNumber: 3,
          promptText: "Waiting.",
          score: null,
          reasons: null,
        },
      ]),
    ).toEqual({
      roundNumber: 2,
      promptText: "Name the stop and the source.",
      score: 91,
      reasons: "Still ready.",
    });
  });

  it("returns nothing when no round has a score", () => {
    expect(
      selectPromptSdlcBestPrompt([
        {
          roundNumber: 0,
          promptText: "Be helpful.",
          score: null,
          reasons: null,
        },
      ]),
    ).toBeNull();
  });
});
