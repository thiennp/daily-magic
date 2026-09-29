import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { buildPromptSdlcLocalPageBody } from "./buildPromptSdlcLocalPage";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { ensurePromptSdlcLocalCycleRunning } from "./runPromptSdlcLocalCycle";
import {
  readPromptSdlcLocalCycle,
  savePromptSdlcLocalCycle,
} from "./promptSdlcLocalStore";
import * as writerReply from "./runPromptSdlcWriterReply";
import { trySendPromptSdlcLocalRunFragment } from "./trySendPromptSdlcLocalRunFragment";
import type http from "node:http";

const waitForPausedGeneralize = async (
  storePath: string,
  cycleId: string,
): Promise<void> => {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const cycle = readPromptSdlcLocalCycle(storePath, cycleId);
    if (
      cycle?.status === "wizard_paused" &&
      cycle.wizard?.gate === "generalize" &&
      cycle.wizard.templatedPrompt.length > 0
    ) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  throw new Error("wizard did not pause at generalize");
};

describe("prompt SDLC wizard generalize flow", () => {
  const storeDir = fs.mkdtempSync(path.join(os.tmpdir(), "psdlc-gen-flow-"));
  const storePath = path.join(storeDir, "prompt-sdlc-cycles.json");

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows templated prompt on full page and on live fragment after generalize", async () => {
    vi.spyOn(writerReply, "runPromptSdlcWriterReply").mockResolvedValue({
      ok: true,
      text: JSON.stringify({
        templatedPrompt: "Answer from {{ticket}} only.",
        variables: [
          {
            name: "ticket",
            description: "Support ticket",
            sampleValue: "Where is my order?",
          },
        ],
      }),
      tokens: 12,
    });

    const cycle = createPromptSdlcLocalCycle({
      goal: "Stay factual.",
      sourcePrompt: "Be helpful.",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      workingDirectory: storeDir,
      wizard: createInitialPromptSdlcWizardState("Be helpful."),
    });
    savePromptSdlcLocalCycle(storePath, cycle);
    ensurePromptSdlcLocalCycleRunning(storePath, cycle.id);
    await waitForPausedGeneralize(storePath, cycle.id);

    const paused = readPromptSdlcLocalCycle(storePath, cycle.id);
    expect(paused?.wizard?.templatedPrompt).toBe(
      "Answer from {{ticket}} only.",
    );

    const pageHtml = buildPromptSdlcLocalPageBody({
      goal: "",
      prompt: "",
      modelNote: "",
      writers: [{ id: "claude-cli", label: "Claude" }],
      judge: "claude-cli",
      improver: "claude-cli",
      folder: storeDir,
      passScore: "90",
      canRun: true,
      errorMessage: null,
      cycle: paused,
      history: [],
    });
    expect(pageHtml).toContain("Answer from {{ticket}} only.");
    expect(pageHtml).toContain('id="prompt-sdlc-wizard-gate-slot"');

    let fragmentBody = "";
    trySendPromptSdlcLocalRunFragment({
      method: "GET",
      requestUrl: `/prompt-sdlc?cycle=${cycle.id}&fragment=run`,
      storePath,
      response: {
        writeHead() {
          return;
        },
        end(chunk: string) {
          fragmentBody = chunk;
        },
      } as unknown as http.ServerResponse,
    });
    expect(fragmentBody).toContain("Answer from {{ticket}} only.");
    expect(fragmentBody).toContain("Step 1 — Generalize");
  });
});
