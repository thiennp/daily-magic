import { describe, expect, it } from "vitest";

import { buildPromptSdlcAgentSnapshot } from "./buildPromptSdlcAgentSnapshot";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { sumPromptSdlcLocalTokens } from "./sumPromptSdlcLocalTokens";

describe("sumPromptSdlcLocalTokens", () => {
  it("adds judge and improver tokens through the requested round", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "Stay in the facts.",
        sourcePrompt: "Be helpful.",
        judgeModel: "claude-cli" as const,
        improverModel: "codex" as const,
      }),
      status: "stopped" as const,
      errorMessage: "Finished. The best prompt is the result.",
      revisions: [
        {
          roundNumber: 0,
          promptText: "Be helpful.",
          judgement: {
            score: 40,
            passed: false,
            reasons: "Thin.",
            rawReply: "{}",
            tokens: 100,
          },
        },
        {
          roundNumber: 1,
          promptText: "Name the facts.",
          writerTokens: 50,
          judgement: {
            score: 80,
            passed: false,
            reasons: "Closer.",
            rawReply: "{}",
            tokens: 25,
          },
        },
      ],
    };

    expect(sumPromptSdlcLocalTokens(cycle, 0)).toBe(100);
    expect(sumPromptSdlcLocalTokens(cycle)).toBe(175);
    expect(buildPromptSdlcAgentSnapshot(cycle)).toMatchObject({
      status: "stopped",
      done: true,
      useThisPrompt: true,
      totalTokens: 175,
      bestPrompt: "Name the facts.",
      bestScore: 80,
    });
  });
});
