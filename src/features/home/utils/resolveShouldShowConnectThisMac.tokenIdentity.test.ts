import { describe, expect, it } from "vitest";

import { resolveShouldShowConnectThisMac } from "@/features/home/utils/resolveShouldShowConnectThisMac";

describe("resolveShouldShowConnectThisMac token identity (HOME-029)", () => {
  it("shows connect when local token is not in the device list", () => {
    expect(
      resolveShouldShowConnectThisMac({
        operatingSystem: "mac",
        localTokenHash: "token-local",
        isCheckingLocalHostname: false,
        isMobileBrowser: false,
        devices: [{ tokenHash: "token-other" }],
      }),
    ).toBe(true);
  });

  it("hides connect when a listed device matches local token hash", () => {
    expect(
      resolveShouldShowConnectThisMac({
        operatingSystem: "mac",
        localTokenHash: "token-local",
        isCheckingLocalHostname: false,
        isMobileBrowser: false,
        devices: [{ tokenHash: "token-local" }],
      }),
    ).toBe(false);
  });

  it("does not treat same hostname with different token as this Mac", () => {
    expect(
      resolveShouldShowConnectThisMac({
        operatingSystem: "mac",
        localTokenHash: "token-a",
        isCheckingLocalHostname: false,
        isMobileBrowser: false,
        devices: [{ tokenHash: "token-b" }],
      }),
    ).toBe(true);
  });
});
