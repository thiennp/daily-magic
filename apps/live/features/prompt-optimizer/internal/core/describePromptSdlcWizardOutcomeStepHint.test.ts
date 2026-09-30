import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { describePromptSdlcWizardOutcomeStepHint } from "./describePromptSdlcWizardOutcomeStepHint";

describe("describePromptSdlcWizardOutcomeStepHint step 4", () => {
  it("uses lowest score and token total instead of repeating all passed", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      wizard: {
        ...createInitialPromptSdlcWizardState("p"),
        gate: null,
        phase: "complete",
        modules: [
          {
            moduleId: "m1",
            title: "A",
            prompt: "p1",
            status: "passed",
            selectedRevisionRound: null,
            statistics: {
              bestScore: 82,
              bestRound: 0,
              bestRunOutput: "o",
              rounds: [
                {
                  roundNumber: 0,
                  score: 82,
                  passed: true,
                  runOutput: "o",
                  tokens: 240,
                },
              ],
            },
          },
          {
            moduleId: "m2",
            title: "B",
            prompt: "p2",
            status: "passed",
            selectedRevisionRound: null,
            statistics: {
              bestScore: 78,
              bestRound: 0,
              bestRunOutput: "o2",
              rounds: [
                {
                  roundNumber: 0,
                  score: 78,
                  passed: true,
                  runOutput: "o2",
                  tokens: 190,
                },
              ],
            },
          },
        ],
      },
    });
    const hint = describePromptSdlcWizardOutcomeStepHint(cycle, "wizard-4");
    expect(hint).toContain("Lowest: B (78)");
    expect(hint).toContain("430");
    expect(hint).not.toContain("all passed");
  });
});
