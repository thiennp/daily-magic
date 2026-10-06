import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import {
  HOME_ONBOARDING_ENTRY_HREF,
  HOME_ONBOARDING_ENTRY_LABEL,
} from "@/features/home/constants/homeOnboardingEntryCta.constant";

describe("HomeDashboardHero onboarding entry CTA", () => {
  it("keeps Connect this computer and adds parallel Get started → /onboarding/project", () => {
    const source = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "HomeDashboardHero.tsx"),
      "utf8",
    );

    expect(source).toContain("ConnectThisMacButton");
    expect(source).toContain("HomeMacSettingsLink");
    expect(source).toContain("HOME_ONBOARDING_ENTRY_HREF");
    expect(source).toContain("HOME_ONBOARDING_ENTRY_LABEL");
    expect(source).not.toContain("shouldShowConnectThisMac ? null");
  });

  it("locks Product EN entry href and Get started label", () => {
    expect(HOME_ONBOARDING_ENTRY_HREF).toBe("/onboarding/project");
    expect(HOME_ONBOARDING_ENTRY_LABEL).toBe("Get started");
  });
});
