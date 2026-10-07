import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const layoutState = vi.hoisted(() => ({ root: "" }));

vi.mock("@agent-witch/install-layout", () => ({
  resolveAgentWitchLocalLayout: () => ({ projectDataDir: layoutState.root }),
}));

import { encodeProjectHistoryTimelineCursor } from "./projectHistoryTimelineCursor";
import {
  loadOlderProjectHistoryMessages,
  readProjectHistoryMessagesPage,
} from "./readProjectHistoryMessagesPage";
import { writeProjectHistoryMessage } from "./writeProjectHistoryMessage";

describe("readProjectHistoryMessagesPage", () => {
  let tempRoot = "";

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ph-load-older-"));
    layoutState.root = tempRoot;
  });

  afterEach(() => {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("pages newest-first with opaque cursor and hasMore", () => {
    writeProjectHistoryMessage({
      projectId: "p1",
      messageId: "m-old",
      message: {
        messageId: "m-old",
        threadKey: "t1",
        createdAt: "2026-01-01T00:00:00.000Z",
        kind: "chat.note",
        summary: "old",
      },
    });
    writeProjectHistoryMessage({
      projectId: "p1",
      messageId: "m-mid",
      message: {
        messageId: "m-mid",
        threadKey: "t1",
        createdAt: "2026-01-02T00:00:00.000Z",
        kind: "chat.note",
        summary: "mid",
      },
    });
    writeProjectHistoryMessage({
      projectId: "p1",
      messageId: "m-new",
      message: {
        messageId: "m-new",
        threadKey: "t1",
        createdAt: "2026-01-03T00:00:00.000Z",
        kind: "chat.note",
        summary: "new",
      },
    });
    writeProjectHistoryMessage({
      projectId: "p1",
      messageId: "m-other",
      message: {
        messageId: "m-other",
        threadKey: "t2",
        createdAt: "2026-01-04T00:00:00.000Z",
        kind: "chat.note",
        summary: "other",
      },
    });

    const first = readProjectHistoryMessagesPage({
      projectId: "p1",
      threadKey: "t1",
      limit: 2,
    });
    expect(first.entries.map((e) => e.messageId)).toEqual(["m-new", "m-mid"]);
    expect(first.entries.map((e) => e.text)).toEqual(["new", "mid"]);
    expect(first.hasMore).toBe(true);
    expect(first.nextBeforeCursor).toBe(
      encodeProjectHistoryTimelineCursor({
        t: "2026-01-02T00:00:00.000Z",
        id: "m-mid",
      }),
    );

    const second = loadOlderProjectHistoryMessages({
      projectId: "p1",
      threadKey: "t1",
      beforeCursor: first.nextBeforeCursor,
      limit: 2,
    });
    expect(second.entries.map((e) => e.messageId)).toEqual(["m-old"]);
    expect(second.hasMore).toBe(false);
    expect(second.nextBeforeCursor).toBeNull();
  });

  it("returns empty on invalid cursor", () => {
    writeProjectHistoryMessage({
      projectId: "p1",
      messageId: "m1",
      message: {
        messageId: "m1",
        threadKey: "t1",
        createdAt: "2026-01-01T00:00:00.000Z",
        summary: "x",
      },
    });
    expect(
      readProjectHistoryMessagesPage({
        projectId: "p1",
        threadKey: "t1",
        beforeCursor: "!!!",
        limit: 10,
      }),
    ).toEqual({ entries: [], nextBeforeCursor: null, hasMore: false });
  });
});
