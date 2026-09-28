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
});
