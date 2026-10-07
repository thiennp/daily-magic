import { describe, expect, it } from "vitest";

import {
  isOneWindowApprovalItem,
  isOneWindowNeedsYouItem,
  mapMessengerEntryToOneWindowItem,
} from "@/features/projects/messenger/oneWindow/mapMessengerEntryToOneWindowItem";
import { entry } from "@/features/projects/messenger/oneWindow/oneWindowOwH5.fixtures";
import { parseMessengerOpenThread } from "@/features/projects/messenger/utils/parseMessengerTimeline";

describe("OW-H5 task update pill, filters and parser", () => {
  it("task update pill only for terminal reply kinds", () => {
    const bot = { kind: "bot" as const, membershipId: "b1", displayName: "Scout" };
    const done = mapMessengerEntryToOneWindowItem(entry({ author: bot, kind: "task.done" }));
    expect(done.subjectState).toMatchObject({ source: "reply_kind", label: "Done", tone: "ok" });
    const blocked = mapMessengerEntryToOneWindowItem(
      entry({ author: bot, kind: "task.blocked" }),
    );
    expect(isOneWindowNeedsYouItem(blocked)).toBe(true);
    const status = mapMessengerEntryToOneWindowItem(entry({ author: bot, kind: "task.status" }));
    expect(status.windowKind).toBe("task_update");
    expect(status.subjectState).toBeNull();
  });

  it("filters: plain chat is neither needs-you nor approval", () => {
    const item = mapMessengerEntryToOneWindowItem(entry({ text: "needs a reply" }));
    expect(isOneWindowNeedsYouItem(item)).toBe(false);
    expect(isOneWindowApprovalItem(item)).toBe(false);
    expect(
      isOneWindowApprovalItem(
        mapMessengerEntryToOneWindowItem(entry({ windowKind: "approval_request" })),
      ),
    ).toBe(true);
  });

  it("parser feature-detects windowKind (DESIGN enum only)", () => {
    const raw = (windowKind: unknown) => ({
      messageId: "m1",
      createdAt: "2026-10-07T12:00:00.000Z",
      author: { kind: "owner", membershipId: null, displayName: "Thien" },
      kind: "task.assign",
      text: "x",
      needsReply: true,
      inReplyTo: null,
      states: [],
      windowKind,
    });
    const parsed = parseMessengerOpenThread({
      ok: true,
      threadKey: "whole",
      canSend: true,
      entries: [raw("task"), raw("send_now"), raw(undefined)],
    });
    expect(parsed?.entries.map((e) => e.windowKind)).toEqual([
      "task",
      undefined,
      undefined,
    ]);
    expect("windowKind" in (parsed?.entries[2] ?? {})).toBe(false);
  });
});
