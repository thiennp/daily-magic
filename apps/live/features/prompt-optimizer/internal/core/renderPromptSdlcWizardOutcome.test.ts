import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { renderPromptSdlcWizardOutcome } from "./renderPromptSdlcWizardOutcome";

describe("renderPromptSdlcWizardOutcome", () => {
  it("renders a wizard outcome card when the wizard run is stopped", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      wizard: {
        ...createInitialPromptSdlcWizardState("p"),
        gate: null,
        phase: "complete",
        modules: [],
      },
    });
    const html = renderPromptSdlcWizardOutcome({
      ...cycle,
      status: "stopped",
    });
    expect(html).toContain('id="prompt-optimizer-wizard-outcome"');
    expect(html).toContain("Wizard ended");
  });

  it("returns empty for an in-progress wizard", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      wizard: createInitialPromptSdlcWizardState("p"),
    });
    expect(
      renderPromptSdlcWizardOutcome({ ...cycle, status: "wizard_paused" }),
    ).toBe("");
  });
});
