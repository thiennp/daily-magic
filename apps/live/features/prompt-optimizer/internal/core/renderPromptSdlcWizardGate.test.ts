import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { renderPromptSdlcWizardGate } from "./renderPromptSdlcWizardGate";

describe("renderPromptSdlcWizardGate", () => {
  it("keeps split radios inside the gate form so Continue posts wizardSplitOptionId", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      workingDirectory: "/tmp",
      wizard: {
        ...createInitialPromptSdlcWizardState("p"),
        gate: "separate",
        phase: "separate",
        splitOptions: [
          {
            id: "opt-a",
            title: "A",
            summary: "s",
            topology: "chain",
            recommended: true,
            modules: [{ id: "m1", title: "M", prompt: "p", order: 0 }],
          },
        ],
      },
    });
    const html = renderPromptSdlcWizardGate(cycle);
    const formOpen = html.indexOf('<form method="POST"');
    const radio = html.indexOf('name="wizardSplitOptionId"');
    const formClose = html.indexOf("</form>");
    expect(formOpen).toBeGreaterThan(-1);
    expect(radio).toBeGreaterThan(formOpen);
    expect(radio).toBeLessThan(formClose);
  });

  it("shows parent prompt and wrapped split options on separate gate", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "Parent handoff text",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      workingDirectory: "/tmp",
      wizard: {
        ...createInitialPromptSdlcWizardState("Parent handoff text"),
        gate: "separate",
        phase: "separate",
        evaluateSelectedRound: null,
        splitOptions: [
          {
            id: "opt-a",
            title: "Option A",
            summary: "s",
            topology: "chain",
            recommended: true,
            modules: [{ id: "m1", title: "M", prompt: "p", order: 0 }],
          },
        ],
      },
    });
    const html = renderPromptSdlcWizardGate(cycle);
    expect(html).toContain("Orchestration for this option");
    expect(html).toContain("Separated module prompts");
    expect(html).toContain("Parent handoff text");
    expect(html).not.toContain("Orchestrator prompt (parent)");
    expect(html).toContain('class="sdlc-wizard-split-option"');
  });
});
