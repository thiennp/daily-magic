import { describe, expect, it, vi } from "vitest";

vi.mock("@/features/agent/hooks/fetchMyMacDevicesFromApi", () => ({
  loadMyMacDevicesSnapshot: vi.fn(async () => ({
    devices: [],
    hadError: false,
    serverInstallBundleVersion: null,
  })),
}));

import {
  hidePairedDeviceAfterRevoke,
  withoutRecentlyRevokedDevices,
} from "@/features/agent-witch/pairedDevicesResource";
import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";

/** d591ae31: a deleted computer disappears at once. */
describe("withoutRecentlyRevokedDevices", () => {
  it("drops a just-deleted computer even if a poll still lists it", () => {
    hidePairedDeviceAfterRevoke("dev-8f03");
    const snapshot = withoutRecentlyRevokedDevices({
      devices: [{ id: "dev-8f03" }, { id: "dev-9031" }] as MyMacDevice[],
      hadError: false,
      serverInstallBundleVersion: null,
    });
    expect(snapshot.devices.map((device) => device.id)).toEqual(["dev-9031"]);
  });
});
