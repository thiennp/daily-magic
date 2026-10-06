import { describe, expect, it } from "vitest";

import { resolveHomeMacDeviceRowConnectFooter } from "@/features/home/utils/resolveHomeMacDeviceRowConnectFooter";
import { resolveHomeThisMacDeviceIdentity } from "@/features/home/utils/resolveHomeThisMacDeviceIdentity";

const offline = {
  isConnected: false,
  isOnline: false,
  presenceTier: "offline" as const,
};
const live = {
  isConnected: true,
  isOnline: true,
  presenceTier: "live" as const,
};

describe("resolveHomeThisMacDeviceIdentity (single This computer row)", () => {
  it("badges the offline token-matched row instead of adding a second Connect row", () => {
    expect(
      resolveHomeThisMacDeviceIdentity({
        localTokenHash: "hash-a",
        devices: [
          { id: "other", tokenHash: "hash-b", ...live },
          { id: "mine", tokenHash: "HASH-A", ...offline },
        ],
      }),
    ).toEqual({ thisMacDeviceId: "mine", isReachable: false });
  });

  it("prefers a live match over a stale offline placeholder (HOME-062)", () => {
    expect(
      resolveHomeThisMacDeviceIdentity({
        localTokenHash: "hash-a",
        devices: [
          { id: "stale", tokenHash: "hash-a", ...offline },
          { id: "live", tokenHash: "hash-a", ...live },
        ],
      }),
    ).toEqual({ thisMacDeviceId: "live", isReachable: true });
  });

  it("returns no row without a local token", () => {
    expect(
      resolveHomeThisMacDeviceIdentity({
        localTokenHash: null,
        devices: [{ id: "mine", tokenHash: "hash-a", ...live }],
      }),
    ).toEqual({ thisMacDeviceId: null, isReachable: false });
  });
});

describe("resolveHomeMacDeviceRowConnectFooter", () => {
  it("puts Connect this computer on an offline or too-old This computer row", () => {
    expect(
      resolveHomeMacDeviceRowConnectFooter({
        isThisMac: true,
        isThisMacReachable: false,
      }),
    ).toBe("connect_this_mac");
    expect(
      resolveHomeMacDeviceRowConnectFooter({
        isThisMac: true,
        isThisMacReachable: true,
        connectVersionStatus: "too_old",
      }),
    ).toBe("connect_this_mac");
    expect(
      resolveHomeMacDeviceRowConnectFooter({
        isThisMac: true,
        isThisMacReachable: true,
        connectVersionStatus: "ok",
      }),
    ).toBeNull();
  });

  it("notes too-old on other rows", () => {
    expect(
      resolveHomeMacDeviceRowConnectFooter({
        isThisMac: false,
        isThisMacReachable: false,
        connectVersionStatus: "too_old",
      }),
    ).toBe("too_old_note");
  });
});
