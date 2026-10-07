import { describe, expect, it } from "vitest";

import {
  buildOneWindowTimelineRows,
  findFirstUnreadMessageId,
  formatOneWindowDayLabel,
} from "@/features/projects/messenger/oneWindow/buildOneWindowTimelineRows";
import { unreadForMessengerThread } from "@/features/projects/messenger/oneWindow/useOneWindowUnreadSnapshot";
import type {
  AwcMessengerThreadList,
  AwcMessengerTimelineEntry,
} from "@/features/projects/messenger/types/awcProjectMessenger.type";

const at = (y: number, m: number, d: number, h = 10): string => new Date(y, m - 1, d, h).toISOString();

const entry = (id: string, createdAt: string, kind: "bot" | "owner" = "bot"): AwcMessengerTimelineEntry => ({
  messageId: id,
  createdAt,
  author: { kind, membershipId: kind === "bot" ? "b1" : null, displayName: "Scout" },
  kind: "chat.note",
  text: id,
  needsReply: false,
  inReplyTo: null,
  states: [],
});

const NOW = new Date(2026, 9, 7, 15);

describe("P1-S4a day separators", () => {
  it("labels today, yesterday, older days and other years", () => {
    expect(formatOneWindowDayLabel(new Date(2026, 9, 7, 9), NOW)).toBe("Today · Wed 7 Oct");
    expect(formatOneWindowDayLabel(new Date(2026, 9, 6, 23), NOW)).toBe("Yesterday · Tue 6 Oct");
    expect(formatOneWindowDayLabel(new Date(2026, 9, 5), NOW)).toBe("Mon 5 Oct");
    expect(formatOneWindowDayLabel(new Date(2025, 11, 31), NOW)).toBe("Wed 31 Dec 2025");
  });

  it("one separator per local day, order unchanged (oldest → newest)", () => {
    const entries = [
      entry("a", at(2026, 10, 6, 9)),
      entry("b", at(2026, 10, 6, 18)),
      entry("c", at(2026, 10, 7, 8)),
    ];
    const rows = buildOneWindowTimelineRows({ entries, now: NOW, firstUnreadId: null });
    expect(rows.map((r) => (r.type === "entry" ? r.entry.messageId : r.type))).toEqual([
      "day", "a", "b", "day", "c",
    ]);
    expect(rows[3]).toMatchObject({ type: "day", label: "Today · Wed 7 Oct" });
  });
});

describe("P1-S4a New marker", () => {
  const entries = [
    entry("me1", at(2026, 10, 7, 9), "owner"),
    entry("b1", at(2026, 10, 7, 10)),
    entry("me2", at(2026, 10, 7, 11), "owner"),
    entry("b2", at(2026, 10, 7, 12)),
    entry("b3", at(2026, 10, 7, 13)),
  ];

  it("sits before the first unread assistant message", () => {
    expect(findFirstUnreadMessageId(entries, 0)).toBeNull();
    expect(findFirstUnreadMessageId(entries, 2)).toBe("b2");
    expect(findFirstUnreadMessageId(entries, 3)).toBe("b1");
    expect(findFirstUnreadMessageId(entries, 99)).toBe("b1");
    const rows = buildOneWindowTimelineRows({ entries, now: NOW, firstUnreadId: "b2" });
    const ids = rows.map((r) => (r.type === "entry" ? r.entry.messageId : r.type));
    expect(ids).toEqual(["day", "me1", "b1", "me2", "new", "b2", "b3"]);
  });

  it("reads the open feed's unread count from the thread list", () => {
    const threads: AwcMessengerThreadList = {
      wholeProject: { lastMessageAt: null, lastPreview: null, unreadCount: 4 },
      bots: [
        { membershipId: "b1", displayName: "Scout", status: "idle", lastMessageAt: null, lastPreview: null, unreadCount: 2 },
      ],
      canSend: true,
    };
    expect(unreadForMessengerThread(threads, "whole")).toBe(4);
    expect(unreadForMessengerThread(threads, "b1")).toBe(2);
    expect(unreadForMessengerThread(threads, "gone")).toBe(0);
    expect(unreadForMessengerThread(null, "whole")).toBe(0);
  });
});
