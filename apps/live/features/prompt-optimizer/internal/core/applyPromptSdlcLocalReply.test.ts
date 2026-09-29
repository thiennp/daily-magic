import { describe, expect, it } from "vitest";

import {
  applyPromptSdlcLocalImproverReply,
  applyPromptSdlcLocalJudgeReply,
} from "./applyPromptSdlcLocalReply";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";

describe("applyPromptSdlcLocalJudgeReply", () => {
  it("passes a score at the bar and keeps a failed verdict from becoming a score", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "The reply stays inside the facts.",
      sourcePrompt: "Be helpful.",
      judgeModel: "claude-cli",
      improverModel: "codex",
    });

    const passed = applyPromptSdlcLocalJudgeReply(
      cycle,
      '{"score":90,"passed":true,"reasons":"The prompt names the missing-fact stop."}',
    );
    expect(passed.status).toBe("passed");
    expect(passed.revisions[0]?.judgement?.score).toBe(90);

    const failed = applyPromptSdlcLocalJudgeReply(
      cycle,
      "I would score this highly.",
    );
    expect(failed.status).toBe("failed");
    expect(failed.revisions[0]?.judgement?.score).toBeNull();
  });

  it("keeps rewriting after the third score when it is still under the pass score", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "The reply stays inside the facts.",
        sourcePrompt: "Be helpful.",
        judgeModel: "claude-cli" as const,
        improverModel: "codex" as const,
      }),
      currentRound: 2,
      revisions: [
        {
          roundNumber: 0,
          promptText: "Be helpful.",
          judgement: {
            score: 20,
            passed: false,
            reasons: "Too vague.",
            rawReply: "",
          },
        },
        {
          roundNumber: 1,
          promptText: "Stay inside the ticket.",
          judgement: {
            score: 40,
            passed: false,
            reasons: "Still thin.",
            rawReply: "",
          },
        },
        {
          roundNumber: 2,
          promptText: "Name the missing-fact stop.",
          judgement: null,
        },
      ],
    };

    const next = applyPromptSdlcLocalJudgeReply(
      cycle,
      '{"score":55,"passed":false,"reasons":"Closer, still missing the stop."}',
    );

    expect(next.status).toBe("improving");
    expect(next.currentRound).toBe(2);
  });

  it("stops at the round limit and when the score stops rising", () => {
    const base = createPromptSdlcLocalCycle({
      goal: "The reply stays inside the facts.",
      sourcePrompt: "Be helpful.",
      judgeModel: "claude-cli",
      improverModel: "codex",
      maxRounds: 3,
    });
    const limited = applyPromptSdlcLocalJudgeReply(
      {
        ...base,
        currentRound: 2,
        revisions: [
          {
            roundNumber: 2,
            promptText: "Name the stop.",
            judgement: null,
          },
        ],
      },
      '{"score":40,"passed":false,"reasons":"Still thin."}',
    );
    expect(limited.status).toBe("stopped");
    expect(limited.errorMessage).toContain("round limit");

    const stalled = applyPromptSdlcLocalJudgeReply(
      {
        ...base,
        maxRounds: 30,
        currentRound: 3,
        revisions: [
          {
            roundNumber: 0,
            promptText: "Best.",
            judgement: {
              score: 84,
              passed: false,
              reasons: "Clear.",
              rawReply: "",
            },
          },
          {
            roundNumber: 1,
            promptText: "Drop.",
            judgement: {
              score: 38,
              passed: false,
              reasons: "Lost it.",
              rawReply: "",
            },
          },
          {
            roundNumber: 2,
            promptText: "Partial.",
            judgement: {
              score: 61,
              passed: false,
              reasons: "Closer.",
              rawReply: "",
            },
          },
          {
            roundNumber: 3,
            promptText: "Flat.",
            judgement: null,
          },
        ],
      },
      '{"score":58,"passed":false,"reasons":"Still under the best."}',
    );
    expect(stalled.status).toBe("stopped");
    expect(stalled.errorMessage).toContain("stopped rising");
  });

  it("stores the tokens from the judge and the improver", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "The reply stays inside the facts.",
      sourcePrompt: "Be helpful.",
      judgeModel: "claude-cli",
      improverModel: "codex",
    });
    const scored = applyPromptSdlcLocalJudgeReply(
      cycle,
      '{"score":40,"passed":false,"reasons":"Too vague."}',
      1_200,
    );
    const rewritten = applyPromptSdlcLocalImproverReply(
      scored,
      "Name the facts the reply may use.",
      800,
    );

    expect(scored.revisions[0]?.judgement?.tokens).toBe(1_200);
    expect(rewritten.revisions[1]?.writerTokens).toBe(800);
    expect(rewritten.currentRound).toBe(1);
  });
});
