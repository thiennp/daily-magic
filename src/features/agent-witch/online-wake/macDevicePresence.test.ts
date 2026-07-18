import { describe, expect, it } from "vitest";

import {
  buildMacDevicesStatusLine,
  canDispatchToMac,
  countMacPresenceTiers,
  pickAlternateDispatchReadyDeviceId,
  pickDefaultMacDeviceId,
  resolveMacPresenceTier,
} from "./macDevicePresence";

describe("macDevicePresence", () => {
  it("AGENT-001: treats live and recent tiers consistently for dispatch", () => {
    expect(resolveMacPresenceTier({ isConnected: true, isOnline: true })).toBe(
      "live",
    );
    expect(canDispatchToMac({ isConnected: true, isOnline: true })).toBe(true);

    expect(resolveMacPresenceTier({ isConnected: false, isOnline: true })).toBe(
      "recent",
    );
    expect(canDispatchToMac({ isConnected: false, isOnline: true })).toBe(
      false,
    );

    expect(
      resolveMacPresenceTier({ isConnected: false, isOnline: false }),
    ).toBe("offline");
  });

  it("counts presence tiers for the home devices summary", () => {
    expect(
      countMacPresenceTiers([
        { isConnected: true, isOnline: true },
        { isConnected: false, isOnline: true },
        { isConnected: false, isOnline: false },
      ]),
    ).toEqual({ live: 1, recent: 1, offline: 1 });
  });

  it("builds connected-first status copy", () => {
    expect(buildMacDevicesStatusLine({ live: 1, recent: 1, offline: 0 })).toBe(
      "1 connected · 1 seen recently · checks in every ~30s",
    );
    expect(buildMacDevicesStatusLine({ live: 0, recent: 2, offline: 0 })).toBe(
      "2 seen recently · open Agent Witch for a live connection",
    );
  });

  it("prefers dispatch-ready macs when picking defaults and alternates", () => {
    const devices = [
      { id: "offline-mac", isConnected: false, isOnline: false },
      { id: "live-mac", isConnected: true, isOnline: true },
      { id: "recent-mac", isConnected: false, isOnline: true },
    ];

    expect(pickDefaultMacDeviceId(devices)).toBe("live-mac");
    expect(pickAlternateDispatchReadyDeviceId(devices, "recent-mac")).toBe(
      "live-mac",
    );
  });
});
