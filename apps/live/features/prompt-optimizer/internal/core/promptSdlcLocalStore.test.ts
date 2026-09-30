import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { readPromptSdlcLocalCycle } from "./promptSdlcLocalStore";

describe("promptSdlcLocalStore", () => {
  it("normalizes wizard parameterValues when reading legacy cycles", () => {
    const storeDir = fs.mkdtempSync(path.join(os.tmpdir(), "psdlc-store-"));
    const storePath = path.join(storeDir, "prompt-optimizer-cycles.json");
    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      workingDirectory: storeDir,
      wizard: createInitialPromptSdlcWizardState("p"),
    });
    const legacyOnDisk = {
      ...cycle,
      wizard: {
        ...cycle.wizard!,
        parameterValues: undefined,
      },
    };
    fs.mkdirSync(path.dirname(storePath), { recursive: true });
    fs.writeFileSync(storePath, JSON.stringify([legacyOnDisk], null, 2));

    const loaded = readPromptSdlcLocalCycle(storePath, cycle.id);
    expect(loaded?.wizard?.parameterValues).toEqual({});
    expect(loaded?.wizard?.selectedSplitTopology).toBeNull();
  });
});
