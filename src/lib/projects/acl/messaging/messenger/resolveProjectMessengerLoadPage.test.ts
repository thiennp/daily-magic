import { describe, expect, it } from "vitest";

import {
  PROJECT_MESSENGER_COMPUTER_OFFLINE_ERROR,
  resolveProjectMessengerLoadPage,
} from "@/lib/projects/acl/messaging/messenger/resolveProjectMessengerLoadPage";
import type { ProjectMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

const entry = (
  messageId: string,
  createdAt: string,
): ProjectMessengerTimelineEntry => ({
  messageId,
  createdAt,
  author: { kind: "owner", membershipId: null, displayName: "Owner" },
  kind: "chat.note",
  text: messageId,
  needsReply: false,
  inReplyTo: null,
  states: [],
});

describe("resolveProjectMessengerLoadPage", () => {
  it("returns neon newest-first page with beforeCursor of oldest", () => {
    const result = resolveProjectMessengerLoadPage({
      localEntries: [],
      localHasMore: false,
      neonEntries: [
        entry("c", "2026-10-07T03:00:00.000Z"),
        entry("b", "2026-10-07T02:00:00.000Z"),
        entry("a", "2026-10-07T01:00:00.000Z"),
      ],
      neonHasMore: true,
      localLive: false,
      beforeRequested: false,
      limit: 2,
    });
    expect(result.entries.map((e) => e.messageId)).toEqual(["c", "b"]);
    expect(result.page.source).toBe("neon");
    expect(result.page.hasMore).toBe(true);
    expect(result.page.beforeCursor).toBeTruthy();
    expect(result.error).toBeUndefined();
  });

  it("errors when load-older is empty and computer offline", () => {
    const result = resolveProjectMessengerLoadPage({
      localEntries: [],
      localHasMore: false,
      neonEntries: [],
      neonHasMore: false,
      localLive: false,
      beforeRequested: true,
      limit: 50,
    });
    expect(result.entries).toEqual([]);
    expect(result.error).toEqual(PROJECT_MESSENGER_COMPUTER_OFFLINE_ERROR);
    expect(result.page.source).toBe("exhausted");
  });

  it("does not error on empty first page", () => {
    const result = resolveProjectMessengerLoadPage({
      localEntries: [],
      localHasMore: false,
      neonEntries: [],
      neonHasMore: false,
      localLive: false,
      beforeRequested: false,
      limit: 50,
    });
    expect(result.error).toBeUndefined();
    expect(result.page.source).toBe("exhausted");
  });

  it("marks mixed when local and neon both contribute", () => {
    const result = resolveProjectMessengerLoadPage({
      localEntries: [entry("old", "2026-09-01T00:00:00.000Z")],
      localHasMore: false,
      neonEntries: [entry("new", "2026-10-07T00:00:00.000Z")],
      neonHasMore: false,
      localLive: true,
      beforeRequested: true,
      limit: 50,
    });
    expect(result.page.source).toBe("mixed");
    expect(result.entries.map((e) => e.messageId)).toEqual(["new", "old"]);
  });
});
