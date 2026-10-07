import { describe, expect, it } from "vitest";

import { projectMessageChatKey } from "@/lib/projects/acl/messaging/projectMessageChatKey";

describe("projectMessageChatKey", () => {
  it("uses whole for empty address or isWhole", () => {
    expect(
      projectMessageChatKey({
        senderMembershipId: null,
        toMembershipId: null,
        toUserId: null,
        toTeamLabel: null,
      }),
    ).toBe("whole");
    expect(
      projectMessageChatKey({
        senderMembershipId: "b1",
        toMembershipId: null,
        toUserId: null,
        toTeamLabel: null,
        isWhole: true,
      }),
    ).toBe("whole");
  });

  it("uses bot membership for human→bot", () => {
    expect(
      projectMessageChatKey({
        senderMembershipId: null,
        toMembershipId: "bot-1",
        toUserId: null,
        toTeamLabel: null,
      }),
    ).toBe("bot-1");
  });

  it("pairs bot↔bot with sorted ids", () => {
    expect(
      projectMessageChatKey({
        senderMembershipId: "b-z",
        toMembershipId: "b-a",
        toUserId: null,
        toTeamLabel: null,
      }),
    ).toBe("pair:b-a:b-z");
  });

  it("prefixes team and system", () => {
    expect(
      projectMessageChatKey({
        senderMembershipId: null,
        toMembershipId: null,
        toUserId: null,
        toTeamLabel: "alpha",
      }),
    ).toBe("team:alpha");
    expect(
      projectMessageChatKey({
        senderMembershipId: null,
        toMembershipId: null,
        toUserId: "u1",
        toTeamLabel: null,
      }),
    ).toBe("system:u1");
  });
});
