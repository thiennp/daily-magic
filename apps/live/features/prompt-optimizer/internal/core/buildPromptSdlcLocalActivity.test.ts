import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { describePromptSdlcLocalActivity } from "./buildPromptSdlcLocalActivity";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";

describe("describePromptSdlcLocalActivity", () => {
  it("surfaces errorMessage and judge rawReply on wizard evaluate failure", () => {
    const activity = describePromptSdlcLocalActivity({
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "codex",
        improverModel: "codex",
        wizard: {
          ...createInitialPromptSdlcWizardState("p"),
          phase: "evaluate",
          gate: null,
        },
      }),
      status: "failed",
      errorMessage: "The judge reply needs a score and a reason.",
      currentRound: 0,
      revisions: [
        {
          roundNumber: 0,
          promptText: "p",
          judgement: {
            score: null,
            passed: null,
            reasons: null,
            rawReply: '{"maybe": true}',
            tokens: null,
          },
        },
      ],
    });
    expect(activity.title).toBe("Step 2 — Evaluate failed");
    expect(activity.detail).toContain(
      "The judge reply needs a score and a reason.",
    );
    expect(activity.detail).toContain("score JSON");
    expect(activity.replyPreview).toBe('{"maybe": true}');
    expect(activity.detail).toContain("score JSON");
  });
});
