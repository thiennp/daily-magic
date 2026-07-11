import { describe, expect, it } from "vitest";

import hashPairingToken from "./hashPairingToken";

describe("hashPairingToken", () => {
  it("returns a stable sha256 hex digest", () => {
    const firstHash = hashPairingToken("pair-token-1");
    const secondHash = hashPairingToken("pair-token-1");

    expect(firstHash).toBe(secondHash);
    expect(firstHash).toMatch(/^[a-f0-9]{64}$/);
  });

  it("trims whitespace before hashing", () => {
    expect(hashPairingToken(" token ")).toBe(hashPairingToken("token"));
  });
});
