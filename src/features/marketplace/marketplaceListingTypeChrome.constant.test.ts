import { describe, expect, it } from "vitest";

import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { resolveMarketplaceListingTypeChrome } from "@/features/marketplace/marketplaceListingTypeChrome.constant";

describe("resolveMarketplaceListingTypeChrome", () => {
  it("maps workflow to playbook chrome and agent to assistant chrome", () => {
    expect(resolveMarketplaceListingTypeChrome(CapabilityType.WORKFLOW).label).toBe(
      "Playbook",
    );
    expect(resolveMarketplaceListingTypeChrome(CapabilityType.AGENT).label).toBe(
      "Assistant",
    );
  });
});
