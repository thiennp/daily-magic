import { describe, expect, it } from "vitest";

import { resolveShouldProbeWakeIdentityInBrowser } from "@/features/agent-witch/utils/resolveShouldProbeWakeIdentityInBrowser";

describe("resolveShouldProbeWakeIdentityInBrowser (HOME-052)", () => {
  it("skips when local token hash is already known", () => {
    expect(
      resolveShouldProbeWakeIdentityInBrowser({
        localTokenHash: "abc",
        claimedDeviceCount: 2,
        probeSuppressed: false,
      }),
    ).toBe(false);
  });

  it("skips when there are no claimed devices yet", () => {
    expect(
      resolveShouldProbeWakeIdentityInBrowser({
        localTokenHash: null,
        claimedDeviceCount: 0,
        probeSuppressed: false,
      }),
    ).toBe(false);
  });

  it("probes when token is missing and devices exist", () => {
    expect(
      resolveShouldProbeWakeIdentityInBrowser({
        localTokenHash: null,
        claimedDeviceCount: 1,
        probeSuppressed: false,
      }),
    ).toBe(true);
  });
});
