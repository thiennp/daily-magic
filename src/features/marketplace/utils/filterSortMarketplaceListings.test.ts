import { describe, expect, it } from "vitest";

import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";
import {
  countMarketplaceListingsByType,
  filterSortMarketplaceListings,
} from "@/features/marketplace/utils/filterSortMarketplaceListings";

const listing = (
  partial: Partial<HarnessMarketplaceListing> &
    Pick<HarnessMarketplaceListing, "capabilityId" | "name" | "type">,
): HarnessMarketplaceListing =>
  ({
    ownerUserId: "u1",
    ownerEmail: "a@example.com",
    ownerName: "Ada",
    description: "desc",
    exampleRequest: "",
    visibility: "public",
    workflowFields: [],
    usageGuide: {
      summary: "",
      prerequisites: [],
      steps: [],
      whenToUse: "",
      supportedWriters: [],
    },
    harnessSetSlug: "slug",
    harnessSetName: null,
    harnessItemCount: null,
    isOnline: true,
    hostname: null,
    isOfficialPreset: false,
    ...partial,
  }) as HarnessMarketplaceListing;

describe("filterSortMarketplaceListings", () => {
  const listings = [
    listing({
      capabilityId: "1",
      name: "Zebra agent",
      type: CapabilityType.AGENT,
      isOfficialPreset: false,
    }),
    listing({
      capabilityId: "2",
      name: "Alpha workflow",
      type: CapabilityType.WORKFLOW,
      isOfficialPreset: true,
      description: "digest writer",
    }),
  ];

  it("filters by type and query, sorts official first then name", () => {
    const result = filterSortMarketplaceListings(listings, {
      query: "alpha",
      type: "all",
      sort: "officialFirst",
    });
    expect(result.map((item) => item.capabilityId)).toEqual(["2"]);
  });

  it("counts by type", () => {
    expect(countMarketplaceListingsByType(listings, "all")).toBe(2);
    expect(
      countMarketplaceListingsByType(listings, CapabilityType.AGENT),
    ).toBe(1);
  });
});
