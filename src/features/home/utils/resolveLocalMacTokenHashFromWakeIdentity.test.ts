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

  it("HOME-061: clears stale cookie when multiple local hashes remain", () => {
    expect(
      resolveLocalMacTokenHashFromWakeIdentity({
        currentTokenHash: "stale-offline-claim",
        activeTokenHash: "hash-a",
        localTokenHashes: ["hash-a", "hash-b"],
      }),
    ).toBeNull();
  });
});
