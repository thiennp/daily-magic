import { describe, expect, it } from "vitest";

import { deviceMatchesReachableLocalTokenHash } from "@/features/agent-witch/utils/deviceMatchesReachableLocalTokenHash";

describe("deviceMatchesReachableLocalTokenHash", () => {
  it("is false for hash match on offline device", () => {
    expect(
      deviceMatchesReachableLocalTokenHash(
        {
          tokenHash: "stale-hash",
          isConnected: false,
          isOnline: false,
          presenceTier: "offline",
        },
        "stale-hash",
      ),
    ).toBe(false);
  });

  it("is true for hash match on live device", () => {
    expect(
      deviceMatchesReachableLocalTokenHash(
        {
          tokenHash: "live-hash",
          isConnected: true,
          isOnline: true,
          presenceTier: "live",
        },
        "live-hash",
      ),
    ).toBe(true);
  });

  it("is false when presence tier is offline even if isConnected is stale", () => {
    expect(
      deviceMatchesReachableLocalTokenHash(
        {
          tokenHash: "stale-hash",
          isConnected: true,
          isOnline: false,
          presenceTier: "offline",
        },
        "stale-hash",
      ),
    ).toBe(false);
  });
});
