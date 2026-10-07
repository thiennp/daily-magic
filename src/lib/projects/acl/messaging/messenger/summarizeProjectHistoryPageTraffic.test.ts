import { describe, expect, it } from "vitest";

import {
  assertNoHistoryBodyInTrafficBlob,
  summarizeProjectHistoryPageTraffic,
} from "@/lib/projects/acl/messaging/messenger/summarizeProjectHistoryPageTraffic";

describe("summarizeProjectHistoryPageTraffic (Neon no-bloat)", () => {
  it("scrubs entry bodies from traffic summary", () => {
    const summary = summarizeProjectHistoryPageTraffic({
      type: "project.history.page.result",
      requestId: "r1",
      payload: {
        ok: true,
        projectId: "p1",
        threadKey: "whole",
        entries: [
          {
            messageId: "m1",
            createdAt: "2026-10-07T00:00:00.000Z",
            text: "SECRET BODY MUST NOT LEAK",
            kind: "chat.note",
            author: { kind: "owner", membershipId: null, displayName: null },
            needsReply: false,
            inReplyTo: null,
            states: [],
          },
        ],
        hasMore: false,
      },
    });
    expect(summary.entryCount).toBe(1);
    expect(summary.projectId).toBe("p1");
    expect(JSON.stringify(summary)).not.toContain("SECRET BODY");
    expect(assertNoHistoryBodyInTrafficBlob(summary)).toBe(true);
  });

  it("detects body-like keys in a fake sql blob", () => {
    expect(
      assertNoHistoryBodyInTrafficBlob({
        status: "completed",
        result: { text: "leaked body" },
      }),
    ).toBe(false);
    expect(
      assertNoHistoryBodyInTrafficBlob({
        status: "pending",
        project_id: "p1",
        entry_count: 2,
      }),
    ).toBe(true);
  });
});
