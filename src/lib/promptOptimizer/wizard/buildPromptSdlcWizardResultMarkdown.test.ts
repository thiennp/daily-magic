import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "./createInitialPromptSdlcWizardState";
import { buildPromptSdlcWizardResultMarkdown } from "./buildPromptSdlcWizardResultMarkdown";

describe("buildPromptSdlcWizardResultMarkdown", () => {
  it("includes module table and best run output", () => {
    const wizard = createInitialPromptSdlcWizardState("Do {{task}}");
    const withModule = {
      ...wizard,
      templatedPrompt: "Do {{task}}",
      modules: [
        {
          moduleId: "m1",
          title: "Plan",
          prompt: "Plan {{task}}",
          status: "passed" as const,
          selectedRevisionRound: null,
          statistics: {
            bestScore: 80,
            bestRound: 0,
            bestRunOutput: "planned output",
            rounds: [
              {
                roundNumber: 0,
                score: 80,
                passed: true,
                runOutput: "planned output",
                tokens: 120,
              },
            ],
          },
        },
      ],
    };
    const md = buildPromptSdlcWizardResultMarkdown({
      goal: "Ship docs",
      cycleStatus: "stopped",
      wizard: withModule,
    });
    expect(md).toContain("Modules passed:");
    expect(md).toContain("| Plan | 80 | 120 | passed |");
    expect(md).toContain("planned output");
  });

  it("DF-035 (c): a failed run never lists a module as running", () => {
    const wizard = createInitialPromptSdlcWizardState("Do {{task}}");
    const md = buildPromptSdlcWizardResultMarkdown({
      goal: "Draft reply",
      cycleStatus: "failed",
      wizard: {
        ...wizard,
        modules: [
          {
            moduleId: "m1",
            title: "Draft Reply",
            prompt: "x",
            status: "running" as const,
            selectedRevisionRound: null,
            statistics: null,
          },
          {
            moduleId: "m2",
            title: "Polish",
            prompt: "y",
            status: "pending" as const,
            selectedRevisionRound: null,
            statistics: null,
          },
        ],
      },
    });
    expect(md).not.toContain("| running |");
    expect(md).toContain("| Draft Reply | — | — | failed |");
    expect(md).toContain("| Polish | — | — | not run |");
  });
});
