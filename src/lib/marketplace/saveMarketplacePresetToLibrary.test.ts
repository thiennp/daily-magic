import { beforeEach, describe, expect, it, vi } from "vitest";

import { saveMarketplacePresetToLibrary } from "@/lib/marketplace/saveMarketplacePresetToLibrary";

vi.mock("@/lib/capabilities/createCapabilityFromTemplate", () => ({
  default: vi.fn(),
}));

import createCapabilityFromTemplate from "@/lib/capabilities/createCapabilityFromTemplate";

describe("saveMarketplacePresetToLibrary", () => {
  beforeEach(() => {
    vi.mocked(createCapabilityFromTemplate).mockReset();
  });

  it("maps create failures to a structured error instead of throwing", async () => {
    vi.mocked(createCapabilityFromTemplate).mockRejectedValue(
      new Error("duplicate key value violates unique constraint"),
    );

    const result = await saveMarketplacePresetToLibrary({
      actorUserId: "user-1",
      templateId: "vibe-coding-app-feature",
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errorMessage).toContain("Library");
    }
  });
});
