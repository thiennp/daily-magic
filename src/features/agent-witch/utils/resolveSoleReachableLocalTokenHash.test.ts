import { describe, expect, it } from "vitest";

import { resolveSoleReachableLocalTokenHash } from "@/features/agent-witch/utils/resolveSoleReachableLocalTokenHash";

describe("resolveSoleReachableLocalTokenHash (HOME-064)", () => {
  it("returns the hash when one reachable device matches a local install token", () => {
    expect(
      resolveSoleReachableLocalTokenHash({
        localTokenHashes: ["live-hash", "other-local"],
        devices: [
          {
            tokenHash: "live-hash",
            isConnected: true,
            isOnline: true,
            presenceTier: "live",
          },
          {
            tokenHash: "orphan-claim",
            isConnected: false,
            isOnline: false,
            presenceTier: "offline",
          },
        ],
      }),
    ).toBe("live-hash");
  });

  it("returns null when multiple reachable devices match local tokens", () => {
    expect(
      resolveSoleReachableLocalTokenHash({
        localTokenHashes: ["hash-a", "hash-b"],
        devices: [
          {
            tokenHash: "hash-a",
            isConnected: true,
            isOnline: true,
            presenceTier: "live",
          },
          {
            tokenHash: "hash-b",
            isConnected: true,
            isOnline: true,
            presenceTier: "live",
          },
        ],
      }),
    ).toBeNull();
  });
});
