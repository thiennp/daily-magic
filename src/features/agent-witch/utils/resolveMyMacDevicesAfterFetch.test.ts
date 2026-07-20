import { describe, expect, it } from "vitest";

import { resolveMyMacDevicesAfterFetch } from "@/features/agent-witch/utils/resolveMyMacDevicesAfterFetch";

const device = {
  id: "device-1",
  deviceLabel: "Mac",
  displayName: null,
  claimedAt: "2026-01-01T00:00:00.000Z",
  lastSeenAt: null,
  isConnected: true,
  isOnline: true,
  lastHeartbeatAt: null,
  installBundleVersion: null,
};

describe("resolveMyMacDevicesAfterFetch", () => {
  it("keeps current devices when the API fetch fails", () => {
    expect(resolveMyMacDevicesAfterFetch([device], [], true)).toEqual([device]);
  });

  it("replaces devices when the API succeeds with an empty list", () => {
    expect(resolveMyMacDevicesAfterFetch([device], [], false)).toEqual([]);
  });

  it("replaces devices when the API succeeds with new data", () => {
    const next = [
      { ...device, id: "device-2", isConnected: false, isOnline: false },
    ];
    expect(resolveMyMacDevicesAfterFetch([device], next, false)).toEqual(next);
  });
});
