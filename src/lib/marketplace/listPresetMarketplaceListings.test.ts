import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import buildPresetMarketplaceBorrowPayload from "@/lib/marketplace/buildPresetMarketplaceBorrowPayload";
import buildPresetMarketplaceListing from "@/lib/marketplace/buildPresetMarketplaceListing";
import listPresetMarketplaceListings from "@/lib/marketplace/listPresetMarketplaceListings";
import {
  isOfficialPresetMarketplaceCapabilityId,
  parsePresetMarketplaceTemplateId,
  toPresetMarketplaceCapabilityId,
} from "@/lib/marketplace/presetMarketplaceCapabilityId";

describe("preset marketplace listings", () => {
  it("maps all 48 official templates to free marketplace listings", () => {
    const listings = listPresetMarketplaceListings();

    expect(listings).toHaveLength(48);
    expect(listings.every((listing) => listing.isOfficialPreset === true)).toBe(
      true,
    );
    expect(
      listings.every((listing) =>
        isOfficialPresetMarketplaceCapabilityId(listing.capabilityId),
      ),
    ).toBe(true);
  });

  it("uses stable preset capability ids", () => {
    expect(toPresetMarketplaceCapabilityId("weekly-team-status")).toBe(
      "preset:weekly-team-status",
    );
    expect(parsePresetMarketplaceTemplateId("preset:weekly-team-status")).toBe(
      "weekly-team-status",
    );
    expect(parsePresetMarketplaceTemplateId("cap-demo-assistant")).toBeNull();
  });

  it("builds borrow payloads with harness manifest content", () => {
    const template = findCapabilityTemplateById("weekly-team-status");

    expect(template).toBeDefined();

    const listing = buildPresetMarketplaceListing(template!);
    const borrow = buildPresetMarketplaceBorrowPayload(template!);

    expect(listing.harnessSetSlug).toBe(template!.harness.slug);
    expect(borrow.isOfficialPreset).toBe(true);
    expect(borrow.templateId).toBe("weekly-team-status");
    expect(borrow.harnessItemPaths).toHaveLength(5);
    expect(borrow.manifest.sets).toBeDefined();
  });
});
