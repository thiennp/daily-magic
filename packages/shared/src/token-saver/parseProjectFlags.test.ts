import { describe, expect, it } from "vitest";

import { PROJECT_FEATURE_FLAG_DEFAULTS } from "./projectFlags.constant";
import { parseProjectFlags } from "./parseProjectFlags";

describe("parseProjectFlags", () => {
  it("returns defaults for an empty object", () => {
    expect(parseProjectFlags({})).toEqual(PROJECT_FEATURE_FLAG_DEFAULTS);
  });

  it("keeps known states and ignores unknown keys/values", () => {
    expect(
      parseProjectFlags({
        pitfalls: "off",
        preflight: "degraded",
        localMcp: "on",
        history: "weird",
        extra: "nope",
      }),
    ).toEqual({
      ...PROJECT_FEATURE_FLAG_DEFAULTS,
      pitfalls: "off",
      preflight: "degraded",
      localMcp: "on",
    });
  });

  it("returns null for non-objects", () => {
    expect(parseProjectFlags(null)).toBeNull();
    expect(parseProjectFlags("on")).toBeNull();
  });
});
