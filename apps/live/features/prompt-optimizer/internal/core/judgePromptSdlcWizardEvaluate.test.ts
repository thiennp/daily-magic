import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { beginPromptSdlcWizardEvaluate } from "./advancePromptSdlcWizardLocal";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { judgePromptSdlcLocalRound } from "./judgePromptSdlcLocalRound";
import * as writerReply from "./runPromptSdlcWriterReply";

const WIZARD_EVALUATE_JUDGE = "wizard step 2 (evaluate revisions)";

describe("wizard step 2 evaluate", () => {
  const storeDir = fs.mkdtempSync(path.join(os.tmpdir(), "psdlc-wizard-eval-"));

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("scores prompt text without running the prompt in the folder", async () => {
    const prompts: string[] = [];
    vi.spyOn(writerReply, "runPromptSdlcWriterReply").mockImplementation(
      async (input) => {
        prompts.push(input.prompt);
        return {
          ok: true,
          text: JSON.stringify({
            score: 82,
            passed: true,
            reasons: "Clear structure and goal fit.",
          }),
          tokens: 12,
        };
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
    expect(evaluating.judgePromptTextOnly).toBe(true);

    const revision = evaluating.revisions[0];
    expect(revision).toBeDefined();
    const next = await judgePromptSdlcLocalRound({
      cycle: evaluating,
      revision: revision!,
    });

    expect(prompts).toHaveLength(1);
    expect(prompts[0]).toContain(WIZARD_EVALUATE_JUDGE);
    expect(
      prompts.some((item) => item.startsWith("Do the task in the prompt")),
    ).toBe(false);
    expect(next.revisions[0]?.judgement?.score).toBe(82);
    expect(next.revisions[0]?.run).toBeUndefined();
  });
});
