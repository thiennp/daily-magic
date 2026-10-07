import { describe, expect, it } from "vitest";

import { parseMessengerOpenThread } from "@/features/projects/messenger/utils/parseMessengerTimeline";

const entry = (id: string, createdAt: string) => ({
  messageId: id,
  createdAt,
  author: { kind: "owner", membershipId: null, displayName: "Owner" },
  kind: "chat.note",
  text: id,
  needsReply: false,
  inReplyTo: null,
  states: [],
});

describe("parseMessengerOpenThread", () => {
  it("keeps main oldest-first shape when page is absent", () => {
    const parsed = parseMessengerOpenThread({
      ok: true,
      threadKey: "whole",
      entries: [
        entry("a", "2026-10-01T00:00:00.000Z"),
        entry("b", "2026-10-02T00:00:00.000Z"),
      ],
      canSend: true,
    });
    expect(parsed).not.toBeNull();
    expect(parsed?.page).toBeUndefined();
    expect(parsed?.entries.map((row) => row.messageId)).toEqual(["a", "b"]);
  });

  it("reverses Dispatch newest-first page into oldest-first display order", () => {
    const parsed = parseMessengerOpenThread({
      ok: true,
      threadKey: "whole",
      entries: [
        entry("new", "2026-10-03T00:00:00.000Z"),
        entry("old", "2026-10-01T00:00:00.000Z"),
      ],
      page: {
        beforeCursor: "cursor-old",
        hasMore: true,
        source: "neon",
        localLive: false,
      },
      canSend: true,
    });
    expect(parsed?.page).toEqual({
      beforeCursor: "cursor-old",
      hasMore: true,
      source: "neon",
      localLive: false,
    });
    expect(parsed?.entries.map((row) => row.messageId)).toEqual(["old", "new"]);
  });

  it("parses project_computer_offline error from Dispatch", () => {
    const parsed = parseMessengerOpenThread({
      ok: true,
      threadKey: "whole",
      entries: [],
      page: {
        beforeCursor: null,
        hasMore: false,
        source: "exhausted",
        localLive: false,
      },
      error: {
        code: "project_computer_offline",
        message: "Connection to the project computer was lost.",
      },
      canSend: true,
    });
    expect(parsed?.error).toEqual({
      code: "project_computer_offline",
      message: "Connection to the project computer was lost.",
    });
    expect(parsed?.page?.source).toBe("exhausted");
  });

  it("ignores unknown error codes", () => {
    const parsed = parseMessengerOpenThread({
      ok: true,
      threadKey: "whole",
      entries: [],
      page: {
        beforeCursor: null,
        hasMore: false,
        source: "exhausted",
        localLive: false,
      },
      error: { code: "source_exhausted_offline", message: "x" },
      canSend: true,
    });
    expect(parsed?.error).toBeUndefined();
  });

  it("parses additive entryKind and session without rejecting old payloads", () => {
    const parsed = parseMessengerOpenThread({
      ok: true,
      threadKey: "whole",
      entries: [
        {
          ...entry("chat-1", "2026-10-01T00:00:00.000Z"),
        },
        {
          messageId: "task:1",
          createdAt: "2026-10-02T00:00:00.000Z",
          author: {
            kind: "bot",
            membershipId: null,
            displayName: "claude-cli",
          },
          kind: "ai.session",
          entryKind: "session",
          text: "Finished the refactor",
          needsReply: false,
          inReplyTo: null,
          states: [],
          session: {
            status: "completed",
            writerAgent: "claude-cli",
            agentRunId: "run-1",
          },
        },
      ],
      canSend: true,
    });
    expect(parsed?.entries).toHaveLength(2);
    expect(parsed?.entries[0]?.entryKind).toBeUndefined();
    expect(parsed?.entries[1]).toMatchObject({
      entryKind: "session",
      kind: "ai.session",
      needsReply: false,
      session: {
        status: "completed",
        writerAgent: "claude-cli",
        agentRunId: "run-1",
      },
    });
  });

  it("ignores invalid entryKind / session shapes", () => {
    const parsed = parseMessengerOpenThread({
      ok: true,
      threadKey: "whole",
      entries: [
        {
          ...entry("x", "2026-10-01T00:00:00.000Z"),
          entryKind: "nope",
          session: { writerAgent: "claude-cli" },
        },
      ],
      canSend: true,
    });
    expect(parsed?.entries[0]?.entryKind).toBeUndefined();
    expect(parsed?.entries[0]?.session).toBeUndefined();
  });
});
