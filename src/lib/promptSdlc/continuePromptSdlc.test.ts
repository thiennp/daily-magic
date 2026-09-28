import { describe, expect, it } from "vitest";

import {
  continueAfterImproveReply,
  continueAfterJudgeReply,
} from "@/lib/promptSdlc/continuePromptSdlc";

const improver = { kind: "ollama" as const, model: "qwen2.5:7b" };
const judge = { kind: "writer" as const, writerAgent: "cursor" as const };

describe("continuePromptSdlc", () => {
  it("passes, asks for a rewrite, or stops from the judge score", () => {
    const passed = continueAfterJudgeReply({
      raw: '{"score": 80, "passed": true, "reasons": "ready"}',
      passScore: 80,
      goal: "Ship the button",
      promptText: "Add a button",
      improver,
    });
    expect(passed.continuation).toEqual({ type: "passed" });

    const rewrite = continueAfterJudgeReply({
      raw: '{"score": 79, "passed": false, "reasons": "vague"}',
      passScore: 80,
      goal: "Ship the button",
      promptText: "Add a button",
      improver,
      priorRounds: [
        {
          roundNumber: 0,
          promptText: "Add something.",
          score: 85,
          reasons: "No screen.",
        },
      ],
    });
    expect(rewrite.continuation.type).toBe("call");
    if (rewrite.continuation.type === "call") {
      expect(rewrite.continuation.role).toBe("improve");
      expect(rewrite.continuation.prompt).toContain("Do not edit files");
      expect(rewrite.continuation.prompt).toContain("Ship the button");
      expect(rewrite.continuation.prompt).toContain(
        "highest scoring version so far",
      );
      expect(rewrite.continuation.prompt).toContain("Add something.");
      expect(rewrite.continuation.prompt).toContain("Judge score: 85");
      expect(rewrite.continuation.prompt).toContain("No screen.");
      expect(rewrite.continuation.prompt).toContain("Avoid:");
      expect(rewrite.continuation.prompt).toContain("vague");
      expect(rewrite.continuation.prompt).not.toContain("Add a button");
    }

    const stopped = continueAfterJudgeReply({
      raw: "not a verdict",
      passScore: 80,
      goal: "Ship the button",
      promptText: "Add a button",
      improver,
    });
    expect(stopped.continuation).toEqual({
      type: "failed",
      errorMessage: "The judge reply needs a score and a reason.",
    });

    const stillUnder = continueAfterJudgeReply({
      raw: '{"score": 10, "passed": false, "reasons": "still vague"}',
      passScore: 80,
      goal: "Ship the button",
      promptText: "Add a button",
      improver,
    });
    expect(stillUnder.continuation.type).toBe("call");

    const inconsistentPassed = continueAfterJudgeReply({
      raw: '{"score": 85, "passed": false, "reasons": "clear enough"}',
      passScore: 80,
      goal: "Ship the button",
      promptText: "Add a button",
      improver,
    });
    expect(inconsistentPassed.continuation).toEqual({ type: "passed" });
    expect(inconsistentPassed.verdict?.passed).toBe(true);
  });

  it("turns an improver reply into the next judge call", () => {
    const empty = continueAfterImproveReply({
      raw: "   ",
      judge,
      goal: "Ship the button",
      passScore: 80,
    });
    expect(empty.nextPrompt).toBeNull();
    expect(empty.continuation.type).toBe("failed");

    const next = continueAfterImproveReply({
      raw: "Ask which screen changes.",
      judge,
      goal: "Ship the button",
      passScore: 80,
    });
    expect(next.nextPrompt).toBe("Ask which screen changes.");
    expect(next.continuation.type).toBe("call");
    if (next.continuation.type === "call") {
      expect(next.continuation.role).toBe("judge");
      expect(next.continuation.choice).toEqual(judge);
      expect(next.continuation.prompt).toContain("Do not edit files");
    }
  });
});
