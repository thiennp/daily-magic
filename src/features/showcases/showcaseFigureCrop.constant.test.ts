import { describe, expect, it } from "vitest";

import { shouldPreferShowcaseSvgFallback } from "@/features/showcases/showcaseFigureCrop.constant";

describe("showcaseFigureCrop (SHOWCASES-010)", () => {
  it("keeps normal viewport screenshots on PNG", () => {
    expect(shouldPreferShowcaseSvgFallback(1440, 900)).toBe(false);
    expect(shouldPreferShowcaseSvgFallback(1440, 1201)).toBe(false);
  });

  it("falls back to curated SVG for full-page tall captures", () => {
    expect(shouldPreferShowcaseSvgFallback(1440, 6169)).toBe(true);
    expect(shouldPreferShowcaseSvgFallback(1440, 1999)).toBe(true);
  });
});
