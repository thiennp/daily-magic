import { describe, expect, it } from "vitest";

import { resolveDeviceUpdateAction } from "@/features/shell/v5/resolveDeviceUpdateAction";

describe("resolveDeviceUpdateAction (V5-2 Computers Update)", () => {
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

  it("disables (never hides) Update with a reason for an online remote computer", () => {
    expect(
      resolveDeviceUpdateAction({
        needsUpdate: true,
        isOffline: false,
        canUpdateHere: false,
      }),
    ).toEqual({
      kind: "disabled",
      reason: "Update it from that computer.",
    });
  });
});
