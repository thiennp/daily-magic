import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { renderPromptSdlcWizardGateSlot } from "./renderPromptSdlcWizardGateSlot";

describe("renderPromptSdlcWizardGateSlot", () => {
  it("leaves the gate slot empty when the wizard run is terminal", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
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
      }),
      status: "stopped" as const,
    };
    const html = renderPromptSdlcWizardGateSlot(cycle);
    expect(html).toBe('<div id="prompt-optimizer-wizard-gate-slot"></div>');
    expect(html).not.toContain("sdlc-wizard-accordion");
  });
});
