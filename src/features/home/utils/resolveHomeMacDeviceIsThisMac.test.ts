import { describe, expect, it } from "vitest";

import { resolveHomeMacDeviceIsThisMac } from "@/features/home/utils/resolveHomeMacDeviceIsThisMac";

describe("resolveHomeMacDeviceIsThisMac (HOME-062)", () => {
  it("badges a live device when token hash matches", () => {
    expect(
      resolveHomeMacDeviceIsThisMac({
        localTokenHash: "live-hash",
        device: {
          tokenHash: "live-hash",
          isConnected: true,
          isOnline: true,
          presenceTier: "live",
        },
      }),
    ).toBe(true);
  });

  it("does not badge an offline placeholder with a stale matching hash", () => {
    expect(
      resolveHomeMacDeviceIsThisMac({
        localTokenHash: "stale-hash",
        device: {
          tokenHash: "stale-hash",
          isConnected: false,
          isOnline: false,
          presenceTier: "offline",
        },
      }),
    ).toBe(false);
  });
});
