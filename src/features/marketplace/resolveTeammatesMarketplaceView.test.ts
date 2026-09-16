import { describe, expect, it } from "vitest";

import { resolveTeammatesMarketplaceView } from "@/features/marketplace/resolveTeammatesMarketplaceView";

describe("resolveTeammatesMarketplaceView", () => {
  it("always auth-gates teammates for guests even with zero API listings", () => {
    expect(
      resolveTeammatesMarketplaceView({
        isSignedIn: false,
        listingCount: 0,
        teamNavEnabled: true,
      }),
    ).toBe("guest_auth");
  });

  it("shows list when signed in with teammate listings", () => {
    expect(
      resolveTeammatesMarketplaceView({
        isSignedIn: true,
        listingCount: 2,
        teamNavEnabled: false,
      }),
    ).toBe("list");
  });

  it("uses team empty vs solo upsell when signed in without listings", () => {
    expect(
      resolveTeammatesMarketplaceView({
        isSignedIn: true,
        listingCount: 0,
        teamNavEnabled: true,
      }),
    ).toBe("signed_in_empty_team");

    expect(
      resolveTeammatesMarketplaceView({
        isSignedIn: true,
        listingCount: 0,
        teamNavEnabled: false,
      }),
    ).toBe("signed_in_empty_solo");
  });
});
