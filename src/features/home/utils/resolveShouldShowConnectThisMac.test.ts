import { describe, expect, it } from "vitest";

import { resolveShouldShowConnectThisMac } from "@/features/home/utils/resolveShouldShowConnectThisMac";

describe("resolveShouldShowConnectThisMac (HOME-025)", () => {
  it("hides connect on non-Mac browsers without listed devices", () => {
    expect(
      resolveShouldShowConnectThisMac({
        operatingSystem: "windows",
        localHostname: "Studio-Mac",
        isCheckingLocalHostname: false,
        devices: [],
      }),
    ).toBe(false);
  });

  it("shows connect on non-Mac browsers with listed devices", () => {
    expect(
      resolveShouldShowConnectThisMac({
        operatingSystem: "windows",
        localHostname: null,
        isCheckingLocalHostname: false,
        devices: [{ deviceLabel: "Studio-Mac" }],
      }),
    ).toBe(true);
  });

  it("shows connect on mobile when devices already exist", () => {
    expect(
      resolveShouldShowConnectThisMac({
        operatingSystem: "other",
        localHostname: null,
        isCheckingLocalHostname: false,
        devices: [{ deviceLabel: "Office-iMac" }],
      }),
    ).toBe(true);
  });

  it("hides connect on mobile when no devices exist yet", () => {
    expect(
      resolveShouldShowConnectThisMac({
        operatingSystem: "other",
        localHostname: null,
        isCheckingLocalHostname: false,
        devices: [],
      }),
    ).toBe(false);
  });

  it("shows connect while hostname is still loading", () => {
    expect(
      resolveShouldShowConnectThisMac({
        operatingSystem: "mac",
        localHostname: null,
        isCheckingLocalHostname: true,
        devices: [{ deviceLabel: "Studio-Mac" }],
      }),
    ).toBe(false);
  });

  it("shows connect when identity is unknown and no devices are listed", () => {
    expect(
      resolveShouldShowConnectThisMac({
        operatingSystem: "mac",
        localHostname: null,
        isCheckingLocalHostname: false,
        devices: [],
      }),
    ).toBe(true);
  });

  it("hides connect when identity is unknown but devices already exist", () => {
    expect(
      resolveShouldShowConnectThisMac({
        operatingSystem: "mac",
        localHostname: null,
        isCheckingLocalHostname: false,
        devices: [{ deviceLabel: "L92KQX615Q" }],
      }),
    ).toBe(false);
  });

  it("shows connect when this Mac is not in the device list", () => {
    expect(
      resolveShouldShowConnectThisMac({
        operatingSystem: "mac",
        localHostname: "L92KQX615Q",
        isCheckingLocalHostname: false,
        devices: [{ deviceLabel: "Office-iMac" }],
      }),
    ).toBe(true);
  });

  it("hides connect when a listed device matches this Mac", () => {
    expect(
      resolveShouldShowConnectThisMac({
        operatingSystem: "mac",
        localHostname: "L92KQX615Q",
        isCheckingLocalHostname: false,
        devices: [{ deviceLabel: "L92KQX615Q" }],
      }),
    ).toBe(false);
  });
});
