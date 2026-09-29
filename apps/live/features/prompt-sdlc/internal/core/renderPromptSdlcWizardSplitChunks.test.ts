import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { renderPromptSdlcWizardGate } from "./renderPromptSdlcWizardGate";

describe("renderPromptSdlcWizardGate separate chunks", () => {
  it("lists module prompts under each split option", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        workingDirectory: "/tmp",
        wizard: {
          ...createInitialPromptSdlcWizardState("p"),
          gate: "separate",
          phase: "separate",
          splitOptions: [
            {
              id: "a",
              title: "Two-part",
              summary: "split",
              topology: "chain",
              recommended: true,
              modules: [
                {
                  id: "m1",
                  title: "First chunk",
                  prompt: "Do {{x}} first",
                  order: 0,
                },
                {
                  id: "m2",
                  title: "Second chunk",
                  prompt: "Then {{y}}",
                  order: 1,
                },
              ],
            },
          ],
        },
      }),
      status: "wizard_paused" as const,
    };

    const html = renderPromptSdlcWizardGate(cycle);
    expect(html).toContain("First chunk");
    expect(html).toContain("Do {{x}} first");
    expect(html).toContain("Second chunk");
    expect(html).toContain("sdlc-wizard-chunks");
  });
});
