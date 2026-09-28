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
      round: 0,
      maxRounds: 3,
      passScore: 80,
      goal: "Ship the button",
      promptText: "Add a button",
      improver,
    });
    expect(passed.continuation).toEqual({ type: "passed" });

    const rewrite = continueAfterJudgeReply({
      raw: '{"score": 79, "passed": false, "reasons": "vague"}',
      round: 0,
      maxRounds: 3,
      passScore: 80,
      goal: "Ship the button",
      promptText: "Add a button",
      improver,
    });
    expect(rewrite.continuation.type).toBe("call");
    if (rewrite.continuation.type === "call") {
      expect(rewrite.continuation.role).toBe("improve");
      expect(rewrite.continuation.prompt).toContain("Do not edit files");
      expect(rewrite.continuation.prompt).toContain("Ship the button");
      expect(rewrite.continuation.prompt).toContain("Judge score: 79");
      expect(rewrite.continuation.prompt).toContain("vague");
    }

    const stopped = continueAfterJudgeReply({
      raw: "not a verdict",
      round: 2,
      maxRounds: 3,
      passScore: 80,
      goal: "Ship the button",
      promptText: "Add a button",
      improver,
    });
    expect(stopped.continuation).toEqual({
      type: "failed",
      errorMessage: "The judge reply needs a score and a reason.",
    });

    const capped = continueAfterJudgeReply({
      raw: '{"score": 10, "passed": false, "reasons": "still vague"}',
      round: 2,
      maxRounds: 3,
      passScore: 80,
      goal: "Ship the button",
      promptText: "Add a button",
      improver,
    });
    expect(capped.continuation).toEqual({ type: "stopped" });
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
