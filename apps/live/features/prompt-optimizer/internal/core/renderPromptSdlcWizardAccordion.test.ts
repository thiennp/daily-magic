import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { renderPromptSdlcWizardAccordion } from "./renderPromptSdlcWizardAccordion";

describe("renderPromptSdlcWizardAccordion", () => {
  it("collapses completed steps and keeps the active gate expanded below", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        workingDirectory: "/tmp",
        wizard: {
          ...createInitialPromptSdlcWizardState("p"),
          gate: "evaluate",
          phase: "evaluate",
          templatedPrompt: "Hello {{name}}",
          variables: [
            {
              name: "name",
              description: "d",
              sampleValue: "Ada",
            },
          ],
        },
      }),
      status: "wizard_paused" as const,
    };
    const html = renderPromptSdlcWizardAccordion(cycle);
    expect(html).toContain("sdlc-wizard-accordion-item");
    expect(html).toContain("Step 1 — Generalize");
    expect(html).toContain("prompt-optimizer-wizard-active-step");
    expect(html).toContain("Step 2 — Evaluate");
    expect(html.indexOf("</details>")).toBeLessThan(
      html.indexOf("prompt-optimizer-wizard-active-step"),
    );
  });
});
