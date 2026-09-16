import { describe, expect, it } from "vitest";

import { findMarketplaceListingByCapabilityId } from "@/features/marketplace/utils/findMarketplaceListingByCapabilityId";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

const buildListing = (capabilityId: string): HarnessMarketplaceListing => ({
  capabilityId,
  ownerUserId: "user-1",
  ownerEmail: "owner@example.com",
  ownerName: null,
  type: "workflow",
  name: "Test",
  description: "Desc",
  exampleRequest: "Run",
  visibility: "public",
  workflowFields: [],
  harnessSetSlug: "slug",
  harnessSetName: null,
  harnessItemCount: 1,
  isOnline: true,
  hostname: null,
  isOfficialPreset: true,
});

describe("findMarketplaceListingByCapabilityId", () => {
  it("returns listing when capabilityId matches", () => {
    const listings = [
      buildListing("preset:weekly-team-status"),
      buildListing("preset:vibe-coding-app-feature"),
    ];

    expect(
      findMarketplaceListingByCapabilityId(
        listings,
        "preset:vibe-coding-app-feature",
      )?.name,
    ).toBe("Test");
  });

  it("returns null when no listing matches", () => {
    expect(
      findMarketplaceListingByCapabilityId([], "preset:missing"),
    ).toBeNull();
  });
});
