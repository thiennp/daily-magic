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

  it("HOME-061: re-probes when cookie hash only matches an offline claim", () => {
    expect(
      resolveShouldProbeWakeIdentityInBrowser({
        localTokenHash: "stale",
        claimedDeviceCount: 2,
        probeSuppressed: false,
        localTokenHashMatchesReachableDevice: false,
      }),
    ).toBe(true);
  });

  it("HOME-061: re-probes stale cookie even when a prior probe was suppressed", () => {
    expect(
      resolveShouldProbeWakeIdentityInBrowser({
        localTokenHash: "stale",
        claimedDeviceCount: 2,
        probeSuppressed: true,
        localTokenHashMatchesReachableDevice: false,
      }),
    ).toBe(true);
  });

  it("HOME-061: still skips when cookie already matches a reachable Mac", () => {
    expect(
      resolveShouldProbeWakeIdentityInBrowser({
        localTokenHash: "live",
        claimedDeviceCount: 2,
        probeSuppressed: false,
        localTokenHashMatchesReachableDevice: true,
      }),
    ).toBe(false);
  });
});
