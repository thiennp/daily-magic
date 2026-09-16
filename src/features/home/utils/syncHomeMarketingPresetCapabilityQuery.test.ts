import { describe, expect, it } from "vitest";

import {
  applyPresetCapabilityIdToSearchParams,
  buildPathWithSearchParams,
  removePresetCapabilityIdFromSearchParams,
} from "@/features/home/utils/syncHomeMarketingPresetCapabilityQuery";

describe("syncHomeMarketingPresetCapabilityQuery", () => {
  it("sets preset capabilityId on the marketing home query", () => {
    const params = applyPresetCapabilityIdToSearchParams(
      "vibe-coding-app-feature",
      new URLSearchParams("sendTask=1"),
    );

    expect(params.get("capabilityId")).toBe("preset:vibe-coding-app-feature");
    expect(params.get("sendTask")).toBe("1");
  });

  it("clears only matching preset capabilityId", () => {
    const params = removePresetCapabilityIdFromSearchParams(
      "vibe-coding-app-feature",
      new URLSearchParams("capabilityId=preset%3Avibe-coding-app-feature"),
    );

    expect(params.has("capabilityId")).toBe(false);
  });

  it("buildPathWithSearchParams omits empty query", () => {
    expect(buildPathWithSearchParams("/", new URLSearchParams())).toBe("/");
    expect(
      buildPathWithSearchParams(
        "/",
        new URLSearchParams("capabilityId=preset%3Ax"),
      ),
    ).toBe("/?capabilityId=preset%3Ax");
  });
});
