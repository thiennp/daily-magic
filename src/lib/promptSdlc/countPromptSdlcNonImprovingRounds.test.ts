import { describe, expect, it } from "vitest";

import { countPromptSdlcNonImprovingRounds } from "@/lib/promptSdlc/countPromptSdlcNonImprovingRounds";
import { continueAfterJudgeReply } from "@/lib/promptSdlc/continuePromptSdlc";

const TRACE = [22, 0, 0, 58, 58, 61, 0, 0, 84, 38, 61, 58];

describe("countPromptSdlcNonImprovingRounds", () => {
  it("resets when a score beats the best and stops a flat tail after three", () => {
    expect(countPromptSdlcNonImprovingRounds(TRACE.slice(0, 3))).toBe(2);
    expect(countPromptSdlcNonImprovingRounds(TRACE.slice(0, 4))).toBe(0);
    expect(countPromptSdlcNonImprovingRounds(TRACE.slice(0, 9))).toBe(0);
    expect(countPromptSdlcNonImprovingRounds(TRACE)).toBe(3);
  });

  it("rewrites the best prompt after a drop and stops once the stall reaches 3", () => {
    const improver = { kind: "ollama" as const, model: "qwen2.5:7b" };
    const dropped = continueAfterJudgeReply({
      raw: '{"score": 38, "passed": false, "reasons": "lost the screen"}',
      passScore: 90,
      goal: "Ship the button",
      promptText: "Weaker draft",
      improver,
      round: 9,
      maxRounds: 30,
      priorRounds: [
        {
          roundNumber: 8,
          promptText: "Best so far",
          score: 84,
          reasons: "Names the screen.",
        },
      ],
    });
    expect(dropped.continuation.type).toBe("call");
    if (dropped.continuation.type === "call") {
      expect(dropped.continuation.prompt).toContain(
        "highest scoring version so far",
      );
      expect(dropped.continuation.prompt).toContain("Best so far");
      expect(dropped.continuation.prompt).toContain("Judge score: 84");
      expect(dropped.continuation.prompt).toContain("Avoid:");
      expect(dropped.continuation.prompt).toContain("lost the screen");
      expect(dropped.continuation.prompt).not.toContain("Weaker draft");
    }

    const stalled = continueAfterJudgeReply({
      raw: '{"score": 58, "passed": false, "reasons": "still under"}',
      passScore: 90,
      goal: "Ship the button",
      promptText: "Another drop",
      improver,
      round: 11,
      maxRounds: 30,
      priorRounds: [
        {
          roundNumber: 8,
          promptText: "Best so far",
          score: 84,
          reasons: "Names the screen.",
        },
        {
          roundNumber: 9,
          promptText: "Weaker draft",
          score: 38,
          reasons: "lost the screen",
        },
        {
          roundNumber: 10,
          promptText: "Partial recovery",
          score: 61,
          reasons: "closer",
        },
      ],
    });
    const roundLimit = continueAfterJudgeReply({
      raw: '{"score": 38, "passed": false, "reasons": "dropped"}',
      passScore: 90,
      goal: "Ship the button",
      promptText: "Weaker draft",
      improver,
      round: 9,
      maxRounds: 10,
    });
    expect(roundLimit.continuation).toEqual({
      type: "stopped",
      errorMessage: "Stopped at the round limit. The best prompt is kept.",
    });

    expect(stalled.continuation).toEqual({
      type: "stopped",
      errorMessage:
        "Stopped because the score stopped rising. The best prompt is kept. Avoid: lost the screen; closer; still under.",
    });
  });
});
