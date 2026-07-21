import { describe, expect, it } from "vitest";

import {
  MARKETING_HEADER_LINK_CLASSES,
  MARKETING_LIGHT_SURFACE_CLASS,
  MARKETING_TEXT_PRIMARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
} from "@/features/marketing/marketingSurfaceClasses.constant";

describe("marketingSurfaceClasses.constant", () => {
  it("MARKETING-002 exposes a light-surface scope for marketing pages", () => {
    expect(MARKETING_LIGHT_SURFACE_CLASS).toBe("marketing-light-surface");
  });

  it("MARKETING-002 keeps light-mode header link colors for marketing shells", () => {
    expect(MARKETING_HEADER_LINK_CLASSES).toContain("text-zinc-700");
    expect(MARKETING_HEADER_LINK_CLASSES).toContain("hover:text-zinc-900");
  });

  it("MARKETING-003 adds dark-mode text tokens for Home showcases outside light surface", () => {
    expect(MARKETING_TEXT_PRIMARY_CLASSES).toContain("text-zinc-900");
    expect(MARKETING_TEXT_PRIMARY_CLASSES).toContain("dark:text-white/90");
    expect(MARKETING_TEXT_SECONDARY_CLASSES).toContain("dark:text-gray-300");
    expect(MARKETING_HEADER_LINK_CLASSES).toContain("dark:text-gray-300");
  });
});
