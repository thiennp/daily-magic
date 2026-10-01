import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import {
  createInitialPromptSdlcWizardState,
  PROMPT_SDLC_WIZARD_MODULE_MAX_ROUNDS,
} from "../../../../adapters/promptSdlcAwcCore";
import { advancePromptSdlcWizardLocal } from "./advancePromptSdlcWizardLocal";
import { buildPromptSdlcLocalArtifactDocument } from "./buildPromptSdlcLocalArtifactDocument";
import { buildPromptSdlcLocalPageBody } from "./buildPromptSdlcLocalPage";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { confirmedPromptSdlcCostControlsForTests } from "./promptSdlcCostControlTestFixtures";
import {
  readPromptSdlcLocalCycle,
  savePromptSdlcLocalCycle,
} from "./promptSdlcLocalStore";
import { resolveWritableCursorArtifactsDir } from "./resolveWritableCursorArtifactsDir";
import * as writerReply from "./runPromptSdlcWriterReply";

describe("wizard step 4 chain modules", () => {
  const storeDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "prompt-sdlc-step4-chain-"),
  );
  const storePath = path.join(storeDir, "prompt-optimizer-cycles.json");

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("runs one module at a time, records stats, and passes chain output forward", async () => {
    const runPrompts: string[] = [];
    vi.spyOn(writerReply, "runPromptSdlcWriterReply").mockImplementation(
      async (input) => {
        runPrompts.push(input.prompt);
        if (input.prompt.includes("Score the changes from 0 to 100")) {
          return {
            ok: true,
            text: '{"score":75,"passed":true,"reasons":"good"}',
            tokens: 3,
          };
        }
        if (input.prompt.includes("Module B")) {
          expect(input.prompt).toContain("output-from-A");
          return { ok: true, text: "output-from-B", tokens: 4 };
        }
        return { ok: true, text: "output-from-A", tokens: 2 };
      },
    );

    let cycle = createPromptSdlcLocalCycle({
      goal: "Chain test",
      sourcePrompt: "Do {{x}}",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      runnerModel: "claude-cli",
      workingDirectory: storeDir,
      costControls: confirmedPromptSdlcCostControlsForTests(),
      wizard: {
        ...createInitialPromptSdlcWizardState("Do {{x}}"),
        phase: "optimize_modules",
        gate: null,
        selectedSplitTopology: "chain",
        currentModuleIndex: 0,
        modules: [
          {
            moduleId: "a",
            title: "Module A",
            prompt: "Module A task",
            status: "running",
            selectedRevisionRound: null,
            statistics: null,
          },
          {
            moduleId: "b",
            title: "Module B",
            prompt: "Module B task",
            status: "pending",
            selectedRevisionRound: null,
            statistics: null,
          },
        ],
      },
    });
    cycle = {
      ...cycle,
      status: "judging",
      judgeScoresOnly: true,
      passScore: 70,
      maxRounds: PROMPT_SDLC_WIZARD_MODULE_MAX_ROUNDS,
      revisions: [
        { roundNumber: 0, promptText: "Module A task", judgement: null },
      ],
    };
    savePromptSdlcLocalCycle(storePath, cycle);

    const afterModuleA = await advancePromptSdlcWizardLocal(
      readPromptSdlcLocalCycle(storePath, cycle.id)!,
    );
    savePromptSdlcLocalCycle(storePath, afterModuleA);

    expect(afterModuleA.wizard?.gate).toBe("optimize_modules");
    expect(afterModuleA.wizard?.modules[0]?.statistics?.bestRunOutput).toBe(
      "output-from-A",
    );
    expect(afterModuleA.maxRounds).toBe(PROMPT_SDLC_WIZARD_MODULE_MAX_ROUNDS);
    expect(
      runPrompts.some((item) => item.includes("Do not run later chain")),
    ).toBe(true);

    const saved = readPromptSdlcLocalCycle(storePath, cycle.id)!;
    const html = buildPromptSdlcLocalPageBody({
      goal: "Chain test",
      prompt: "",
      modelNote: "",
      writers: [{ id: "claude-cli", label: "Claude" }],
      judge: "claude-cli",
      improver: "claude-cli",
      folder: storeDir,
      passScore: "70",
      canRun: true,
      errorMessage: null,
      cycle: saved,
      history: [],
    });
    const artifactsDir = resolveWritableCursorArtifactsDir();
    fs.writeFileSync(
      path.join(artifactsDir, "prompt-optimizer-step4-chain-gate.html"),
      buildPromptSdlcLocalArtifactDocument({
        title: "Step 4 — Optimize modules",
        body: html,
      }),
    );
    expect(html).toContain("Module stats: best 75");
  });
});
