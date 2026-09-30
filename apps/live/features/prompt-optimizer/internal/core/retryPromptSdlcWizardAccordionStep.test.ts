import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import {
  canRetryPromptSdlcWizardAccordionStep,
  retryPromptSdlcWizardAccordionStep,
} from "./retryPromptSdlcWizardAccordionStep";

describe("retryPromptSdlcWizardAccordionStep", () => {
  it("clears downstream wizard state when retrying evaluate", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "source",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        wizard: {
          ...createInitialPromptSdlcWizardState("source"),
          gate: "separate",
          phase: "separate",
          templatedPrompt: "Hello",
          evaluateSelectedRound: 0,
          splitOptions: [
            {
              id: "opt",
              title: "Split",
              summary: "s",
              topology: "chain",
              recommended: true,
              modules: [{ id: "m1", title: "M", prompt: "p", order: 0 }],
            },
          ],
          modules: [],
        },
      }),
      status: "wizard_paused" as const,
      revisions: [
        {
          roundNumber: 0,
          promptText: "scored",
          judgement: { score: 80, passed: true, reasons: "ok", rawReply: "{}" },
        },
      ],
    };
    expect(canRetryPromptSdlcWizardAccordionStep(cycle, "wizard-2")).toBe(true);
    const next = retryPromptSdlcWizardAccordionStep(cycle, "wizard-2");
    expect(next.wizard?.gate).toBe("evaluate");
    expect(next.wizard?.phase).toBe("evaluate");
    expect(next.wizard?.splitOptions).toEqual([]);
    expect(next.revisions).toEqual([]);
    expect(next.status).toBe("wizard_paused");
  });

  it("allows retry on a finished wizard from accordion", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "source",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        wizard: {
          ...createInitialPromptSdlcWizardState("source"),
          gate: null,
          phase: "complete",
          modules: [
            {
              moduleId: "m1",
              title: "M",
              prompt: "p",
              status: "stopped",
              selectedRevisionRound: null,
            },
          ],
        },
      }),
      status: "stopped" as const,
    };
    expect(canRetryPromptSdlcWizardAccordionStep(cycle, "wizard-2")).toBe(true);
    const next = retryPromptSdlcWizardAccordionStep(cycle, "wizard-2");
    expect(next.status).toBe("wizard_paused");
    expect(next.wizard?.phase).toBe("evaluate");
    expect(next.wizard?.modules).toEqual([]);
  });
});
