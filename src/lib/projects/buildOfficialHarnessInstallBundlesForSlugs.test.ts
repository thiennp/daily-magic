import { describe, expect, it } from "vitest";

import { buildOfficialHarnessInstallBundlesForSlugs } from "@/lib/projects/buildOfficialHarnessInstallBundlesForSlugs";

describe("buildOfficialHarnessInstallBundlesForSlugs", () => {
  it("returns playbook file bytes for an official marketplace harness slug (MARKETPLACE-009)", () => {
    const bundles = buildOfficialHarnessInstallBundlesForSlugs([
      "template-freelancer-client-proposal",
    ]);

    expect(bundles).toHaveLength(1);
    expect(bundles[0]?.slug).toBe("template-freelancer-client-proposal");
    expect(bundles[0]?.items.length).toBeGreaterThan(0);
    expect(bundles[0]?.items.every((item) => item.content.length > 0)).toBe(
      true,
    );
  });

  it("skips slugs that are not official templates", () => {
    expect(
      buildOfficialHarnessInstallBundlesForSlugs(["not-a-template"]),
    ).toEqual([]);
  });
});
