import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import {
  advancePromptSdlcWizardLocal,
  beginPromptSdlcWizardEvaluate,
  beginPromptSdlcWizardModuleEvaluate,
} from "./advancePromptSdlcWizardLocal";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import {
  readPromptSdlcLocalCycle,
  savePromptSdlcLocalCycle,
} from "./promptSdlcLocalStore";
import * as writerReply from "./runPromptSdlcWriterReply";

describe("advancePromptSdlcWizardLocal", () => {
  const storeDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "prompt-optimizer-wizard-"),
  );
  const storePath = path.join(storeDir, "prompt-optimizer-cycles.json");

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("skips the step 1 gate when generalize has no variables or placeholders", async () => {
    vi.spyOn(writerReply, "runPromptSdlcWriterReply").mockResolvedValue({
      ok: true,
      text: JSON.stringify({
        templatedPrompt: "Answer only from the ticket text.",
        variables: [],
      }),
      tokens: 8,
    });

    const cycle = createPromptSdlcLocalCycle({
      goal: "Stay factual.",
      sourcePrompt: "Be helpful.",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      workingDirectory: storeDir,
      wizard: createInitialPromptSdlcWizardState("Be helpful."),
    });

    const next = await advancePromptSdlcWizardLocal(cycle);

    expect(next.status).toBe("judging");
    expect(next.wizard?.phase).toBe("evaluate");
    expect(next.wizard?.gate).toBeNull();
    expect(next.revisions[0]?.promptText).toBe(
      "Answer only from the ticket text.",
    );
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

  it("splits the templated prompt and restores placeholders in module text", async () => {
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
                    title: "Apply",
                    prompt: "Edit Comparison.tsx in src/components only.",
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
          templatedPrompt: "Edit {{targetFile}} under {{searchDir}}.",
          variables: [
            {
              name: "targetFile",
              description: "file",
              sampleValue: "Comparison.tsx",
            },
            {
              name: "searchDir",
              description: "dir",
              sampleValue: "src/components",
            },
          ],
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
    expect(capturedPrompt).toContain("Edit {{targetFile}} under {{searchDir}}");
    expect(capturedPrompt).toContain("Improved prompt from evaluate");
    expect(capturedPrompt).toContain("do not paste sample values");
    expect(next.wizard?.gate).toBe("optimize_modules");
    expect(next.wizard?.phase).toBe("optimize_modules");
    expect(next.wizard?.modules[0]?.prompt).toContain("{{targetFile}}");
    expect(next.wizard?.modules[0]?.prompt).not.toContain("Comparison.tsx");
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

  it("stays failed when module judge returns no score instead of an empty step 4 gate", async () => {
    vi.spyOn(writerReply, "runPromptSdlcWriterReply").mockImplementation(
      async (input) => {
        if (input.prompt.includes("Score the changes from 0 to 100")) {
          return { ok: true, text: "Thanks, looks good.", tokens: 3 };
        }
        return { ok: true, text: "runner output", tokens: 2 };
      },
    );

    const paused = createPromptSdlcLocalCycle({
      goal: "Ship a refactor prompt.",
      sourcePrompt: "Refactor ProfileCard.",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      runnerModel: "claude-cli",
      workingDirectory: storeDir,
      wizard: {
        ...createInitialPromptSdlcWizardState("Refactor ProfileCard."),
        phase: "optimize_modules",
        gate: "optimize_modules",
        templatedPrompt: "Do {{task}}",
        variables: [
          { name: "task", description: "t", sampleValue: "refactor" },
        ],
        modules: [
          {
            moduleId: "m1",
            title: "Main",
            prompt: "Do {{task}}",
            status: "pending",
            selectedRevisionRound: null,
          },
        ],
        currentModuleIndex: 0,
      },
    });
    const evaluating = beginPromptSdlcWizardModuleEvaluate(
      {
        ...paused,
        status: "wizard_paused",
        wizard: { ...paused.wizard!, gate: null },
      },
      0,
    );

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

  it("stores the writer reply when separate JSON parsing fails", async () => {
    const broken = '{"options":[{"id":"opt-1","title":"x","prompt":"unclosed';
    vi.spyOn(writerReply, "runPromptSdlcWriterReply").mockResolvedValue({
      ok: true,
      text: broken,
      tokens: 10,
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
          templatedPrompt: "Do {{task}}",
          variables: [{ name: "task", description: "d", sampleValue: "s" }],
        },
      }),
      revisions: [
        { roundNumber: 0, promptText: "evaluated prompt", judgement: null },
      ],
    };

    const next = await advancePromptSdlcWizardLocal(cycle);
    expect(next.status).toBe("wizard_paused");
    expect(next.wizard?.gate).toBe("separate");
    expect(next.wizard?.lastWriterParseFailureReply).toBe(broken);
    expect(next.errorMessage).toMatch(/JSON/i);
  });

  it("fails the cycle when generalize/separate writer times out", async () => {
    vi.spyOn(writerReply, "runPromptSdlcWriterReply").mockResolvedValue({
      ok: false,
      errorMessage: "The writer timed out after 180000ms.",
      errorKind: "writer_timeout",
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
    expect(next.status).toBe("failed");
    expect(next.errorKind).toBe("writer_timeout");
    expect(next.errorMessage).toContain("timed out after");
  });

  it("fails the cycle when generalize/separate hits usage_limit (not wizard_paused)", async () => {
    vi.spyOn(writerReply, "runPromptSdlcWriterReply").mockResolvedValue({
      ok: false,
      errorMessage:
        "Error: You've hit your monthly usage limit for Cursor agent.",
      errorKind: "usage_limit",
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
    expect(next.status).toBe("failed");
    expect(next.errorKind).toBe("usage_limit");
    expect(next.wizard?.gate).toBeNull();
  });
});
