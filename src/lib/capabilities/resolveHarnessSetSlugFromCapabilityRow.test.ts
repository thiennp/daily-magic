import { describe, expect, it } from "vitest";

import resolveHarnessSetSlugFromCapabilityRow from "@/lib/capabilities/resolveHarnessSetSlugFromCapabilityRow";

describe("resolveHarnessSetSlugFromCapabilityRow", () => {
  it("prefers component version harness slug", () => {
    expect(
      resolveHarnessSetSlugFromCapabilityRow({
        harness_set_slug_from_component: "playbook-demo",
        harness_set_slug: "legacy",
      }),
    ).toBe("playbook-demo");
  });

  it("falls back to legacy capability column for tests", () => {
    expect(
      resolveHarnessSetSlugFromCapabilityRow({
        harness_set_slug: "legacy-slug",
      }),
    ).toBe("legacy-slug");
  });
});
