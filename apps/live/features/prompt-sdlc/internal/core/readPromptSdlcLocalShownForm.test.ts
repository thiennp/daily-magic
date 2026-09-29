import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { readPromptSdlcLocalShownForm } from "./readPromptSdlcLocalShownForm";

describe("readPromptSdlcLocalShownForm", () => {
  it("keeps generalized templated prompt in the compose field after evaluate", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "Goal",
      sourcePrompt: "plain",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      workingDirectory: "/tmp",
      wizard: {
        ...createInitialPromptSdlcWizardState("plain"),
        phase: "separate",
        gate: null,
        templatedPrompt: "Reply for {{issue}}",
        variables: [
          { name: "issue", description: "d", sampleValue: "billing" },
        ],
        evaluateSelectedRound: 1,
      },
      revisions: [
        {
          roundNumber: 0,
          promptText: "Reply for billing with concrete wording",
          judgement: null,
        },
        {
          roundNumber: 1,
          promptText: "Concrete revision chosen",
          judgement: { score: 90, passed: true, reasons: "ok", rawReply: "90" },
        },
      ],
    });
    const shown = readPromptSdlcLocalShownForm({
      goal: "",
      prompt: "",
      folder: "~",
      passScore: "70",
      judge: "",
      improver: "",
      cycle,
    });
    expect(shown.prompt).toBe("Reply for {{issue}}");
    expect(shown.prompt).not.toContain("billing with concrete");
  });
});
