import { describe, expect, it } from "vitest";

import {
  MARKETING_HEADER_LINK_CLASSES,
  MARKETING_LIGHT_SURFACE_CLASS,
} from "@/features/marketing/marketingSurfaceClasses.constant";

describe("marketingSurfaceClasses.constant", () => {
  it("MARKETING-002 exposes a light-surface scope for marketing pages", () => {
    expect(MARKETING_LIGHT_SURFACE_CLASS).toBe("marketing-light-surface");
  });

  it("MARKETING-002 keeps header links on dark zinc without dark-mode overrides", () => {
    expect(MARKETING_HEADER_LINK_CLASSES).toContain("text-zinc-700");
    expect(MARKETING_HEADER_LINK_CLASSES).not.toContain("dark:");
  });
});
