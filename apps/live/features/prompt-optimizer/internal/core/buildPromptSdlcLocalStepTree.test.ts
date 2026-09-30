import { describe, expect, it } from "vitest";

import {
  buildPromptSdlcSteps,
  createInitialPromptSdlcWizardState,
} from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import {
  PROMPT_SDLC_NODE_DIALOG_SCRIPT,
  renderPromptSdlcLocalStepTree,
} from "./buildPromptSdlcLocalStepTree";
import { mapPromptSdlcLocalCycleView } from "./mapPromptSdlcLocalCycleView";

describe("renderPromptSdlcLocalStepTree", () => {
  it("embeds step id on timeline nodes and finds the node modal template", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "codex",
      improverModel: "codex",
      workingDirectory: "/tmp",
      wizard: {
        ...createInitialPromptSdlcWizardState("p"),
        phase: "evaluate",
        gate: null,
        templatedPrompt: "Reply for {{issue}}",
      },
    });
    const judgingCycle = { ...cycle, status: "judging" as const };
    const steps = buildPromptSdlcSteps(
      mapPromptSdlcLocalCycleView(judgingCycle),
    );
    const html = renderPromptSdlcLocalStepTree(steps, judgingCycle);
    expect(html).toContain('data-sdlc-step-id="wizard-2"');
    expect(html).toContain("prompt-optimizer-wizard-active-step");
    expect(html).toContain("<template><h2>Step 2");
    expect(PROMPT_SDLC_NODE_DIALOG_SCRIPT).toContain(":scope > template");
    expect(PROMPT_SDLC_NODE_DIALOG_SCRIPT).toContain(
      "sdlc-node-dialog-refresh",
    );
  });
});
