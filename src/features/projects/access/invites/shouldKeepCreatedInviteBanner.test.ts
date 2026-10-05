import { describe, expect, it } from "vitest";

import { shouldKeepCreatedInviteBanner } from "@/features/projects/access/invites/shouldKeepCreatedInviteBanner";

describe("shouldKeepCreatedInviteBanner", () => {
  it("keeps the banner only while the created invite id is still usable/listed", () => {
    expect(
      shouldKeepCreatedInviteBanner({
        createdInviteId: "inv-1",
        invites: [{ inviteId: "inv-1" }, { inviteId: "inv-2" }],
      }),
    ).toBe(true);
    expect(
      shouldKeepCreatedInviteBanner({
        createdInviteId: "inv-1",
        invites: [{ inviteId: "inv-2" }],
      }),
    ).toBe(false);
    expect(
      shouldKeepCreatedInviteBanner({
        createdInviteId: null,
        invites: [{ inviteId: "inv-1" }],
      }),
    ).toBe(false);
  });
});
