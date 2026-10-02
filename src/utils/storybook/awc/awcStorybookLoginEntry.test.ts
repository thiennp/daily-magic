import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { AWC_MARKETING_AND_AUTH_PAGE_ENTRIES } from "@/utils/storybook/awc/entries/awcMarketingAndAuthPages";

const marketingAuthEntriesSource = readFileSync(
  path.join(
    process.cwd(),
    "src/utils/storybook/awc/entries/awcMarketingAndAuthPages.tsx",
  ),
  "utf8",
);

describe("AWC login storybook entry", () => {
  it("uses LoginPageView, not the home marketing landing", () => {
    const loginEntry = AWC_MARKETING_AND_AUTH_PAGE_ENTRIES.find(
      (entry) => entry.id === "login",
    );
    expect(loginEntry?.path).toBe("/login");

    expect(marketingAuthEntriesSource).toMatch(
      /onlyReady\("login"[\s\S]*?<LoginPageView \/>/,
    );
    expect(marketingAuthEntriesSource).not.toMatch(
      /onlyReady\("login"[\s\S]*?HomeMarketingLanding/,
    );
  });

  it("keeps home-marketing on the guest landing only", () => {
    expect(marketingAuthEntriesSource).toMatch(
      /onlyReady\("home-marketing"[\s\S]*?<HomeMarketingLanding \/>/,
    );
  });
});
