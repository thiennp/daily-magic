import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/capabilities/capabilityQueries", () => ({
  getPublishedCapabilityById: vi.fn(),
}));

import { getPublishedCapabilityById } from "@/lib/capabilities/capabilityQueries";

import {
  resolveMarketplaceTemplateIdForDispatch,
  resolveMarketplaceTemplateIdFromCapabilityId,
} from "@/lib/marketplace/runRecipe/resolveMarketplaceRunRecipeForDispatch";

describe("resolveMarketplaceTemplateIdFromCapabilityId", () => {
  it("maps preset marketplace capability id to template id", () => {
    expect(
      resolveMarketplaceTemplateIdFromCapabilityId(
        "preset:vibe-coding-app-feature",
      ),
    ).toBe("vibe-coding-app-feature");
  });
});

describe("resolveMarketplaceTemplateIdForDispatch", () => {
  it("maps installed workflow capability harness slug to vibe-coding-app-feature", async () => {
    vi.mocked(getPublishedCapabilityById).mockResolvedValue({
      id: "cap-published-uuid",
      harnessSetSlug: "template-vibe-coding-app-feature",
    } as never);

    await expect(
      resolveMarketplaceTemplateIdForDispatch({
        capabilityId: "cap-published-uuid",
      }),
    ).resolves.toBe("vibe-coding-app-feature");
  });
});
