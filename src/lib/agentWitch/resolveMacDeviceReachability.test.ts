import { describe, expect, it } from "vitest";

import {
  canDispatchToMacDevice,
  isMacDeviceReachableViaHeartbeat,
} from "./resolveMacDeviceReachability";

describe("resolveMacDeviceReachability", () => {
  it("treats a fresh heartbeat as reachable without a hub socket", () => {
    const lastSeenAt = new Date().toISOString();

    expect(isMacDeviceReachableViaHeartbeat({ lastSeenAt })).toBe(true);
    expect(
      canDispatchToMacDevice({
        isHubConnected: false,
        lastSeenAt,
      }),
    ).toBe(true);
  });

  it("prefers a live hub socket when present", () => {
    expect(
      canDispatchToMacDevice({
        isHubConnected: true,
        lastSeenAt: null,
      }),
    ).toBe(true);
  });
});
