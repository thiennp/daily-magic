import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { tryAcceptPromptSdlcWizardPost } from "./acceptPromptSdlcWizardPost";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import {
  readPromptSdlcLocalCycle,
  savePromptSdlcLocalCycle,
} from "./promptSdlcLocalStore";

describe("tryAcceptPromptSdlcWizardPost", () => {
  it("continues from generalize into evaluate phase", () => {
    const storeDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "prompt-sdlc-post-"),
    );
    const storePath = path.join(storeDir, "prompt-optimizer-cycles.json");
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        workingDirectory: storeDir,
        wizard: {
          ...createInitialPromptSdlcWizardState("Do {{x}}"),
          gate: "generalize",
          templatedPrompt: "Do {{x}}",
          variables: [{ name: "x", description: "d", sampleValue: "hello" }],
        },
      }),
      status: "wizard_paused" as const,
    };
    savePromptSdlcLocalCycle(storePath, cycle);

    let location = "";
    const handled = tryAcceptPromptSdlcWizardPost({
      posted: new URLSearchParams({
        intent: "wizard-continue",
        cycleId: cycle.id,
      }),
      storePath,
      response: {
        writeHead: (_code: number, headers: Record<string, string>) => {
          location = headers.Location ?? "";
        },
        end: () => undefined,
      },
    });

    expect(handled).toBe(true);
    expect(location).toContain(cycle.id);
    const saved = readPromptSdlcLocalCycle(storePath, cycle.id);
    expect(saved?.wizard?.phase).toBe("evaluate");
    expect(saved?.status).toBe("judging");
    expect(saved?.revisions[0]?.promptText).toBe("Do hello");
  });

  it("retries generalize when Continue is used after a writer failure", () => {
    const storeDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "prompt-sdlc-post-retry-"),
    );
    const storePath = path.join(storeDir, "prompt-optimizer-cycles.json");
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "original only",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        workingDirectory: storeDir,
        wizard: {
          ...createInitialPromptSdlcWizardState("original only"),
          gate: "generalize",
          phase: "generalize",
        },
      }),
      status: "wizard_paused" as const,
      errorMessage: "The writer did not reply.",
    };
    savePromptSdlcLocalCycle(storePath, cycle);

    tryAcceptPromptSdlcWizardPost({
      posted: new URLSearchParams({
        intent: "wizard-continue",
        cycleId: cycle.id,
      }),
      storePath,
      response: {
        writeHead: () => undefined,
        end: () => undefined,
      },
    });

    const saved = readPromptSdlcLocalCycle(storePath, cycle.id);
    expect(saved?.status).toBe("judging");
    expect(saved?.errorMessage).toBeNull();
    expect(saved?.wizard?.phase).toBe("generalize");
    expect(saved?.wizard?.gate).toBeNull();
    expect(saved?.revisions[0]?.promptText).toBe("original only");
  });

  it("continues from evaluate with selected revision into separate handoff", () => {
    const storeDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "prompt-sdlc-post-eval-"),
    );
    const storePath = path.join(storeDir, "prompt-optimizer-cycles.json");
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        workingDirectory: storeDir,
        wizard: {
          ...createInitialPromptSdlcWizardState("template only"),
          gate: "evaluate",
          phase: "evaluate",
          evaluateSelectedRound: 0,
        },
      }),
      status: "wizard_paused" as const,
      revisions: [
        {
          roundNumber: 0,
          promptText: "v0",
          judgement: {
            score: 40,
            passed: false,
            reasons: "",
            rawReply: "",
          },
        },
        {
          roundNumber: 1,
          promptText: "v1 chosen",
          judgement: {
            score: 90,
            passed: true,
            reasons: "",
            rawReply: "",
          },
        },
      ],
    };
    savePromptSdlcLocalCycle(storePath, cycle);

    tryAcceptPromptSdlcWizardPost({
      posted: new URLSearchParams({
        intent: "wizard-continue",
        cycleId: cycle.id,
        wizardRevisionRound: "1",
      }),
      storePath,
      response: {
        writeHead: () => undefined,
        end: () => undefined,
      },
    });

    const saved = readPromptSdlcLocalCycle(storePath, cycle.id);
    expect(saved?.wizard?.phase).toBe("separate");
    expect(saved?.wizard?.templatedPrompt).toBe("template only");
    expect(saved?.wizard?.evaluateSelectedRound).toBe(1);
  });

  it("blocks evaluate continue when the selected revision scored 0", () => {
    const storeDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "prompt-sdlc-post-eval-zero-"),
    );
    const storePath = path.join(storeDir, "prompt-optimizer-cycles.json");
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        workingDirectory: storeDir,
        wizard: {
          ...createInitialPromptSdlcWizardState("template only"),
          gate: "evaluate",
          phase: "evaluate",
          evaluateSelectedRound: 0,
        },
      }),
      status: "wizard_paused" as const,
      revisions: [
        {
          roundNumber: 0,
          promptText: "v0",
          judgement: {
            score: 0,
            passed: false,
            reasons: "No changes",
            rawReply: "",
          },
        },
      ],
    };
    savePromptSdlcLocalCycle(storePath, cycle);

    tryAcceptPromptSdlcWizardPost({
      posted: new URLSearchParams({
        intent: "wizard-continue",
        cycleId: cycle.id,
        wizardRevisionRound: "0",
      }),
      storePath,
      response: {
        writeHead: () => undefined,
        end: () => undefined,
      },
    });

    const saved = readPromptSdlcLocalCycle(storePath, cycle.id);
    expect(saved?.wizard?.gate).toBe("evaluate");
    expect(saved?.errorMessage).toContain("scored above 0");
  });

  it("continues from separate into step 4 gate with modules pending", () => {
    const storeDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "prompt-sdlc-post-separate-"),
    );
    const storePath = path.join(storeDir, "prompt-optimizer-cycles.json");
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        workingDirectory: storeDir,
        wizard: {
          ...createInitialPromptSdlcWizardState("Do {{x}}"),
          gate: "separate",
          phase: "separate",
          variables: [{ name: "x", description: "d", sampleValue: "hello" }],
          parameterValues: { x: "hello" },
          splitOptions: [
            {
              id: "opt-a",
              title: "One module",
              summary: "s",
              topology: "chain",
              recommended: true,
              modules: [
                {
                  id: "m1",
                  title: "Main",
                  prompt: "Run {{x}}",
                  order: 0,
                },
              ],
            },
          ],
        },
      }),
      status: "wizard_paused" as const,
    };
    savePromptSdlcLocalCycle(storePath, cycle);

    tryAcceptPromptSdlcWizardPost({
      posted: new URLSearchParams({
        intent: "wizard-continue",
        cycleId: cycle.id,
        wizardSplitOptionId: "opt-a",
      }),
      storePath,
      response: {
        writeHead: () => undefined,
        end: () => undefined,
      },
    });

    const saved = readPromptSdlcLocalCycle(storePath, cycle.id);
    expect(saved?.wizard?.gate).toBe("optimize_modules");
    expect(saved?.status).toBe("wizard_paused");
    expect(saved?.wizard?.modules[0]?.status).toBe("pending");
    expect(saved?.wizard?.modules[0]?.prompt).toBe("Run {{x}}");
  });

  it("starts module evaluate from step 4 gate when parameters are posted", () => {
    const storeDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "prompt-sdlc-post-step4-"),
    );
    const storePath = path.join(storeDir, "prompt-optimizer-cycles.json");
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        workingDirectory: storeDir,
        wizard: {
          ...createInitialPromptSdlcWizardState("Do {{x}}"),
          gate: "optimize_modules",
          phase: "optimize_modules",
          variables: [{ name: "x", description: "d", sampleValue: "hello" }],
          parameterValues: { x: "hello" },
          modules: [
            {
              moduleId: "m1",
              title: "Main",
              prompt: "Run {{x}}",
              status: "pending",
              selectedRevisionRound: null,
            },
          ],
          currentModuleIndex: 0,
        },
      }),
      status: "wizard_paused" as const,
    };
    savePromptSdlcLocalCycle(storePath, cycle);

    tryAcceptPromptSdlcWizardPost({
      posted: new URLSearchParams({
        intent: "wizard-continue",
        cycleId: cycle.id,
        wizardParam_x: "custom",
      }),
      storePath,
      response: {
        writeHead: () => undefined,
        end: () => undefined,
      },
    });

    const saved = readPromptSdlcLocalCycle(storePath, cycle.id);
    expect(saved?.status).toBe("judging");
    expect(saved?.wizard?.gate).toBeNull();
    expect(saved?.revisions[0]?.promptText).toBe("Run custom");
  });

  it("returns a live HTML fragment instead of redirecting when liveFragment is set", () => {
    const storeDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "prompt-sdlc-live-"),
    );
    const storePath = path.join(storeDir, "prompt-optimizer-cycles.json");
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        workingDirectory: storeDir,
        wizard: {
          ...createInitialPromptSdlcWizardState("Do {{x}}"),
          gate: "generalize",
          templatedPrompt: "Do {{x}}",
          variables: [{ name: "x", description: "d", sampleValue: "hello" }],
        },
      }),
      status: "wizard_paused" as const,
    };
    savePromptSdlcLocalCycle(storePath, cycle);

    let status = 0;
    let body = "";
    tryAcceptPromptSdlcWizardPost({
      posted: new URLSearchParams({
        intent: "wizard-continue",
        cycleId: cycle.id,
        liveFragment: "1",
      }),
      storePath,
      response: {
        writeHead: (code: number) => {
          status = code;
        },
        end: (chunk?: string) => {
          body = chunk ?? "";
        },
      },
    });

    expect(status).toBe(200);
    expect(body).toContain("prompt-optimizer-wizard-gate-slot");
    expect(body).toContain("prompt-optimizer-run");
  });

  it("marks the wizard stopped when the last module does not all pass", () => {
    const storeDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "prompt-sdlc-post-complete-"),
    );
    const storePath = path.join(storeDir, "prompt-optimizer-cycles.json");
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        workingDirectory: storeDir,
        wizard: {
          ...createInitialPromptSdlcWizardState("Do {{x}}"),
          gate: "optimize_modules",
          phase: "optimize_modules",
          variables: [{ name: "x", description: "d", sampleValue: "hello" }],
          parameterValues: { x: "hello" },
          modules: [
            {
              moduleId: "m1",
              title: "Main",
              prompt: "Run {{x}}",
              status: "passed",
              selectedRevisionRound: 0,
              statistics: {
                bestScore: 80,
                bestRound: 0,
                bestRunOutput: "ok",
                rounds: [],
              },
            },
            {
              moduleId: "m2",
              title: "Tail",
              prompt: "Run {{x}} again",
              status: "stopped",
              selectedRevisionRound: 0,
              statistics: {
                bestScore: 40,
                bestRound: 0,
                bestRunOutput: null,
                rounds: [],
              },
            },
          ],
          currentModuleIndex: 1,
        },
      }),
      status: "wizard_paused" as const,
    };
    savePromptSdlcLocalCycle(storePath, cycle);

    tryAcceptPromptSdlcWizardPost({
      posted: new URLSearchParams({
        intent: "wizard-continue",
        cycleId: cycle.id,
        wizardParam_x: "hello",
      }),
      storePath,
      response: {
        writeHead: () => undefined,
        end: () => undefined,
      },
    });

    const saved = readPromptSdlcLocalCycle(storePath, cycle.id);
    expect(saved?.status).toBe("stopped");
    expect(saved?.wizard?.phase).toBe("complete");
  });
});
