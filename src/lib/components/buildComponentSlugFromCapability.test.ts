import { describe, expect, it } from "vitest";

import buildComponentSlugFromCapability from "@/lib/components/buildComponentSlugFromCapability";

describe("buildComponentSlugFromCapability", () => {
  it("prefers harness_set_slug when present", () => {
    expect(
      buildComponentSlugFromCapability({
        name: "My Workflow",
        harnessSetSlug: "fsa-architecture",
      }),
    ).toBe("fsa-architecture");
  });

  it("derives slug from name when harness slug missing", () => {
    expect(
      buildComponentSlugFromCapability({
        name: "Daily Magic Review",
        harnessSetSlug: null,
      }),
    ).toBe("daily-magic-review");
  });
});
