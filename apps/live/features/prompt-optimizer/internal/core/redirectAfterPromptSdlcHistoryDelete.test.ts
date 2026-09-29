import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { redirectAfterPromptSdlcHistoryDelete } from "./redirectAfterPromptSdlcHistoryDelete";
import {
  readPromptSdlcLocalCycles,
  savePromptSdlcLocalCycle,
} from "./promptSdlcLocalStore";

describe("redirectAfterPromptSdlcHistoryDelete", () => {
  it("removes the run and ignores a later save of that same run", () => {
    const storePath = path.join(
      fs.mkdtempSync(path.join(os.tmpdir(), "prompt-sdlc-")),
      "cycles.json",
    );
    const cycle = createPromptSdlcLocalCycle({
      goal: "When this prompt is used on a customer email, stay on the facts.",
      sourcePrompt: "Be helpful.",
      judgeModel: "claude-cli",
      improverModel: "codex",
    });
    savePromptSdlcLocalCycle(storePath, cycle);
    const posted = new URLSearchParams({
      intent: "delete-history",
      cycleId: cycle.id,
      openCycleId: "other-cycle",
    });

    expect(
      redirectAfterPromptSdlcHistoryDelete({
        posted,
        storePath,
        openCycleId: null,
      }),
    ).toBe("/prompt-optimizer?cycle=other-cycle");
    savePromptSdlcLocalCycle(storePath, cycle);
    expect(readPromptSdlcLocalCycles(storePath)).toEqual([]);
  });
});
