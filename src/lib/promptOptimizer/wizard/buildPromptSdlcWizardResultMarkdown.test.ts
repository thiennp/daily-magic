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
});
