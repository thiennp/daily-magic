import { describe, expect, it } from "vitest";

import { isRemoteAgentWitchBundleVersionNewer } from "./agentWitchInstallVersion";

describe("isRemoteAgentWitchBundleVersionNewer", () => {
  it("treats missing local version as needing update", () => {
    expect(isRemoteAgentWitchBundleVersionNewer(null, "2")).toBe(true);
  });

  it("compares numeric bundle versions", () => {
    expect(isRemoteAgentWitchBundleVersionNewer("1", "2")).toBe(true);
    expect(isRemoteAgentWitchBundleVersionNewer("2", "2")).toBe(false);
    expect(isRemoteAgentWitchBundleVersionNewer("3", "2")).toBe(false);
  });

  it("falls back to string inequality for non-numeric versions", () => {
    expect(isRemoteAgentWitchBundleVersionNewer("alpha", "beta")).toBe(true);
    expect(isRemoteAgentWitchBundleVersionNewer("beta", "beta")).toBe(false);
  });
});
