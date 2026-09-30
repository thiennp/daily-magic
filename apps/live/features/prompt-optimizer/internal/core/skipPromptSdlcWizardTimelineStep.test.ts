import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import {
  canShowPromptSdlcWizardTimelineSkip,
  readPromptSdlcWizardSkippableTimelineStepId,
  skipPromptSdlcWizardTimelineStep,
} from "./skipPromptSdlcWizardTimelineStep";

describe("skipPromptSdlcWizardTimelineStep", () => {
  it("shows skip only on the current wizard timeline step", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        wizard: {
          ...createInitialPromptSdlcWizardState("Do {{x}}"),
          gate: "generalize",
          templatedPrompt: "Do {{x}}",
          variables: [{ name: "x", description: "d", sampleValue: "v" }],
        },
      }),
      status: "wizard_paused" as const,
    };
    expect(readPromptSdlcWizardSkippableTimelineStepId(cycle)).toBe("wizard-1");
    expect(canShowPromptSdlcWizardTimelineSkip(cycle, "wizard-1")).toBe(true);
    expect(canShowPromptSdlcWizardTimelineSkip(cycle, "wizard-2")).toBe(false);
  });

  it("skips generalize into evaluate", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        wizard: {
          ...createInitialPromptSdlcWizardState("Do {{x}}"),
          gate: "generalize",
          templatedPrompt: "Do {{x}}",
          variables: [{ name: "x", description: "d", sampleValue: "hello" }],
        },
      }),
      status: "wizard_paused" as const,
    };
    const next = skipPromptSdlcWizardTimelineStep(cycle, "wizard-1");
    expect(next.wizard?.phase).toBe("evaluate");
    expect(next.status).toBe("judging");
    expect(next.wizard?.gate).toBeNull();
  });

  it("skips evaluate into separate without requiring a scored revision", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        wizard: {
          ...createInitialPromptSdlcWizardState("p"),
          phase: "evaluate",
          gate: "evaluate",
          templatedPrompt: "p",
          evaluateSelectedRound: 0,
        },
      }),
      status: "wizard_paused" as const,
      revisions: [{ roundNumber: 0, promptText: "p", judgement: null }],
    };
    const next = skipPromptSdlcWizardTimelineStep(cycle, "wizard-2");
    expect(next.wizard?.phase).toBe("separate");
    expect(next.status).toBe("judging");
  });

  it("skips separate into step 4 with a fallback split when options are empty", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "Do {{x}}",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        wizard: {
          ...createInitialPromptSdlcWizardState("Do {{x}}"),
          phase: "separate",
          gate: "separate",
          templatedPrompt: "Do {{x}}",
          splitOptions: [],
        },
      }),
      status: "wizard_paused" as const,
    };
    const next = skipPromptSdlcWizardTimelineStep(cycle, "wizard-3");
    expect(next.wizard?.phase).toBe("optimize_modules");
    expect(next.wizard?.gate).toBe("optimize_modules");
    expect(next.wizard?.modules.length).toBe(1);
    expect(next.status).toBe("wizard_paused");
  });

  it("skips step 4 by completing the wizard", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        runnerModel: "codex",
        wizard: {
          ...createInitialPromptSdlcWizardState("p"),
          phase: "optimize_modules",
          gate: null,
          modules: [
            {
              moduleId: "m1",
              title: "A",
              prompt: "a",
              status: "running",
              selectedRevisionRound: null,
            },
          ],
          currentModuleIndex: 0,
        },
      }),
      status: "judging" as const,
    };
    const next = skipPromptSdlcWizardTimelineStep(cycle, "wizard-4");
    expect(next.wizard?.phase).toBe("complete");
    expect(next.wizard?.modules[0]?.status).toBe("stopped");
    expect(next.status).toBe("stopped");
  });
});
