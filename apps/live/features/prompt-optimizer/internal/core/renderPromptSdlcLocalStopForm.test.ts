import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import {
  renderPromptSdlcLocalStopForm,
  renderPromptSdlcWizardGateEndForm,
} from "./renderPromptSdlcLocalStopForm";

describe("renderPromptSdlcLocalStopForm", () => {
  it("renders Stop run for a legacy non-wizard loop", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
    });
    const html = renderPromptSdlcLocalStopForm({ ...cycle, status: "judging" });
    expect(html).toContain('name="intent" value="stop"');
    expect(html).toContain(">Stop run<");
    expect(html).toContain("data-confirm-message=");
    expect(html).not.toContain("End wizard");
  });

  it("hides This run stop while the wizard is paused", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      wizard: {
        ...createInitialPromptSdlcWizardState("p"),
        gate: "evaluate",
        phase: "evaluate",
      },
    });
    expect(
      renderPromptSdlcLocalStopForm({ ...cycle, status: "wizard_paused" }),
    ).toBe("");
    const gateEnd = renderPromptSdlcWizardGateEndForm({
      ...cycle,
      status: "wizard_paused",
    });
    expect(gateEnd).toContain('value="wizard-stop-all"');
    expect(gateEnd).toContain(">End wizard<");
  });
});
