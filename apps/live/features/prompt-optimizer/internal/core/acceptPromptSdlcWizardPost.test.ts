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
});
