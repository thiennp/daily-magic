import { describe, expect, it } from "vitest";

import { formatAgentWitchInstallBundleVersionLabel } from "./formatAgentWitchInstallBundleVersionLabel";

describe("formatAgentWitchInstallBundleVersionLabel", () => {
  it("returns the bundle version when present", () => {
    expect(
      formatAgentWitchInstallBundleVersionLabel({
        bundleVersion: "33",
        appOrigin: "https://app.example.com",
        updatedAt: "2026-07-19T10:00:00.000Z",
      }),
    ).toBe("33");
  });

  it("returns unknown when install version is missing", () => {
    expect(formatAgentWitchInstallBundleVersionLabel(null)).toBe("unknown");
  });
});
