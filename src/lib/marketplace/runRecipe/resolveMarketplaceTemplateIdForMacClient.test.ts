import { describe, expect, it } from "vitest";

import { resolveMarketplaceTemplateIdForMacClient } from "@/lib/marketplace/runRecipe/resolveMarketplaceTemplateIdForMacClient";

describe("resolveMarketplaceTemplateIdForMacClient", () => {
  it("prefers explicit marketplaceTemplateId", () => {
    expect(
      resolveMarketplaceTemplateIdForMacClient(
        "vibe-coding-app-feature",
        "preset:other",
      ),
    ).toBe("vibe-coding-app-feature");
  });

  it("derives template id from preset capabilityId when template id omitted", () => {
    expect(
      resolveMarketplaceTemplateIdForMacClient(
        null,
        "preset:vibe-coding-app-feature",
      ),
    ).toBe("vibe-coding-app-feature");
  });

  it("returns null when neither field resolves", () => {
    expect(
      resolveMarketplaceTemplateIdForMacClient(undefined, "cap-uuid"),
    ).toBeNull();
  });
});
