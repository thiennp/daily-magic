import { describe, expect, it } from "vitest";

import { deriveProjectHistoryThreadKey } from "./deriveProjectHistoryThreadKey";

describe("deriveProjectHistoryThreadKey", () => {
  it("prefers explicit threadKey on the message", () => {
    expect(
      deriveProjectHistoryThreadKey({
        message: {
          threadKey: "t-top",
          toMembershipId: "other",
          fromMembershipId: null,
          toUserId: null,
          toTeamLabel: null,
        },
      }),
    ).toBe("t-top");
  });

  it("derives whole and bot threads via projectMessengerThreadKeyForRow", () => {
    expect(
      deriveProjectHistoryThreadKey({
        message: {
          messageId: "m1",
          fromMembershipId: null,
          toMembershipId: null,
          toUserId: null,
          toTeamLabel: null,
          summary: "hi all",
        },
      }),
    ).toBe("whole");

    expect(
      deriveProjectHistoryThreadKey({
        message: {
          messageId: "m2",
          fromMembershipId: null,
          toMembershipId: "bot-9",
          toUserId: null,
          toTeamLabel: null,
          summary: "hi bot",
        },
      }),
    ).toBe("bot-9");
  });
});
