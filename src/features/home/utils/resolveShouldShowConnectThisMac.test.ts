import { describe, expect, it } from "vitest";

import { resolveShouldShowConnectThisMac } from "@/features/home/utils/resolveShouldShowConnectThisMac";

const baseInput = {
  localTokenHash: null as string | null,
  isCheckingLocalHostname: false,
  isMobileBrowser: false,
  devices: [] as readonly { readonly tokenHash?: string | null }[],
};

describe("resolveShouldShowConnectThisMac (HOME-025/028)", () => {
  it("hides connect on non-Mac browsers without listed devices", () => {
    expect(
      resolveShouldShowConnectThisMac({
        ...baseInput,
        operatingSystem: "windows",
        localTokenHash: "abc",
        devices: [],
      }),
    ).toBe(false);
  });

  it("shows connect on non-Mac browsers with listed devices", () => {
    expect(
      resolveShouldShowConnectThisMac({
        ...baseInput,
        operatingSystem: "windows",
        devices: [{ tokenHash: "abc" }],
      }),
    ).toBe(true);
  });

  it("HOME-028: hides connect on mobile even when devices already exist", () => {
    expect(
      resolveShouldShowConnectThisMac({
        ...baseInput,
        operatingSystem: "other",
        isMobileBrowser: true,
        devices: [{ tokenHash: "abc" }],
      }),
    ).toBe(false);
  });

  it("shows connect on desktop Linux when devices already exist", () => {
    expect(
      resolveShouldShowConnectThisMac({
        ...baseInput,
        operatingSystem: "other",
        devices: [{ tokenHash: "abc" }],
      }),
    ).toBe(true);
  });

  it("hides connect on mobile when no devices exist yet", () => {
    expect(
      resolveShouldShowConnectThisMac({
        ...baseInput,
        operatingSystem: "other",
        isMobileBrowser: true,
        devices: [],
      }),
    ).toBe(false);
  });

  it("hides connect while identity is still loading", () => {
    expect(
      resolveShouldShowConnectThisMac({
        ...baseInput,
        operatingSystem: "mac",
        isCheckingLocalHostname: true,
        devices: [{ tokenHash: "abc" }],
      }),
    ).toBe(false);
  });

  it("shows connect when identity is unknown and no devices are listed", () => {
    expect(
      resolveShouldShowConnectThisMac({
        ...baseInput,
        operatingSystem: "mac",
        devices: [],
      }),
    ).toBe(true);
  });

  it("HOME-030: shows connect when no local token even if other devices exist", () => {
    expect(
      resolveShouldShowConnectThisMac({
        ...baseInput,
        operatingSystem: "mac",
        devices: [{ tokenHash: "abc" }],
      }),
    ).toBe(true);
  });
});
