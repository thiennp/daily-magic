import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { autoContinuePromptSdlcWizardGeneralizeGateIfNeeded } from "./autoContinuePromptSdlcWizardGeneralizeGateIfNeeded";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";

describe("autoContinuePromptSdlcWizardGeneralizeGateIfNeeded", () => {
  const base = createPromptSdlcLocalCycle({
    goal: "Goal",
    sourcePrompt: "Source",
    judgeModel: "claude-cli",
    improverModel: "claude-cli",
    workingDirectory: "/tmp",
    wizard: {
      ...createInitialPromptSdlcWizardState("Source"),
      gate: "generalize",
      templatedPrompt: "Concrete prompt with no placeholders.",
      variables: [],
    },
  });

  it("starts evaluate when paused at skippable generalize gate", () => {
    const next = autoContinuePromptSdlcWizardGeneralizeGateIfNeeded({
      ...base,
      status: "wizard_paused",
    });
    expect(next.status).toBe("judging");
    expect(next.wizard?.phase).toBe("evaluate");
    expect(next.wizard?.gate).toBeNull();
  });

  it("leaves cycle unchanged when variables need review", () => {
    const paused = {
      ...base,
      status: "wizard_paused" as const,
      wizard: {
        ...base.wizard!,
        templatedPrompt: "Do {{task}}",
        variables: [
          { name: "task", description: "t", sampleValue: "refactor" },
        ],
      },
    };
    expect(autoContinuePromptSdlcWizardGeneralizeGateIfNeeded(paused)).toBe(
      paused,
    );
  });

  it("does not auto-continue after writer failure at generalize", () => {
    const paused = {
      ...base,
      status: "wizard_paused" as const,
      errorMessage: "Writer timed out.",
      wizard: {
        ...base.wizard!,
        templatedPrompt: "",
        variables: [],
      },
    };
    expect(autoContinuePromptSdlcWizardGeneralizeGateIfNeeded(paused)).toBe(
      paused,
    );
  });

  it("auto-continues when skippable output exists despite a stale error message", () => {
    const paused = {
      ...base,
      status: "wizard_paused" as const,
      errorMessage: "Old writer error from a prior attempt.",
    };
    const next = autoContinuePromptSdlcWizardGeneralizeGateIfNeeded(paused);
    expect(next.status).toBe("judging");
    expect(next.wizard?.phase).toBe("evaluate");
  });
});
