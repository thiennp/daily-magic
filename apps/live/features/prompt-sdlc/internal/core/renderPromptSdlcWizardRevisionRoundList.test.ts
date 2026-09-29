import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { renderPromptSdlcWizardRevisionRoundList } from "./renderPromptSdlcWizardRevisionRoundList";

describe("renderPromptSdlcWizardRevisionRoundList", () => {
  it("shows unscored rounds and a notice when evaluate has no scores yet", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
      }),
      status: "wizard_paused" as const,
      wizard: {
        ...createInitialPromptSdlcWizardState("p"),
        gate: "evaluate" as const,
        phase: "evaluate" as const,
      },
      revisions: [{ roundNumber: 0, promptText: "draft", judgement: null }],
    };
    const html = renderPromptSdlcWizardRevisionRoundList({
      cycle,
      interactive: true,
      selectedRound: 0,
    });
    expect(html).toContain("No scored revisions yet");
    expect(html).toContain("Round 0 — not scored");
    expect(html).toContain('name="wizardRevisionRound"');
  });
});
