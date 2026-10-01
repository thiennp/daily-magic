import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { autoContinuePromptSdlcWizardSeparateGateIfNeeded } from "./autoContinuePromptSdlcWizardSeparateGateIfNeeded";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";

describe("autoContinuePromptSdlcWizardSeparateGateIfNeeded", () => {
  it("moves to optimize_modules when separate returned one module", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      workingDirectory: "/tmp",
      wizard: {
        ...createInitialPromptSdlcWizardState("p"),
        phase: "separate",
        gate: "separate",
        splitOptions: [
          {
            id: "only",
            title: "Single",
            summary: "x",
            topology: "parallel",
            recommended: true,
            modules: [{ id: "m1", title: "Main", prompt: "Do it", order: 0 }],
          },
        ],
      },
    });
    const paused = { ...cycle, status: "wizard_paused" as const };
    const next = autoContinuePromptSdlcWizardSeparateGateIfNeeded(paused);
    expect(next.wizard?.gate).toBe("optimize_modules");
    expect(next.wizard?.modules).toHaveLength(1);
  });
});
