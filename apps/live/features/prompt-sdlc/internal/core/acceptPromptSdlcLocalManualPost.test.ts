import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { acceptPromptSdlcLocalManualPost } from "./acceptPromptSdlcLocalManualPost";
import {
  closePromptSdlcLocalCycleAbort,
  openPromptSdlcLocalCycleAbort,
} from "./stopPromptSdlcLocalCycle";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import {
  readPromptSdlcLocalCycle,
  savePromptSdlcLocalCycle,
} from "./promptSdlcLocalStore";

describe("acceptPromptSdlcLocalManualPost", () => {
  it("rejects a score that has no reason and keeps a score that explains itself", () => {
    const storePath = path.join(
      os.tmpdir(),
      `prompt-sdlc-manual-${crypto.randomUUID()}.json`,
    );
    const cycle = createPromptSdlcLocalCycle({
      goal: "Stay in the facts.",
      sourcePrompt: "Be helpful.",
      judgeModel: "manual",
      improverModel: "manual",
    });
    savePromptSdlcLocalCycle(storePath, cycle);

    const missing = acceptPromptSdlcLocalManualPost({
      storePath,
      posted: new URLSearchParams({
        intent: "manual-judge",
        cycleId: cycle.id,
        score: "40",
        reasons: " ",
      }),
    });
    expect(missing.kind).toBe("invalid");

    const saved = acceptPromptSdlcLocalManualPost({
      storePath,
      posted: new URLSearchParams({
        intent: "manual-judge",
        cycleId: cycle.id,
        score: "40",
        reasons: "The prompt never names the facts it may use.",
      }),
    });
    expect(saved.kind).toBe("saved");
    const next = readPromptSdlcLocalCycle(storePath, cycle.id);
    expect(next?.status).toBe("improving");
    expect(next?.revisions[0]?.judgement?.score).toBe(40);
    expect(next?.revisions[0]?.judgement?.reasons).toBe(
      "The prompt never names the facts it may use.",
    );
    fs.rmSync(storePath, { force: true });
  });

  it("stops the run and aborts the writer", () => {
    const storePath = path.join(
      os.tmpdir(),
      `prompt-sdlc-stop-${crypto.randomUUID()}.json`,
    );
    const cycle = createPromptSdlcLocalCycle({
      goal: "Stay in the facts.",
      sourcePrompt: "Be helpful.",
      judgeModel: "claude-cli",
      improverModel: "codex",
    });
    savePromptSdlcLocalCycle(storePath, cycle);
    const signal = openPromptSdlcLocalCycleAbort(cycle.id);

    const stopped = acceptPromptSdlcLocalManualPost({
      storePath,
      posted: new URLSearchParams({
        intent: "stop",
        cycleId: cycle.id,
      }),
    });

    expect(stopped).toEqual({ kind: "saved", cycleId: cycle.id });
    expect(signal.aborted).toBe(true);
    expect(readPromptSdlcLocalCycle(storePath, cycle.id)?.status).toBe(
      "stopped",
    );
    expect(readPromptSdlcLocalCycle(storePath, cycle.id)?.errorMessage).toBe(
      "Finished. The best prompt is the result.",
    );
    closePromptSdlcLocalCycleAbort(cycle.id);
    fs.rmSync(storePath, { force: true });
  });
});
