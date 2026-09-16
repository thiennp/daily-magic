import { describe, expect, it } from "vitest";

import { shouldShowMarketplaceVisitorEmptyState } from "@/features/marketplace/shouldShowMarketplaceVisitorEmptyState";

describe("shouldShowMarketplaceVisitorEmptyState (UX-P0b)", () => {
  it("shows visitor empty state on page when both listing groups are empty", () => {
    expect(
      shouldShowMarketplaceVisitorEmptyState("page", false, {
        officialCount: 0,
        teammateCount: 0,
      }),
    ).toBe(true);
  });

  it("does not show visitor empty state while loading", () => {
    expect(
      shouldShowMarketplaceVisitorEmptyState("page", true, {
        officialCount: 0,
        teammateCount: 0,
      }),
    ).toBe(false);
  });

  it("does not show visitor empty state when official presets exist", () => {
    expect(
      shouldShowMarketplaceVisitorEmptyState("page", false, {
        officialCount: 1,
        teammateCount: 0,
      }),
    ).toBe(false);
  });

  it("does not show visitor empty state in embedded panel", () => {
    expect(
      shouldShowMarketplaceVisitorEmptyState("embedded", false, {
        officialCount: 0,
        teammateCount: 0,
      }),
    ).toBe(false);
  });
});
