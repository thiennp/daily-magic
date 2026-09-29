import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { findResumablePromptSdlcWizardCycle } from "./findResumablePromptSdlcWizardCycle";

describe("findResumablePromptSdlcWizardCycle", () => {
  it("returns a paused wizard not equal to the open cycle", () => {
    const paused = {
      ...createPromptSdlcLocalCycle({
        goal: "Resume me",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        wizard: {
          ...createInitialPromptSdlcWizardState("p"),
          gate: "evaluate",
          phase: "evaluate",
        },
      }),
      status: "wizard_paused" as const,
    };
    const open = createPromptSdlcLocalCycle({
      goal: "other",
      sourcePrompt: "p",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
    });
    expect(
      findResumablePromptSdlcWizardCycle([open, paused], open.id)?.id,
    ).toBe(paused.id);
    expect(findResumablePromptSdlcWizardCycle([paused], paused.id)).toBeNull();
  });
});
