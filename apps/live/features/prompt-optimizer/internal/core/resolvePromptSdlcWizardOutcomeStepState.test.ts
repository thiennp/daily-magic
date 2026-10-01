import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { resolvePromptSdlcWizardOutcomeStepState } from "./resolvePromptSdlcWizardOutcomeStepState";

describe("resolvePromptSdlcWizardOutcomeStepState", () => {
  it("marks steps before a failed evaluate as done and the active step as failed", () => {
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
          templatedPrompt: "Hello {{x}}",
        },
      }),
      status: "failed" as const,
    };

    expect(resolvePromptSdlcWizardOutcomeStepState(cycle, "wizard-1")).toBe(
      "done",
    );
    expect(resolvePromptSdlcWizardOutcomeStepState(cycle, "wizard-2")).toBe(
      "failed",
    );
    expect(resolvePromptSdlcWizardOutcomeStepState(cycle, "wizard-3")).toBe(
      "pending",
    );
  });

  it("marks every listed step done when the wizard phase is complete", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        wizard: {
          ...createInitialPromptSdlcWizardState("p"),
          phase: "complete",
          gate: null,
        },
      }),
      status: "passed" as const,
    };

    expect(resolvePromptSdlcWizardOutcomeStepState(cycle, "wizard-1")).toBe(
      "done",
    );
    expect(resolvePromptSdlcWizardOutcomeStepState(cycle, "wizard-3")).toBe(
      "done",
    );
  });
});
