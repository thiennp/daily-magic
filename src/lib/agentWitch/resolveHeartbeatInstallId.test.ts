import { describe, expect, it } from "vitest";

import { resolveHeartbeatInstallId } from "@/lib/agentWitch/resolveAgentWitchHeartbeatPayload";

describe("resolveHeartbeatInstallId (61e9c49e)", () => {
  it("accepts a hex fingerprint", () => {
    expect(resolveHeartbeatInstallId({ installId: " ABCDEF0123456789 " })).toBe(
      "abcdef0123456789",
    );
  });

  it("rejects missing or malformed ids", () => {
    expect(resolveHeartbeatInstallId(undefined)).toBeNull();
    expect(resolveHeartbeatInstallId({ installId: 42 })).toBeNull();
    expect(resolveHeartbeatInstallId({ installId: "../etc" })).toBeNull();
  });
});
