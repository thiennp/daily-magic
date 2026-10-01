import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { renderPromptSdlcWizardRevisionRoundList } from "./renderPromptSdlcWizardRevisionRoundList";

describe("renderPromptSdlcWizardRevisionRoundJudgePromptInfo", () => {
  it("renders inline judge prompt info after each evaluate round title", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "Save tokens",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        wizard: {
          ...createInitialPromptSdlcWizardState("p"),
          gate: "evaluate",
          phase: "evaluate",
        },
      }),
      judgePromptTextOnly: true,
      revisions: [
        {
          roundNumber: 1,
          promptText: "Revise this prompt",
          judgement: {
            score: 35,
            passed: false,
            reasons: "incomplete",
            rawReply: "{}",
          },
        },
      ],
    };
    const html = renderPromptSdlcWizardRevisionRoundList({
      cycle,
      interactive: false,
    });
    expect(html).toContain("Round 1 — 35");
    expect(html).toContain("data-sdlc-revision-judge-prompt-info");
    expect(html).toContain("Revise this prompt");
    expect(html).toContain("Judge prompt — Round 1");
  });
});
