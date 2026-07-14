import { describe, expect, it } from "vitest";

import shouldShowMyOfferingsPanel from "@/features/capabilities/shouldShowMyOfferingsPanel";

describe("shouldShowMyOfferingsPanel", () => {
  it("hides when the user has no company groups", () => {
    expect(shouldShowMyOfferingsPanel(0, 2)).toBe(false);
  });

  it("hides when the user has no workflows or agents to offer", () => {
    expect(shouldShowMyOfferingsPanel(1, 0)).toBe(false);
  });

  it("shows when the user belongs to a company and has offerings", () => {
    expect(shouldShowMyOfferingsPanel(1, 1)).toBe(true);
  });
});
