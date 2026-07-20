import { describe, expect, it } from "vitest";

import { resolveShouldShowConnectThisMac } from "@/features/home/utils/resolveShouldShowConnectThisMac";

const baseInput = {
  localHostname: null as string | null,
  isCheckingLocalHostname: false,
  isMobileBrowser: false,
  devices: [] as readonly { readonly deviceLabel: string | null }[],
};

describe("resolveShouldShowConnectThisMac (HOME-025)", () => {
  it("hides connect on non-Mac browsers without listed devices", () => {
    expect(
      resolveShouldShowConnectThisMac({
        ...baseInput,
        operatingSystem: "windows",
        localHostname: "Studio-Mac",
        devices: [],
      }),
    ).toBe(false);
  });

  it("shows connect on non-Mac browsers with listed devices", () => {
    expect(
      resolveShouldShowConnectThisMac({
        ...baseInput,
        operatingSystem: "windows",
        devices: [{ deviceLabel: "Studio-Mac" }],
      }),
    ).toBe(true);
  });

  it("HOME-028: hides connect on mobile even when devices already exist", () => {
    expect(
      resolveShouldShowConnectThisMac({
        ...baseInput,
        operatingSystem: "other",
        isMobileBrowser: true,
        devices: [{ deviceLabel: "Office-iMac" }],
      }),
    ).toBe(false);
  });

  it("shows connect on desktop Linux when devices already exist", () => {
    expect(
      resolveShouldShowConnectThisMac({
        ...baseInput,
        operatingSystem: "other",
        devices: [{ deviceLabel: "Office-iMac" }],
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

  it("shows connect while hostname is still loading", () => {
    expect(
      resolveShouldShowConnectThisMac({
        ...baseInput,
        operatingSystem: "mac",
        isCheckingLocalHostname: true,
        devices: [{ deviceLabel: "Studio-Mac" }],
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

  it("hides connect when identity is unknown but devices already exist", () => {
    expect(
      resolveShouldShowConnectThisMac({
        ...baseInput,
        operatingSystem: "mac",
        devices: [{ deviceLabel: "L92KQX615Q" }],
      }),
    ).toBe(false);
  });

  it("shows connect when this Mac is not in the device list", () => {
    expect(
      resolveShouldShowConnectThisMac({
        ...baseInput,
        operatingSystem: "mac",
        localHostname: "L92KQX615Q",
        devices: [{ deviceLabel: "Office-iMac" }],
      }),
    ).toBe(true);
  });

  it("hides connect when a listed device matches this Mac", () => {
    expect(
      resolveShouldShowConnectThisMac({
        ...baseInput,
        operatingSystem: "mac",
        localHostname: "L92KQX615Q",
        devices: [{ deviceLabel: "L92KQX615Q" }],
      }),
    ).toBe(false);
  });
});
