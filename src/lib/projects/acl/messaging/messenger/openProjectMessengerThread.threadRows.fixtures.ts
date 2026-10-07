/** openProjectMessengerThread.threadRows.test: viewer + Neon page sample. */
export const THREAD_ROWS_PARENT = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const PARENT = THREAD_ROWS_PARENT;

export const threadRowsViewer = (isOwner: boolean) => ({
  ok: true,
  projectId: "proj-1",
  ownerUserId: "owner-1",
  viewerUserId: isOwner ? "owner-1" : "member-1",
  canSend: true,
  isOwner,
});

const entry = (messageId: string, over: Record<string, unknown>) => ({
  messageId,
  createdAt: "2026-10-07T19:00:00.000Z",
  kind: "chat.note",
  text: messageId,
  needsReply: false,
  inReplyTo: null,
  states: [],
  ...over,
});

/** Newest first: a silence notice on PARENT, a bot↔bot row, PARENT (archived). */
export const THREAD_ROWS_NEON_PAGE = {
  hasMore: false,
  entries: [
    entry("notice-1", {
      author: { kind: "system", membershipId: null, displayName: "System" },
      kind: "peer.silent",
      inReplyTo: PARENT,
    }),
    entry("b2b-1", {
      author: { kind: "bot", membershipId: "kai", displayName: "Kai" },
      kind: "task.status",
      peer: {
        toMembershipId: "lead",
        toDisplayName: "Lead",
        toTeamLabel: null,
      },
    }),
    entry(PARENT, {
      author: { kind: "owner", membershipId: null, displayName: "Owner" },
      kind: "task.assign",
      archived: {
        at: "2026-10-07T20:00:00.000Z",
        byUserId: "owner-1",
        byDisplayName: "Owner",
      },
    }),
  ],
};
