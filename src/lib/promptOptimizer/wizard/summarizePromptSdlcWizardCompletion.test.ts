import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "./createInitialPromptSdlcWizardState";
import { summarizePromptSdlcWizardCompletion } from "./summarizePromptSdlcWizardCompletion";

describe("summarizePromptSdlcWizardCompletion", () => {
  it("suggests passed only when every module passed at or above the wizard pass score", () => {
    const wizard = {
      ...createInitialPromptSdlcWizardState("x"),
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
            bestRunOutput: "out",
            rounds: [
              {
                roundNumber: 0,
                score: 80,
                passed: true,
                runOutput: "out",
                tokens: 12,
              },
            ],
          },
        },
        {
          moduleId: "m2",
          title: "Two",
          prompt: "p2",
          status: "stopped" as const,
          selectedRevisionRound: 0,
          statistics: {
            bestScore: 50,
            bestRound: 0,
            bestRunOutput: null,
            rounds: [
              {
                roundNumber: 0,
                score: 50,
                passed: false,
                runOutput: null,
                tokens: 8,
              },
            ],
          },
        },
      ],
    };
    const summary = summarizePromptSdlcWizardCompletion(wizard);
    expect(summary.passedModuleCount).toBe(1);
    expect(summary.totalModules).toBe(2);
    expect(summary.terminalStatusSuggestion).toBe("stopped");
    expect(summary.rows[0]?.tokens).toBe(12);
  });

  it("suggests passed when all modules passed", () => {
    const wizard = {
      ...createInitialPromptSdlcWizardState("x"),
      modules: [
        {
          moduleId: "m1",
          title: "One",
          prompt: "p1",
          status: "passed" as const,
          selectedRevisionRound: 0,
          statistics: {
            bestScore: 70,
            bestRound: 0,
            bestRunOutput: "out",
            rounds: [],
          },
        },
      ],
    };
    expect(
      summarizePromptSdlcWizardCompletion(wizard).terminalStatusSuggestion,
    ).toBe("passed");
  });
});
