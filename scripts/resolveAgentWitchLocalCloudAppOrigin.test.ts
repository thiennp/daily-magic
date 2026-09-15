import { describe, expect, it } from "vitest";

import { resolveAgentWitchLocalCloudAppOrigin } from "./resolveAgentWitchLocalCloudAppOrigin";

describe("resolveAgentWitchLocalCloudAppOrigin", () => {
  it("falls back to install appOrigin then production default", () => {
    expect(
      resolveAgentWitchLocalCloudAppOrigin({
        bundleVersion: "1",
        appOrigin: "https://www.agentwitch.com",
        updatedAt: "2026-01-01T00:00:00.000Z",
      }),
    ).toBe("https://www.agentwitch.com");
  });
});
