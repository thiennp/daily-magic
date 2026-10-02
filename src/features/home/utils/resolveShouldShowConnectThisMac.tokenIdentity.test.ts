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
        devices: [
          {
            tokenHash: "token-local",
            isConnected: true,
            isOnline: true,
            presenceTier: "live",
          },
        ],
      }),
    ).toBe(false);
  });

  it("HOME-062: shows connect when cookie hash only matches an offline claim", () => {
    expect(
      resolveShouldShowConnectThisMac({
        operatingSystem: "mac",
        localTokenHash: "stale-hash",
        isCheckingLocalHostname: false,
        isMobileBrowser: false,
        devices: [
          {
            tokenHash: "stale-hash",
            isConnected: false,
            isOnline: false,
            presenceTier: "offline",
          },
          {
            tokenHash: "live-hash",
            isConnected: true,
            isOnline: true,
            presenceTier: "live",
          },
        ],
      }),
    ).toBe(true);
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

  it("HOME-030: shows connect when local token is missing and devices exist", () => {
    expect(
      resolveShouldShowConnectThisMac({
        operatingSystem: "mac",
        localTokenHash: null,
        isCheckingLocalHostname: false,
        isMobileBrowser: false,
        devices: [{ tokenHash: "token-other" }],
      }),
    ).toBe(true);
  });
});
