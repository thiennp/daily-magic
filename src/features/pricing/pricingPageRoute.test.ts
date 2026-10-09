import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("pricing page route wiring", () => {
  it("keeps Marketplace and Connect visible in app shell (never hide)", () => {
    const nav = readFileSync(
      join(process.cwd(), "src/features/shell/appNav.constant.ts"),
      "utf8",
    );
    expect(nav.includes('label: "Marketplace"')).toBe(true);

    const devices = readFileSync(
      join(
        process.cwd(),
        "src/features/shell/v5/appShellComputersCopy.constant.ts",
      ),
      "utf8",
    );
    expect(devices.includes("Connect this computer")).toBe(true);
  });

  it("keeps My bots route/label available (nav rename deferred)", () => {
    const myBotsPage = readFileSync(
      join(process.cwd(), "src/app/(app)/my-bots/page.tsx"),
      "utf8",
    );
    expect(myBotsPage.length).toBeGreaterThan(0);
  });

  it("wires public pricing page through MarketingShell or AppShell", () => {
    const page = readFileSync(
      join(process.cwd(), "src/app/(app)/pricing/page.tsx"),
      "utf8",
    );
    expect(page.includes("MarketingShell")).toBe(true);
    expect(page.includes("AppShell")).toBe(true);
    expect(page.includes("PricingPageLayout")).toBe(true);
  });
});
