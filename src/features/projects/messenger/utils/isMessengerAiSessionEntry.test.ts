import { describe, expect, it } from "vitest";

import { isMessengerAiSessionEntry } from "@/features/projects/messenger/utils/isMessengerAiSessionEntry";
import type { AwcMessengerTimelineEntry } from "@/features/projects/messenger/types/awcProjectMessenger.type";

const base = (): AwcMessengerTimelineEntry => ({
  messageId: "m1",
  createdAt: "2026-10-07T10:00:00.000Z",
  author: { kind: "bot", membershipId: null, displayName: "claude-cli" },
  kind: "chat.note",
  text: "hello",
  needsReply: false,
  inReplyTo: null,
  states: [],
});

describe("isMessengerAiSessionEntry", () => {
  it("treats missing entryKind as message", () => {
    expect(isMessengerAiSessionEntry(base())).toBe(false);
  });

  it("detects entryKind session", () => {
    expect(
      isMessengerAiSessionEntry({ ...base(), entryKind: "session" }),
    ).toBe(true);
  });

  it("detects legacy kind ai.session", () => {
    expect(isMessengerAiSessionEntry({ ...base(), kind: "ai.session" })).toBe(
      true,
    );
  });
});
