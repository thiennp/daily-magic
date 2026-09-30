import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { renderPromptSdlcWizardModuleParameters } from "./renderPromptSdlcWizardModuleParameters";

describe("renderPromptSdlcWizardModuleParameters", () => {
  it("shows skip reason when chain prior module was skipped", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      workingDirectory: "/tmp",
      wizard: {
        ...createInitialPromptSdlcWizardState("Run {{x}}"),
        gate: "optimize_modules",
        phase: "optimize_modules",
        selectedSplitTopology: "chain",
        variables: [{ name: "x", description: "d", sampleValue: "hello" }],
        parameterValues: { x: "hello" },
        modules: [
          {
            moduleId: "m1",
            title: "One",
            prompt: "p1",
            status: "stopped",
            selectedRevisionRound: null,
            statistics: null,
          },
          {
            moduleId: "m2",
            title: "Two",
            prompt: "Run {{x}}",
            status: "pending",
            selectedRevisionRound: null,
            statistics: null,
          },
        ],
        currentModuleIndex: 1,
      },
    });
    const html = renderPromptSdlcWizardModuleParameters({
      cycle,
      modulePrompt: "Run {{x}}",
    });
    expect(html).toContain("Prior module was skipped");
  });
});
