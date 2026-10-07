import type { AwcMessengerTimelineEntry } from "@/features/projects/messenger/types/awcProjectMessenger.type";

/** DF-023 test entries: plain chat + owner-view bot↔bot line. */
export const chat = (
  overrides: Partial<AwcMessengerTimelineEntry> = {},
): AwcMessengerTimelineEntry => ({
  messageId: "m1",
  createdAt: "2026-10-07T19:00:00.000Z",
  author: { kind: "owner", membershipId: null, displayName: "Owner" },
  kind: "chat.note",
  text: "hello",
  needsReply: false,
  inReplyTo: null,
  states: [],
  ...overrides,
});

export const peer = (
  kind: string,
  text = "handoff: DF-023",
): AwcMessengerTimelineEntry =>
  chat({
    messageId: `p-${kind}`,
    author: { kind: "bot", membershipId: "kai", displayName: "Kai" },
    kind,
    text,
    peer: {
      toMembershipId: "lead",
      toDisplayName: "AW Lead",
      toTeamLabel: null,
    },
  });
