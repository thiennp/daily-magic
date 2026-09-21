import { describe, expect, it } from "vitest";

import { wrapPromptForMarketplaceRunWriteStage } from "@/lib/marketplace/runRecipe/wrapPromptForMarketplaceRunWriteStage";

describe("wrapPromptForMarketplaceRunWriteStage", () => {
  it("adds Reports outcome instructions for vibe-coding recipe", () => {
    const wrapped = wrapPromptForMarketplaceRunWriteStage(
      "Build settings page",
      "vibe-coding-app-feature",
    );

    expect(wrapped).toContain("write/implement stage");
    expect(wrapped).toContain("Library/Reports");
    expect(wrapped).toContain("Do not emit [[NEXT_ACTIONS]]");
  });
});
