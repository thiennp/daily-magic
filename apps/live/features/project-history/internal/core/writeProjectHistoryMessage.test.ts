import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const layoutState = vi.hoisted(() => ({ root: "" }));

vi.mock("@agent-witch/install-layout", () => ({
  resolveAgentWitchLocalLayout: () => ({ projectDataDir: layoutState.root }),
}));

import { writeProjectHistoryMessage } from "./writeProjectHistoryMessage";

describe("writeProjectHistoryMessage", () => {
  let tempRoot = "";

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ph-hist-"));
    layoutState.root = tempRoot;
  });

  afterEach(() => {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("is idempotent by messageId", () => {
    const first = writeProjectHistoryMessage({
      projectId: "p1",
      messageId: "m1",
      message: { messageId: "m1", summary: "hi" },
    });
    const second = writeProjectHistoryMessage({
      projectId: "p1",
      messageId: "m1",
      message: { messageId: "m1", summary: "changed" },
    });
    expect(second.savedAt).toBe(first.savedAt);
    expect(second.message).toEqual(first.message);
  });
});
