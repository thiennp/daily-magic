import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("MarketingHeaderNav mobile Escape", () => {
  it("closes #marketing-header-mobile-nav on Escape keydown", () => {
    const source = readFileSync(
      join(process.cwd(), "src/features/marketing/MarketingHeaderNav.tsx"),
      "utf8",
    );

    expect(source).toContain('event.key !== "Escape"');
    expect(source).toContain('addEventListener("keydown", handleKeyDown, true)');
    expect(source).toContain("setMobileOpen(false)");
    expect(source).toContain('id="marketing-header-mobile-nav"');
  });
});
