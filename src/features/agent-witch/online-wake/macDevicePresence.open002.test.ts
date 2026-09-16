import { describe, expect, it } from "vitest";

import {
  countDispatchReadyMacs,
  formatMacPresenceStatusLabel,
  hasAnyDispatchReadyMac,
  shouldOfferMacOfflineWakeHint,
} from "./macDevicePresence";

describe("macDevicePresence OPEN-002", () => {
  it("labels live_other_instance as reconnecting even when isOnline is false", () => {
    expect(
      formatMacPresenceStatusLabel({
        isConnected: false,
        isOnline: false,
        presenceTier: "live_other_instance",
      }),
    ).toBe("Reconnecting (another server)");
    expect(
      shouldOfferMacOfflineWakeHint({
        isConnected: false,
        isOnline: false,
        presenceTier: "live_other_instance",
      }),
    ).toBe(false);
  });

  it("counts dispatch-ready macs by presence tier, not row count", () => {
    const devices = [
      { isConnected: false, isOnline: false },
      {
        isConnected: false,
        isOnline: true,
        presenceTier: "live_other_instance" as const,
      },
      { isConnected: false, isOnline: true },
    ];

    expect(hasAnyDispatchReadyMac(devices)).toBe(true);
    expect(countDispatchReadyMacs(devices)).toBe(1);
  });
});
