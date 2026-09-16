import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("MarketplaceVisitorEmptyState (MUST 2)", () => {
  it("uses Create free account and Sign in CTAs with real auth entry points", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "src/features/marketplace/MarketplaceVisitorEmptyState.tsx",
      ),
      "utf8",
    );

    expect(source.includes("Create free account")).toBe(true);
    expect(source.includes("Sign in")).toBe(true);
    expect(source.includes("buildMarketingGetStartedHref")).toBe(true);
    expect(source.includes("buildSignInHrefFromSearchParams")).toBe(true);
    expect(source.includes("Get started")).toBe(false);
    expect(source.includes("/signup")).toBe(false);
  });
});
