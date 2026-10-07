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
      entries: [entry("a", "2026-10-01T00:00:00.000Z"), entry("b", "2026-10-02T00:00:00.000Z")],
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
      entries: [entry("new", "2026-10-03T00:00:00.000Z"), entry("old", "2026-10-01T00:00:00.000Z")],
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
});
