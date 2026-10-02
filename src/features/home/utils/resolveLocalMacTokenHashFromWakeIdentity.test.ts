import { describe, expect, it } from "vitest";

import { resolveLocalMacTokenHashFromWakeIdentity } from "@/features/home/utils/resolveLocalMacTokenHashFromWakeIdentity";

describe("resolveLocalMacTokenHashFromWakeIdentity", () => {
  it("HOME-032: keeps current hash when wake active profile is another account", () => {
    expect(
      resolveLocalMacTokenHashFromWakeIdentity({
        currentTokenHash: "hash-b",
        activeTokenHash: "hash-a",
        localTokenHashes: ["hash-a", "hash-b"],
      }),
    ).toBe("hash-b");
  });

  it("HOME-032: does not guess when multiple local hashes and no current", () => {
    expect(
      resolveLocalMacTokenHashFromWakeIdentity({
        currentTokenHash: null,
        activeTokenHash: "hash-a",
        localTokenHashes: ["hash-a", "hash-b"],
      }),
    ).toBeNull();
  });

  it("HOME-032: adopts sole local hash when browser has none", () => {
    expect(
      resolveLocalMacTokenHashFromWakeIdentity({
        currentTokenHash: null,
        activeTokenHash: "hash-a",
        localTokenHashes: ["hash-a"],
      }),
    ).toBe("hash-a");
  });

  it("HOME-061: replaces stale cookie when wake only has the live install hash", () => {
    expect(
      resolveLocalMacTokenHashFromWakeIdentity({
        currentTokenHash: "stale-offline-claim",
        activeTokenHash: "live-install",
        localTokenHashes: ["live-install"],
      }),
    ).toBe("live-install");
  });

  it("HOME-061: clears stale cookie when multiple local hashes remain and no reachable hint", () => {
    expect(
      resolveLocalMacTokenHashFromWakeIdentity({
        currentTokenHash: "stale-offline-claim",
        activeTokenHash: "hash-a",
        localTokenHashes: ["hash-a", "hash-b"],
      }),
    ).toBeNull();
  });

  it("HOME-064: adopts sole reachable local hash for orphan install-token cookies", () => {
    expect(
      resolveLocalMacTokenHashFromWakeIdentity({
        currentTokenHash: "orphan-install-token-claim",
        activeTokenHash: "active-profile-hash",
        localTokenHashes: ["active-profile-hash", "live-profile-hash"],
        soleReachableLocalTokenHash: "live-profile-hash",
        currentTokenHashMatchesReachableDevice: false,
        activeTokenHashMatchesReachableDevice: false,
      }),
    ).toBe("live-profile-hash");
  });

  it("HOME-063: adopts active profile hash when cookie is another local profile and only active is reachable", () => {
    expect(
      resolveLocalMacTokenHashFromWakeIdentity({
        currentTokenHash: "legacy-profile-hash",
        activeTokenHash: "live-active-profile-hash",
        localTokenHashes: ["live-active-profile-hash", "legacy-profile-hash"],
        currentTokenHashMatchesReachableDevice: false,
        activeTokenHashMatchesReachableDevice: true,
      }),
    ).toBe("live-active-profile-hash");
  });

  it("HOME-063: keeps current when it is the reachable match even if active differs", () => {
    expect(
      resolveLocalMacTokenHashFromWakeIdentity({
        currentTokenHash: "hash-b",
        activeTokenHash: "hash-a",
        localTokenHashes: ["hash-a", "hash-b"],
        currentTokenHashMatchesReachableDevice: true,
        activeTokenHashMatchesReachableDevice: false,
      }),
    ).toBe("hash-b");
  });
});
