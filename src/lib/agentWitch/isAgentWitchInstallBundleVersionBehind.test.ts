import { describe, expect, it } from "vitest";

import { isAgentWitchInstallBundleVersionBehind } from "@/lib/agentWitch/isAgentWitchInstallBundleVersionBehind";

describe("isAgentWitchInstallBundleVersionBehind", () => {
  it("returns true when the Mac bundle is older than the server bundle", () => {
    expect(isAgentWitchInstallBundleVersionBehind("33", "34")).toBe(true);
  });

  it("returns false when versions match", () => {
    expect(isAgentWitchInstallBundleVersionBehind("34", "34")).toBe(false);
  });

  it("returns true when the Mac version is unknown", () => {
    expect(isAgentWitchInstallBundleVersionBehind(null, "34")).toBe(true);
  });
});
