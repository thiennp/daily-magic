import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

describe("HomeDashboardHero HN-H2 connect block", () => {
  it("lands the Home not-linked connect block and drops competing CTAs", () => {
    const source = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "HomeDashboardHero.tsx"),
      "utf8",
    );

    expect(source).toContain("HomeNotLinkedConnectBlock");
    expect(source).toContain("HomeRunningJobsPanel");
    expect(source).not.toContain("APP_SURFACE_CTA_PRIMARY_LG_CLASS");
    expect(source).not.toContain("HOME_ONBOARDING_ENTRY_HREF");
    expect(source).not.toContain("HomeMacSettingsLink");
    expect(source).not.toContain("HomeMacStatusBanner");
  });
});
