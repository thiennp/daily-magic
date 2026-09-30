import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import {
  isPromptSdlcWizardStepReached,
  readPromptSdlcWizardStepDispatchedPrompt,
} from "./readPromptSdlcWizardStepDispatchedPrompt";

describe("readPromptSdlcWizardStepDispatchedPrompt", () => {
  it("returns generalize writer prompt for step 1", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "Ship faster",
      sourcePrompt: "Refactor ProfileCard",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      wizard: {
        ...createInitialPromptSdlcWizardState("Refactor ProfileCard"),
        phase: "generalize",
        gate: null,
      },
    });
    const prompt = readPromptSdlcWizardStepDispatchedPrompt(cycle, "wizard-1");
    expect(prompt).toContain("Generalize the prompt below");
    expect(prompt).toContain("Refactor ProfileCard");
  });

  it("returns evaluate judge prompt when step 2 failed on judge", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "codex",
        improverModel: "codex",
        wizard: {
          ...createInitialPromptSdlcWizardState("p"),
          phase: "evaluate",
          gate: null,
          templatedPrompt: "Hello {{name}}",
        },
      }),
      status: "failed" as const,
      errorMessage: "The judge reply needs a score and a reason.",
      revisions: [
        {
          roundNumber: 0,
          promptText: "Hello world",
          judgement: {
            score: null,
            passed: null,
            reasons: null,
            rawReply: "nope",
            tokens: null,
          },
        },
      ],
    };
    const prompt = readPromptSdlcWizardStepDispatchedPrompt(cycle, "wizard-2");
    expect(prompt).toContain("wizard step 2 (evaluate revisions)");
    expect(prompt).toContain("Hello world");
  });

  it("does not return a prompt for steps not yet reached", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "codex",
        improverModel: "codex",
        wizard: {
          ...createInitialPromptSdlcWizardState("p"),
          phase: "evaluate",
          gate: null,
          templatedPrompt: "Hello",
        },
      }),
      status: "failed" as const,
      revisions: [
        {
          roundNumber: 0,
          promptText: "p",
          judgement: {
            score: null,
            passed: null,
            reasons: null,
            rawReply: "nope",
            tokens: null,
          },
        },
      ],
    };
    expect(isPromptSdlcWizardStepReached(cycle, "wizard-3")).toBe(false);
    expect(readPromptSdlcWizardStepDispatchedPrompt(cycle, "wizard-3")).toBe(
      null,
    );
  });
});
