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

  it("clears the banner after the first redeem (invite drops from the never-redeemed list)", () => {
    // Multi-use invite: after one redeem it is gone from listProjectInvites
    // (uses_remaining < max_uses), so the Copy-prompt banner clears too.
    expect(
      shouldKeepCreatedInviteBanner({
        createdInviteId: "inv-multi",
        invites: [],
      }),
    ).toBe(false);
  });

  it("DF-014: a stale snapshot right after create does not clear the banner", () => {
    const createdAtMs = 1_000_000;
    expect(
      shouldKeepCreatedInviteBanner({
        createdInviteId: "inv-new",
        invites: [],
        createdAtMs,
        nowMs: createdAtMs + 2_000,
      }),
    ).toBe(true);
    expect(
      shouldKeepCreatedInviteBanner({
        createdInviteId: "inv-new",
        invites: [],
        createdAtMs,
        nowMs: createdAtMs + 60_000,
      }),
    ).toBe(false);
  });
});
