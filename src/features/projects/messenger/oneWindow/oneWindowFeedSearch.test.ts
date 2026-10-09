import { describe, expect, it } from "vitest";

import { filterOneWindowEntriesByQuery } from "@/features/projects/messenger/oneWindow/oneWindowFeedSearch";
import type { AwcMessengerTimelineEntry } from "@/features/projects/messenger/types/awcProjectMessenger.type";

const entry = (
  id: string,
  text: string,
  name: string | null,
): AwcMessengerTimelineEntry =>
  ({
    messageId: id,
    createdAt: "2026-10-09T10:00:00Z",
    author: { kind: "bot", membershipId: id, displayName: name },
    kind: "chat.note",
    text,
    needsReply: false,
    inReplyTo: null,
    states: [],
  }) as AwcMessengerTimelineEntry;

const entries = [
  entry("1", "Fix the build", "Magi"),
  entry("2", "Ship the release", "Claude"),
  entry("3", "Lunch?", null),
];

describe("filterOneWindowEntriesByQuery", () => {
  it("keeps everything for an empty or blank query", () => {
    expect(filterOneWindowEntriesByQuery(entries, "")).toBe(entries);
    expect(filterOneWindowEntriesByQuery(entries, "   ")).toBe(entries);
  });

  it("matches message text case-insensitively", () => {
    expect(
      filterOneWindowEntriesByQuery(entries, "BUILD").map((e) => e.messageId),
    ).toEqual(["1"]);
  });

  it("matches the author name and tolerates a missing one", () => {
    expect(
      filterOneWindowEntriesByQuery(entries, "claude").map((e) => e.messageId),
    ).toEqual(["2"]);
    expect(filterOneWindowEntriesByQuery(entries, "lunch")).toHaveLength(1);
    expect(filterOneWindowEntriesByQuery(entries, "nothing like this")).toEqual(
      [],
    );
  });
});
