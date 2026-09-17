import { describe, expect, it } from "vitest";

import {
  MARKETING_ANNOUNCEMENT_BAR_CLASSES,
  MARKETING_BUTTON_PRIMARY_CLASSES,
  MARKETING_DESIGN_SYSTEM_VERSION,
  MARKETING_EYEBROW_CLASSES,
  MARKETING_PAGE_BACKGROUND_CLASSES,
} from "@/features/marketing/marketingDesignSystem.constant";

describe("marketingDesignSystem.constant", () => {
  it("MARKETING-006 pins a marketing design system version for styleguide docs", () => {
    expect(MARKETING_DESIGN_SYSTEM_VERSION).toMatch(/^\d{4}-\d{2}$/);
  });

  it("MARKETING-006 uses brand-primary CTAs and blue eyebrows on light surfaces", () => {
    expect(MARKETING_PAGE_BACKGROUND_CLASSES).toContain("bg-gray-50");
    expect(MARKETING_EYEBROW_CLASSES).toContain("text-brand-700");
    expect(MARKETING_BUTTON_PRIMARY_CLASSES).toContain("bg-brand-600");
  });

  it("MARKETING-007 exposes a navy announcement bar for enterprise landing", () => {
    expect(MARKETING_ANNOUNCEMENT_BAR_CLASSES).toContain("bg-gray-950");
    expect(MARKETING_ANNOUNCEMENT_BAR_CLASSES).toContain("text-center");
  });
});
