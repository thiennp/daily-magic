import { describe, expect, it } from "vitest";

import { continueAfterJudgeReply } from "@/lib/promptOptimizer/continuePromptSdlc";
import { JUDGE_REPLY_WAS_NOT_A_SCORE } from "@/lib/promptOptimizer/promptSdlcContinuation.type";
import { describePromptSdlcJudgeReplyFailure } from "@/lib/promptOptimizer/describePromptSdlcJudgeReplyFailure";

const judge = (raw: string) =>
  continueAfterJudgeReply({
    raw,
    passScore: 8,
    goal: "Draft a reply",
    promptText: "Write a reply.",
    improver: { kind: "writer", writerAgent: "codex" },
  });

describe("DF-035 (a) judge CLI errors are surfaced verbatim", () => {
  it("shows a 429 spend-limit reply as the error", () => {
    const raw = "API Error: 429 You've hit your org's monthly spend limit";
    const result = judge(raw);
    expect(result.continuation).toEqual({
      type: "failed",
      errorMessage: `The judge CLI returned an error: ${raw}`,
    });
  });

  it("keeps the score-parse error for ordinary prose", () => {
    expect(describePromptSdlcJudgeReplyFailure("Looks fine to me")).toBeNull();
    const result = judge("Looks fine to me");
    expect(result.continuation).toEqual({
      type: "failed",
      errorMessage: JUDGE_REPLY_WAS_NOT_A_SCORE,
    });
  });
});
