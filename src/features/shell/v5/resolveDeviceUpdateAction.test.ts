import { describe, expect, it } from "vitest";

import { resolveDeviceUpdateAction } from "@/features/shell/v5/resolveDeviceUpdateAction";

describe("resolveDeviceUpdateAction (V5-2 Devices Update)", () => {
  it("hides Update when the device is current", () => {
    expect(
      resolveDeviceUpdateAction({
        needsUpdate: false,
        isOffline: true,
        canUpdateHere: true,
      }),
    ).toEqual({ kind: "hidden" });
  });

  it("disables Update with the offline reason for any offline device", () => {
    for (const canUpdateHere of [true, false]) {
      expect(
        resolveDeviceUpdateAction({
          needsUpdate: true,
          isOffline: true,
          canUpdateHere,
        }),
      ).toEqual({
        kind: "disabled",
        reason: "Offline — update when it's back.",
      });
    }
  });

  it("enables Update on This computer when online and behind", () => {
    expect(
      resolveDeviceUpdateAction({
        needsUpdate: true,
        isOffline: false,
        canUpdateHere: true,
      }),
    ).toEqual({ kind: "enabled" });
  });

  it("does not render a dead button for an online remote device", () => {
    expect(
      resolveDeviceUpdateAction({
        needsUpdate: true,
        isOffline: false,
        canUpdateHere: false,
      }),
    ).toEqual({ kind: "hidden" });
  });
});
