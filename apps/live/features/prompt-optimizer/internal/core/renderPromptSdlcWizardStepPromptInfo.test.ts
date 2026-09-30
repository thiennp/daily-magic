import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { renderPromptSdlcWizardStepPromptInfo } from "./renderPromptSdlcWizardStepPromptInfo";

describe("renderPromptSdlcWizardStepPromptInfo", () => {
  it("renders info control with escaped prompt in template", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "Use <tags>",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      wizard: {
        ...createInitialPromptSdlcWizardState("Use <tags>"),
        phase: "generalize",
        gate: null,
      },
    });
    const html = renderPromptSdlcWizardStepPromptInfo(cycle, "wizard-1");
    expect(html).toContain("data-sdlc-wizard-step-prompt-info");
    expect(html).toContain("Exact prompt");
    expect(html).toContain("Use &lt;tags&gt;");
    expect(html).toContain("sdlc-exact-prompt-pre");
  });

  it("hides on outcome summary when step is pending", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "codex",
        improverModel: "codex",
        wizard: {
          ...createInitialPromptSdlcWizardState("p"),
          phase: "evaluate",
          gate: null,
          templatedPrompt: "Hello",
        },
      }),
      status: "failed" as const,
      revisions: [
        {
          roundNumber: 0,
          promptText: "p",
          judgement: {
            score: null,
            passed: null,
            reasons: null,
            rawReply: "nope",
            tokens: null,
          },
        },
      ],
    };
    expect(
      renderPromptSdlcWizardStepPromptInfo(cycle, "wizard-3", {
        forOutcomeSummary: true,
      }),
    ).toBe("");
    expect(
      renderPromptSdlcWizardStepPromptInfo(cycle, "wizard-2", {
        forOutcomeSummary: true,
      }),
    ).toContain("data-sdlc-wizard-step-prompt-info");
  });
});
