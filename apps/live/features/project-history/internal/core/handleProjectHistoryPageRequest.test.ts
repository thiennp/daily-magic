import { describe, expect, it, vi } from "vitest";

vi.mock("./readProjectHistoryMessagesPage", () => ({
  readProjectHistoryMessagesPage: vi.fn(() => ({
    entries: [
      {
        messageId: "m1",
        createdAt: "2026-10-07T09:00:00.000Z",
        author: { kind: "owner", membershipId: null, displayName: null },
        kind: "chat.note",
        text: "local page",
        needsReply: false,
        inReplyTo: null,
        states: [],
      },
    ],
    nextBeforeCursor: null,
    hasMore: false,
  })),
}));

import { handleProjectHistoryPageRequest } from "./handleProjectHistoryPageRequest";
import { readProjectHistoryMessagesPage } from "./readProjectHistoryMessagesPage";

describe("handleProjectHistoryPageRequest (AWL)", () => {
  it("reuses readProjectHistoryMessagesPage and returns page", () => {
    const result = handleProjectHistoryPageRequest({
      payload: {
        projectId: "proj-1",
        threadKey: "whole",
        limit: 25,
      },
    });
    expect(readProjectHistoryMessagesPage).toHaveBeenCalledWith({
      projectId: "proj-1",
      threadKey: "whole",
      beforeCursor: undefined,
      limit: 25,
    });
    expect(result).toMatchObject({
      ok: true,
      projectId: "proj-1",
      threadKey: "whole",
      hasMore: false,
    });
    if (result.ok) {
      expect(result.entries[0]?.text).toBe("local page");
    }
  });

  it("rejects invalid payload", () => {
    expect(handleProjectHistoryPageRequest({ payload: null })).toMatchObject({
      ok: false,
      errorCode: "invalid_payload",
    });
  });
});
