import type {
  AwcMessengerStateChip,
  AwcMessengerTimelineEntry,
} from "@/features/projects/messenger/types/awcProjectMessenger.type";

/** Shared OW-H5 feed-row fixtures (tests only). */
export const entry = (
  over: Partial<AwcMessengerTimelineEntry> = {},
): AwcMessengerTimelineEntry => ({
  messageId: "m1",
  createdAt: "2026-10-07T12:00:00.000Z",
  author: { kind: "owner", membershipId: null, displayName: "Thien" },
  kind: "chat.note",
  text: "hello",
  needsReply: false,
  inReplyTo: null,
  states: [],
  ...over,
});

export const chip = (
  membershipId: string,
  state: AwcMessengerStateChip["state"],
  displayName: string | null = membershipId,
): AwcMessengerStateChip => ({ membershipId, displayName, state, reason: null });
