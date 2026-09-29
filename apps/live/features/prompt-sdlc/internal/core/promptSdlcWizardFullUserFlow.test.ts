import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { tryAcceptPromptSdlcWizardPost } from "./acceptPromptSdlcWizardPost";
import { buildPromptSdlcLocalPageBody } from "./buildPromptSdlcLocalPage";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { readPromptSdlcLocalShownForm } from "./readPromptSdlcLocalShownForm";
import { ensurePromptSdlcLocalCycleRunning } from "./runPromptSdlcLocalCycle";
import {
  readPromptSdlcLocalCycle,
  savePromptSdlcLocalCycle,
} from "./promptSdlcLocalStore";
import * as writerReply from "./runPromptSdlcWriterReply";
import type http from "node:http";

const waitUntil = async (
  predicate: () => boolean,
  label: string,
): Promise<void> => {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (predicate()) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  throw new Error(`timed out: ${label}`);
};

describe("prompt SDLC wizard full user flow (mocked writers)", () => {
  const storeDir = fs.mkdtempSync(path.join(os.tmpdir(), "psdlc-full-"));
  const storePath = path.join(storeDir, "prompt-sdlc-cycles.json");

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("walks generalize gate → evaluate → separate gate with form locked at gates", async () => {
    vi.spyOn(writerReply, "runPromptSdlcWriterReply").mockImplementation(
      async (input) => {
        if (
          input.prompt.includes("generalize") ||
          input.prompt.includes("Generalize")
        ) {
          return {
            ok: true,
            text: JSON.stringify({
              templatedPrompt: "Do {{task}} well.",
              variables: [
                {
                  name: "task",
                  description: "Work item",
                  sampleValue: "refactor auth",
                },
              ],
            }),
            tokens: 8,
          };
        }
        if (
          input.prompt.includes("module splits") ||
          input.prompt.includes("separate")
        ) {
          return {
            ok: true,
            text: JSON.stringify({
              options: [
                {
                  id: "one",
                  title: "Single module",
                  summary: "Keep it simple",
                  topology: "chain",
                  recommended: true,
                  modules: [
                    {
                      id: "m1",
                      title: "Main",
                      prompt: "Run the task",
                      order: 0,
                    },
                  ],
                },
              ],
            }),
            tokens: 6,
          };
        }
        return {
          ok: true,
          text: '{"score":88,"passed":true,"reasons":"Good","rawReply":"88"}',
          tokens: 4,
        };
      },
    );

    const cycle = createPromptSdlcLocalCycle({
      goal: "Ship a solid prompt.",
      sourcePrompt: "Be helpful.",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      runnerModel: "claude-cli",
      workingDirectory: storeDir,
      wizard: createInitialPromptSdlcWizardState("Be helpful."),
    });
    savePromptSdlcLocalCycle(storePath, cycle);
    ensurePromptSdlcLocalCycleRunning(storePath, cycle.id);

    await waitUntil(() => {
      const current = readPromptSdlcLocalCycle(storePath, cycle.id);
      return (
        current?.status === "wizard_paused" &&
        current.wizard?.gate === "generalize"
      );
    }, "generalize gate");

    let paused = readPromptSdlcLocalCycle(storePath, cycle.id)!;
    expect(
      readPromptSdlcLocalShownForm({
        goal: "",
        prompt: "",
        folder: "~",
        passScore: "90",
        judge: "",
        improver: "",
        cycle: paused,
      }).running,
    ).toBe(true);

    const pageAtGeneralize = buildPromptSdlcLocalPageBody({
      goal: "",
      prompt: "",
      modelNote: "",
      writers: [{ id: "claude-cli", label: "Claude" }],
      judge: "claude-cli",
      improver: "claude-cli",
      folder: storeDir,
      passScore: "70",
      canRun: true,
      errorMessage: null,
      cycle: paused,
      history: [],
    });
    expect(pageAtGeneralize).toContain("Do {{task}} well.");
    expect(pageAtGeneralize).toContain("Continue to evaluate");
    expect(pageAtGeneralize).toContain('class="sdlc-wizard-gate-lede"');
    expect(pageAtGeneralize).toContain('fieldset class="sdlc-fields" disabled');

    tryAcceptPromptSdlcWizardPost({
      posted: new URLSearchParams({
        intent: "wizard-continue",
        cycleId: cycle.id,
      }),
      storePath,
      response: {
        writeHead: () => undefined,
        end: () => undefined,
      } as unknown as http.ServerResponse,
    });
    ensurePromptSdlcLocalCycleRunning(storePath, cycle.id);

    await waitUntil(() => {
      const current = readPromptSdlcLocalCycle(storePath, cycle.id);
      return (
        current?.status === "wizard_paused" &&
        current.wizard?.gate === "evaluate"
      );
    }, "evaluate gate");

    paused = readPromptSdlcLocalCycle(storePath, cycle.id)!;
    expect(paused.revisions.length).toBeGreaterThan(0);

    tryAcceptPromptSdlcWizardPost({
      posted: new URLSearchParams({
        intent: "wizard-continue",
        cycleId: cycle.id,
        wizardRevisionRound: String(
          paused.wizard?.evaluateSelectedRound ??
            paused.revisions.at(-1)?.roundNumber ??
            0,
        ),
      }),
      storePath,
      response: {
        writeHead: () => undefined,
        end: () => undefined,
      } as unknown as http.ServerResponse,
    });
    ensurePromptSdlcLocalCycleRunning(storePath, cycle.id);

    await waitUntil(() => {
      const current = readPromptSdlcLocalCycle(storePath, cycle.id);
      return (
        current?.status === "wizard_paused" &&
        current.wizard?.gate === "separate"
      );
    }, "separate gate");

    paused = readPromptSdlcLocalCycle(storePath, cycle.id)!;
    const pageAtSeparate = buildPromptSdlcLocalPageBody({
      goal: "",
      prompt: "",
      modelNote: "",
      writers: [{ id: "claude-cli", label: "Claude" }],
      judge: "claude-cli",
      improver: "claude-cli",
      folder: storeDir,
      passScore: "70",
      canRun: true,
      errorMessage: null,
      cycle: paused,
      history: [],
    });
    expect(pageAtSeparate).toContain("Step 3 — Separate");
    expect(pageAtSeparate).toContain("Single module");
  });
});
