import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "./createInitialPromptSdlcWizardState";
import { readPromptSdlcWizardChainPriorOutput } from "./readPromptSdlcWizardChainPriorOutput";

describe("readPromptSdlcWizardChainPriorOutput", () => {
  it("returns prior module best output only for chain topology", () => {
    const wizard = {
      ...createInitialPromptSdlcWizardState("x"),
      selectedSplitTopology: "chain" as const,
      modules: [
        {
          moduleId: "m1",
          title: "One",
          prompt: "p1",
          status: "passed" as const,
          selectedRevisionRound: 0,
          statistics: {
            bestScore: 80,
            bestRound: 0,
            bestRunOutput: "output-one",
            rounds: [],
          },
        },
        {
          moduleId: "m2",
          title: "Two",
          prompt: "p2",
          status: "pending" as const,
          selectedRevisionRound: null,
          statistics: null,
        },
      ],
      currentModuleIndex: 1,
    };
    expect(readPromptSdlcWizardChainPriorOutput(wizard, 1)).toBe("output-one");
    expect(readPromptSdlcWizardChainPriorOutput(wizard, 0)).toBeNull();
  });

  it("returns null for parallel splits", () => {
    const wizard = {
      ...createInitialPromptSdlcWizardState("x"),
      selectedSplitTopology: "parallel" as const,
      modules: [],
      currentModuleIndex: 1,
    };
    expect(readPromptSdlcWizardChainPriorOutput(wizard, 1)).toBeNull();
  });
});
