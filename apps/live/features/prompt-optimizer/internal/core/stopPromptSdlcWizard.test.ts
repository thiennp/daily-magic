import { describe, expect, it } from "vitest";

import {
  createInitialPromptSdlcWizardState,
  PROMPT_SDLC_WIZARD_STOP_USER,
} from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import {
  skipPromptSdlcWizardCurrentModule,
  stopPromptSdlcWizardRun,
} from "./stopPromptSdlcWizard";

describe("stopPromptSdlcWizard", () => {
  const baseCycle = () =>
    createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      wizard: {
        ...createInitialPromptSdlcWizardState("p"),
        phase: "optimize_modules",
        gate: null,
        modules: [
          {
            moduleId: "m1",
            title: "Module A",
            prompt: "a",
            status: "running",
            selectedRevisionRound: null,
          },
          {
            moduleId: "m2",
            title: "Module B",
            prompt: "b",
            status: "pending",
            selectedRevisionRound: null,
          },
        ],
        currentModuleIndex: 0,
      },
      runnerModel: "codex",
    });

  it("stops the whole wizard run", () => {
    const next = stopPromptSdlcWizardRun({
      ...baseCycle(),
      status: "judging",
    });
    expect(next.status).toBe("stopped");
    expect(next.errorMessage).toBe(PROMPT_SDLC_WIZARD_STOP_USER);
    expect(next.wizard?.phase).toBe("complete");
  });

  it("skips the current module and pauses at the step gate", () => {
    const next = skipPromptSdlcWizardCurrentModule({
      ...baseCycle(),
      status: "judging",
    });
    expect(next.status).toBe("wizard_paused");
    expect(next.wizard?.gate).toBe("optimize_modules");
    expect(next.wizard?.modules[0]?.status).toBe("stopped");
    expect(next.wizard?.modules[1]?.status).toBe("pending");
  });
});
