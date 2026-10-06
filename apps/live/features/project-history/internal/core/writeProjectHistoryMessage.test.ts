import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const layoutState = vi.hoisted(() => ({ root: "" }));

vi.mock("@agent-witch/install-layout", () => ({
  resolveAgentWitchLocalLayout: () => ({ projectDataDir: layoutState.root }),
}));

import { readProjectHistoryMessage } from "./readProjectHistoryMessage";
import { writeProjectHistoryMessage } from "./writeProjectHistoryMessage";
import { PROJECT_HISTORY_MESSAGE_RECORD_VERSION } from "./projectHistory.constants";
import { atomicWriteFile0600 } from "./atomicWriteFile0600";
import { ensureProjectDataTree } from "./resolveProjectDataDir";
import { PROJECT_HISTORY_DIR_NAME } from "./projectHistoryPaths.constant";

describe("writeProjectHistoryMessage", () => {
  let tempRoot = "";

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ph-hist-"));
    layoutState.root = tempRoot;
  });

  afterEach(() => {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("writes v2 fields: version, threadKey, createdAt, senderLabel", () => {
    const record = writeProjectHistoryMessage({
      projectId: "p1",
      messageId: "m1",
      message: {
        messageId: "m1",
        summary: "hi",
        createdAt: "2026-01-02T03:04:05.000Z",
        threadKey: "bot-1",
        fromProjectDisplayName: "Owner",
        fromMembershipId: null,
        toMembershipId: "bot-1",
        toUserId: null,
        toTeamLabel: null,
      },
    });
    expect(record.version).toBe(PROJECT_HISTORY_MESSAGE_RECORD_VERSION);
    expect(record.threadKey).toBe("bot-1");
    expect(record.createdAt).toBe("2026-01-02T03:04:05.000Z");
    expect(record.senderLabel).toBe("Owner");
    expect(record.savedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
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

  it("falls back createdAt to savedAt and derives threadKey via shared rule", () => {
    const record = writeProjectHistoryMessage({
      projectId: "p1",
      messageId: "m2",
      message: {
        messageId: "m2",
        summary: "assign",
        fromMembershipId: null,
        toMembershipId: "mem-bot",
        toUserId: null,
        toTeamLabel: null,
        kind: "task.assign",
      },
    });
    expect(record.createdAt).toBe(record.savedAt);
    expect(record.threadKey).toBe("mem-bot");
  });

  it("reads back v1 records without threadKey/createdAt", () => {
    const root = ensureProjectDataTree("p1");
    atomicWriteFile0600(
      path.join(root, PROJECT_HISTORY_DIR_NAME, "old.json"),
      `${JSON.stringify({
        messageId: "old",
        projectId: "p1",
        message: { messageId: "old", summary: "legacy" },
        savedAt: "2026-01-01T00:00:00.000Z",
      })}\n`,
    );
    const read = readProjectHistoryMessage({ projectId: "p1", messageId: "old" });
    expect(read).toEqual({
      messageId: "old",
      projectId: "p1",
      message: { messageId: "old", summary: "legacy" },
      savedAt: "2026-01-01T00:00:00.000Z",
    });
    expect(read?.threadKey).toBeUndefined();
    expect(read?.createdAt).toBeUndefined();
    expect(read?.version).toBeUndefined();
  });
});
