import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { describePromptSdlcWizardOutcomeStepHint } from "./describePromptSdlcWizardOutcomeStepHint";
import { renderPromptSdlcWizardStepModalBody } from "./renderPromptSdlcWizardStepModalBody";

describe("wizard outcome step bodies align with hints", () => {
  it("shows evaluate finished copy when wizard is complete without attempt snapshots", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "Dogfood wizard UX",
      sourcePrompt: "Weak prompt",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      wizard: {
        ...createInitialPromptSdlcWizardState("Verify {{feature}} on Live"),
        gate: null,
        phase: "complete",
        templatedPrompt: "Verify {{feature}} on Live",
        modules: [
          {
            moduleId: "m1",
            title: "Generalize checklist",
            prompt: "Check {{feature}}",
            status: "passed",
            selectedRevisionRound: null,
            statistics: {
              bestScore: 82,
              bestRound: 0,
              bestRunOutput: "out",
              rounds: [
                {
                  roundNumber: 0,
                  score: 82,
                  passed: true,
                  runOutput: "out",
                  tokens: 1,
                },
              ],
            },
          },
        ],
      },
    });
    const body = renderPromptSdlcWizardStepModalBody(cycle, "wizard-2");
    const hint = describePromptSdlcWizardOutcomeStepHint(cycle, "wizard-2");
    expect(hint).toContain("Evaluate finished");
    expect(body).toContain("Evaluate finished");
    expect(body).not.toContain("Evaluate has not run yet");
  });

  it("lists modules in separate body when split options are empty but modules exist", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      wizard: {
        ...createInitialPromptSdlcWizardState("p"),
        gate: null,
        phase: "complete",
        splitOptions: [],
        modules: [
          {
            moduleId: "m1",
            title: "Main",
            prompt: "p",
            status: "passed",
            selectedRevisionRound: null,
            statistics: {
              bestScore: 80,
              bestRound: 0,
              bestRunOutput: "out",
              rounds: [],
            },
          },
          {
            moduleId: "m2",
            title: "Follow-up",
            prompt: "p2",
            status: "passed",
            selectedRevisionRound: null,
            statistics: {
              bestScore: 75,
              bestRound: 0,
              bestRunOutput: "out2",
              rounds: [],
            },
          },
        ],
      },
    });
    const body = renderPromptSdlcWizardStepModalBody(cycle, "wizard-3");
    const hint = describePromptSdlcWizardOutcomeStepHint(cycle, "wizard-3");
    expect(hint).toBe("2 modules defined");
    expect(body).toContain("Separate finished");
    expect(body).toContain("Main");
    expect(body).toContain("Follow-up");
    expect(body).not.toContain("No split options yet");
  });
});
