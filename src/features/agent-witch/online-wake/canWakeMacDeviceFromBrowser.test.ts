import { describe, expect, it } from "vitest";

import { canWakeMacDeviceFromBrowser } from "@/features/agent-witch/macDevices/utils/canWakeMacDeviceFromBrowser";

describe("canWakeMacDeviceFromBrowser", () => {
  it("allows browser wake only for the local offline Mac", () => {
    expect(
      canWakeMacDeviceFromBrowser({
        deviceLabel: "Studio-Mac",
        localHostname: "studio-mac",
        isWakeServerReachable: true,
      }),
    ).toBe(true);
  });

  it("blocks browser wake for remote Macs", () => {
    expect(
      canWakeMacDeviceFromBrowser({
        deviceLabel: "Office-Mac",
        localHostname: "studio-mac",
        isWakeServerReachable: true,
      }),
    ).toBe(false);
  });
});
