import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const layoutState = vi.hoisted(() => ({ root: "" }));

vi.mock("@agent-witch/install-layout", () => ({
  resolveAgentWitchLocalLayout: () => ({ projectDataDir: layoutState.root }),
}));

import { writeLocalProjectHistoryState } from "./localProjectHistoryState";
import { encodeProjectHistoryTimelineCursor } from "./projectHistoryTimelineCursor";
import { readProjectHistoryMessagesPage } from "./readProjectHistoryMessagesPage";
import { writeProjectHistoryAiSession } from "./writeProjectHistoryAiSession";
import { writeProjectHistoryMessage } from "./writeProjectHistoryMessage";

describe("readProjectHistoryMessagesPage + AI sessions", () => {
  let tempRoot = "";

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ph-merge-"));
    layoutState.root = tempRoot;
    writeLocalProjectHistoryState({ projectId: "p1", state: "on_ready" });
  });

  afterEach(() => {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("merges sessions newest-first on whole and keeps cursor continuity", () => {
    writeProjectHistoryMessage({
      projectId: "p1",
      messageId: "m-old",
      message: {
        messageId: "m-old",
        threadKey: "whole",
        createdAt: "2026-01-01T00:00:00.000Z",
        kind: "chat.note",
        summary: "old msg",
      },
    });
    writeProjectHistoryMessage({
      projectId: "p1",
      messageId: "m-new",
      message: {
        messageId: "m-new",
        threadKey: "whole",
        createdAt: "2026-01-03T00:00:00.000Z",
        kind: "chat.note",
        summary: "new msg",
      },
    });
    writeProjectHistoryAiSession({
      projectId: "p1",
      taskId: "sess-mid",
      agentRunId: "sess-mid",
      status: "completed",
      promptSummary: "mid session",
      resultSummary: "session done",
      writerAgent: "codex",
      createdAt: "2026-01-02T00:00:00.000Z",
      completedAt: "2026-01-02T00:05:00.000Z",
    });

    const first = readProjectHistoryMessagesPage({
      projectId: "p1",
      threadKey: "whole",
      limit: 2,
    });
    expect(first.entries.map((e) => e.messageId)).toEqual([
      "m-new",
      "sess-mid",
    ]);
    expect(first.entries[1]?.entryKind).toBe("session");
    expect(first.entries[1]?.kind).toBe("ai.session");
    expect(first.entries[1]?.session).toEqual({
      status: "completed",
      writerAgent: "codex",
      agentRunId: "sess-mid",
    });
    expect(first.hasMore).toBe(true);
    expect(first.nextBeforeCursor).toBe(
      encodeProjectHistoryTimelineCursor({
        t: "2026-01-02T00:00:00.000Z",
        id: "sess-mid",
      }),
    );

    const second = readProjectHistoryMessagesPage({
      projectId: "p1",
      threadKey: "whole",
      beforeCursor: first.nextBeforeCursor,
      limit: 2,
    });
    expect(second.entries.map((e) => e.messageId)).toEqual(["m-old"]);
    expect(second.entries[0]?.entryKind).toBeUndefined();
    expect(second.hasMore).toBe(false);
  });

  it("omits sessions on non-whole threads", () => {
    writeProjectHistoryMessage({
      projectId: "p1",
      messageId: "m1",
      message: {
        messageId: "m1",
        threadKey: "bot-1",
        createdAt: "2026-01-01T00:00:00.000Z",
        kind: "chat.note",
        summary: "bot chat",
      },
    });
    writeProjectHistoryAiSession({
      projectId: "p1",
      taskId: "sess-1",
      agentRunId: "sess-1",
      status: "completed",
      promptSummary: "hidden",
      resultSummary: "hidden",
      createdAt: "2026-01-02T00:00:00.000Z",
    });

    const page = readProjectHistoryMessagesPage({
      projectId: "p1",
      threadKey: "bot-1",
      limit: 10,
    });
    expect(page.entries.map((e) => e.messageId)).toEqual(["m1"]);
    expect(page.entries.every((e) => e.entryKind !== "session")).toBe(true);
  });
});
