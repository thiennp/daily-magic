import { describe, expect, it } from "vitest";

import { applyPromptSdlcLocalJudgeReply } from "./applyPromptSdlcLocalReply";
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
});
