import { describe, expect, it } from "vitest";

import { extractHistoryIndexFields } from "./extractHistoryIndexFields";

describe("extractHistoryIndexFields", () => {
  it("prefers top-level v2 threadKey + createdAt", () => {
    expect(
      extractHistoryIndexFields({
        messageId: "m1",
        projectId: "p1",
        savedAt: "2026-01-01T00:00:00.000Z",
        threadKey: "t-top",
        createdAt: "2026-01-02T00:00:00.000Z",
        message: {
          threadKey: "t-msg",
          createdAt: "2026-01-03T00:00:00.000Z",
        },
      }),
    ).toEqual({
      threadKey: "t-top",
      createdAt: "2026-01-02T00:00:00.000Z",
    });
  });

  it("falls back to message thread_key / created_at then savedAt", () => {
    expect(
      extractHistoryIndexFields({
        messageId: "m1",
        projectId: "p1",
        savedAt: "2026-01-01T00:00:00.000Z",
        message: { thread_key: "t-snake", created_at: "2026-01-04T00:00:00.000Z" },
      }),
    ).toEqual({
      threadKey: "t-snake",
      createdAt: "2026-01-04T00:00:00.000Z",
    });

    expect(
      extractHistoryIndexFields({
        messageId: "m1",
        projectId: "p1",
        savedAt: "2026-01-01T00:00:00.000Z",
        message: { text: "hi" },
      }),
    ).toEqual({
      threadKey: null,
      createdAt: "2026-01-01T00:00:00.000Z",
    });
  });
});
