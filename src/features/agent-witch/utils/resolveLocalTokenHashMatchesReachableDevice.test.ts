import { describe, expect, it } from "vitest";

import { resolveLocalTokenHashMatchesReachableDevice } from "@/features/agent-witch/utils/resolveLocalTokenHashMatchesReachableDevice";

describe("resolveLocalTokenHashMatchesReachableDevice (HOME-061)", () => {
  it("is false when the browser has no local token hash", () => {
    expect(
      resolveLocalTokenHashMatchesReachableDevice({
        localTokenHash: null,
        devices: [
          {
            tokenHash: "live-hash",
            isConnected: true,
            isOnline: true,
            presenceTier: "live",
          },
        ],
      }),
    ).toBe(false);
  });

  it("is true when the cookie hash matches a live device", () => {
    expect(
      resolveLocalTokenHashMatchesReachableDevice({
        localTokenHash: "live-hash",
        devices: [
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

  it("is false when the cookie hash only matches an offline claim", () => {
    expect(
      resolveLocalTokenHashMatchesReachableDevice({
        localTokenHash: "stale-hash",
        devices: [
          {
            tokenHash: "live-hash",
            isConnected: true,
            isOnline: true,
            presenceTier: "live",
          },
          {
            tokenHash: "stale-hash",
            isConnected: false,
            isOnline: false,
            presenceTier: "offline",
          },
        ],
      }),
    ).toBe(false);
  });
});
