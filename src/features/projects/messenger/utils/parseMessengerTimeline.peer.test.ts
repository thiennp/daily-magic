import { describe, expect, it } from "vitest";

import { parseMessengerOpenThread } from "@/features/projects/messenger/utils/parseMessengerTimeline";

describe("parseMessengerOpenThread peer (DF-023)", () => {
  it("keeps the additive peer field", () => {
    const thread = parseMessengerOpenThread({
      ok: true,
      threadKey: "whole",
      canSend: true,
      entries: [
        {
          messageId: "b2b",
          createdAt: "2026-10-07T19:00:00.000Z",
          author: { kind: "bot", membershipId: "kai", displayName: "Kai" },
          kind: "task.status",
          text: "handoff",
          needsReply: false,
          inReplyTo: null,
          states: [],
          peer: {
            toMembershipId: "lead",
            toDisplayName: "AW Lead",
            toTeamLabel: null,
          },
        },
        {
          messageId: "c1",
          createdAt: "2026-10-07T19:01:00.000Z",
          author: { kind: "owner", membershipId: null, displayName: "Owner" },
          kind: "chat.note",
          text: "hi",
          needsReply: false,
          inReplyTo: null,
          states: [],
        },
      ],
    });
    expect(thread?.entries[0]?.peer).toEqual({
      toMembershipId: "lead",
      toDisplayName: "AW Lead",
      toTeamLabel: null,
    });
    expect(thread?.entries[1]).not.toHaveProperty("peer");
  });
});
