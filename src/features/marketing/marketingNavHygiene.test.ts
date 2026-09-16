import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const PHANTOM_MARKETING_ROUTES: readonly string[] = [
  "/pricing",
  "/faq",
  "/signup",
  "/stories",
  "/blog",
  "/about",
  "/workflows",
  "/docs",
];

const MARKETING_NAV_SOURCES: readonly string[] = [
  "src/features/marketing/MarketingFooter.tsx",
  "src/features/marketing/MarketingHeaderNav.tsx",
  "src/features/marketing/resolveMarketingFooterNav.ts",
];

describe("marketing nav hygiene", () => {
  it("does not link to routes that are not implemented yet", () => {
    const offenders: string[] = [];

    for (const relativePath of MARKETING_NAV_SOURCES) {
      const source = readFileSync(join(process.cwd(), relativePath), "utf8");
      for (const route of PHANTOM_MARKETING_ROUTES) {
        if (source.includes(`"${route}"`) || source.includes(`'${route}'`)) {
          offenders.push(`${relativePath} links ${route}`);
        }
      }
    }

    expect(offenders).toEqual([]);
  });

  it("uses existing auth entry for get started CTA", () => {
    const headerSource = readFileSync(
      join(process.cwd(), "src/features/marketing/MarketingHeaderNav.tsx"),
      "utf8",
    );

    expect(headerSource.includes("/#get-started")).toBe(true);
    expect(headerSource.includes("/signup")).toBe(false);
  });
});
