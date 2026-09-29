import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import {
  advancePromptSdlcWizardLocal,
  beginPromptSdlcWizardEvaluate,
} from "./advancePromptSdlcWizardLocal";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import {
  readPromptSdlcLocalCycle,
  savePromptSdlcLocalCycle,
} from "./promptSdlcLocalStore";
import * as writerReply from "./runPromptSdlcWriterReply";

describe("advancePromptSdlcWizardLocal", () => {
  const storeDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "prompt-sdlc-wizard-"),
  );
  const storePath = path.join(storeDir, "prompt-sdlc-cycles.json");

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("generalizes then pauses at the step 1 gate", async () => {
    vi.spyOn(writerReply, "runPromptSdlcWriterReply").mockResolvedValue({
      ok: true,
      text: JSON.stringify({
        templatedPrompt: "Do {{task}}",
        variables: [
          { name: "task", description: "The task", sampleValue: "refactor X" },
        ],
      }),
      tokens: 10,
    });

    const cycle = createPromptSdlcLocalCycle({
      goal: "Ship a refactor prompt.",
      sourcePrompt: "Refactor ProfileCard to use Zustand.",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      workingDirectory: storeDir,
      wizard: createInitialPromptSdlcWizardState(
        "Refactor ProfileCard to use Zustand.",
      ),
    });
    savePromptSdlcLocalCycle(storePath, cycle);

    const next = await advancePromptSdlcWizardLocal(cycle);
    savePromptSdlcLocalCycle(storePath, next);

    expect(next.status).toBe("wizard_paused");
    expect(next.wizard?.gate).toBe("generalize");
    expect(next.wizard?.templatedPrompt).toBe("Do {{task}}");
    expect(readPromptSdlcLocalCycle(storePath, cycle.id)?.wizard?.gate).toBe(
      "generalize",
    );
  });

  it("starts evaluate with concrete prompt after step 1 continue", () => {
    const paused = createPromptSdlcLocalCycle({
      goal: "Ship a refactor prompt.",
      sourcePrompt: "ignored",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      workingDirectory: storeDir,
      wizard: {
        ...createInitialPromptSdlcWizardState("Refactor ProfileCard."),
        gate: "generalize",
        templatedPrompt: "Do {{task}}",
        variables: [
          {
            name: "task",
            description: "t",
            sampleValue: "refactor ProfileCard",
          },
        ],
      },
    });
    const evaluating = beginPromptSdlcWizardEvaluate({
      ...paused,
      status: "wizard_paused",
      wizard: { ...paused.wizard!, gate: null },
    });
    expect(evaluating.status).toBe("judging");
    expect(evaluating.wizard?.phase).toBe("evaluate");
    expect(evaluating.revisions[0]?.promptText).toBe("Do refactor ProfileCard");
    expect(evaluating.passScore).toBe(70);
    expect(evaluating.maxRounds).toBe(5);
    expect(evaluating.judgePromptTextOnly).toBe(true);
  });

  it("uses evaluated revision text when suggesting splits", async () => {
    let capturedPrompt = "";
    vi.spyOn(writerReply, "runPromptSdlcWriterReply").mockImplementation(
      async (input) => {
        capturedPrompt = input.prompt;
        return {
          ok: true,
          text: JSON.stringify({
            options: [
              {
                id: "opt-1",
                title: "One module",
                summary: "Keep as one",
                topology: "chain",
                recommended: true,
                modules: [
                  {
                    id: "m1",
                    title: "Main",
                    prompt: "Run task",
                    order: 0,
                  },
                ],
              },
            ],
          }),
          tokens: 5,
        };
      },
    );

    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "Goal",
        sourcePrompt: "Original template",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        workingDirectory: storeDir,
        wizard: {
          ...createInitialPromptSdlcWizardState("Original template"),
          phase: "separate",
          gate: null,
          templatedPrompt: "Original template",
          evaluateSelectedRound: 1,
          splitOptions: [],
        },
      }),
      revisions: [
        {
          roundNumber: 0,
          promptText: "Original template",
          judgement: {
            score: 50,
            passed: false,
            reasons: "",
            rawReply: "",
          },
        },
        {
          roundNumber: 1,
          promptText: "Improved prompt from evaluate",
          judgement: {
            score: 85,
            passed: true,
            reasons: "",
            rawReply: "",
          },
        },
      ],
    };

    const next = await advancePromptSdlcWizardLocal(cycle);
    expect(capturedPrompt).toContain("Improved prompt from evaluate");
    expect(capturedPrompt).not.toContain("Original template");
    expect(next.wizard?.gate).toBe("separate");
  });

  it("stays failed when evaluate judge returns no score instead of an empty step 2 gate", async () => {
    vi.spyOn(writerReply, "runPromptSdlcWriterReply").mockImplementation(
      async (input) => {
        if (input.prompt.includes("wizard step 2 (evaluate revisions)")) {
          return { ok: true, text: "Thanks, looks good.", tokens: 3 };
        }
        return { ok: true, text: "writer output", tokens: 2 };
      },
    );

    const paused = createPromptSdlcLocalCycle({
      goal: "Ship a refactor prompt.",
      sourcePrompt: "Refactor ProfileCard.",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      workingDirectory: storeDir,
      wizard: {
        ...createInitialPromptSdlcWizardState("Refactor ProfileCard."),
        gate: "generalize",
        templatedPrompt: "Do {{task}}",
        variables: [
          { name: "task", description: "t", sampleValue: "refactor" },
        ],
      },
    });
    const evaluating = beginPromptSdlcWizardEvaluate({
      ...paused,
      status: "wizard_paused",
      wizard: { ...paused.wizard!, gate: null },
    });

    const next = await advancePromptSdlcWizardLocal(evaluating);
    expect(next.status).toBe("failed");
    expect(next.wizard?.gate).toBeNull();
    expect(next.errorMessage).toContain("score");
  });

  it("pauses at the separate gate when the writer fails", async () => {
    vi.spyOn(writerReply, "runPromptSdlcWriterReply").mockResolvedValue({
      ok: false,
      errorMessage: "The writer did not reply.",
      stopped: false,
    });

    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "Goal",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        workingDirectory: storeDir,
        wizard: {
          ...createInitialPromptSdlcWizardState("p"),
          phase: "separate",
          gate: null,
          splitOptions: [],
        },
      }),
      revisions: [
        { roundNumber: 0, promptText: "evaluated prompt", judgement: null },
      ],
    };

    const next = await advancePromptSdlcWizardLocal(cycle);
    expect(next.status).toBe("wizard_paused");
    expect(next.wizard?.gate).toBe("separate");
    expect(next.errorMessage).toContain("writer");
  });
});
