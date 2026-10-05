import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const layoutState = vi.hoisted(() => ({ root: "" }));

vi.mock("@agent-witch/install-layout", () => ({
  resolveAgentWitchLocalLayout: () => ({ projectDataDir: layoutState.root }),
}));

import { loadProjectHistorySkillgenMessagesSinceCursor } from "./loadProjectHistorySkillgenMessagesSinceCursor";
import { writeProjectHistoryMessage } from "./writeProjectHistoryMessage";

describe("loadProjectHistorySkillgenMessagesSinceCursor", () => {
  let tempRoot = "";

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ph-load-"));
    layoutState.root = tempRoot;
  });

  afterEach(() => {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("loads messages after the cursor only", () => {
    writeProjectHistoryMessage({
      projectId: "p1",
      messageId: "m1",
      message: { messageId: "m1", summary: "first" },
    });
    writeProjectHistoryMessage({
      projectId: "p1",
      messageId: "m2",
      message: { messageId: "m2", summary: "second" },
    });
    const all = loadProjectHistorySkillgenMessagesSinceCursor({
      projectId: "p1",
      cursorMessageId: null,
      cursorSavedAtMs: null,
    });
    expect(all.map((m) => m.messageId)).toEqual(["m1", "m2"]);
    const afterFirst = loadProjectHistorySkillgenMessagesSinceCursor({
      projectId: "p1",
      cursorMessageId: all[0]!.messageId,
      cursorSavedAtMs: all[0]!.createdAtMs,
    });
    expect(afterFirst.map((m) => m.messageId)).toEqual(["m2"]);
  });
});
