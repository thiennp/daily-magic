import { describe, expect, it } from "vitest";

import { canWakeMacDeviceFromBrowser } from "./canWakeMacDeviceFromBrowser";

describe("canWakeMacDeviceFromBrowser", () => {
  it("allows cloud restart for offline Macs without localhost wake", () => {
    expect(
      canWakeMacDeviceFromBrowser({
        deviceLabel: "Thiens-MacBook",
        localHostname: null,
        isWakeServerReachable: false,
      }),
    ).toBe(true);
  });
});
