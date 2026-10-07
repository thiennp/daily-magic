import { describe, expect, it } from "vitest";

import { resolveDeviceUpdateAction } from "@/features/shell/v5/resolveDeviceUpdateAction";

describe("resolveDeviceUpdateAction (HN-H3 Computers Update)", () => {
  it("hides Update when the device is current", () => {
    expect(
      resolveDeviceUpdateAction({
        needsUpdate: false,
        isOffline: true,
        canUpdateHere: true,
        latestVersion: "268",
      }),
    ).toEqual({ kind: "hidden" });
  });

  it("shows an amber Update badge for offline devices (no greyed button)", () => {
    for (const canUpdateHere of [true, false]) {
      expect(
        resolveDeviceUpdateAction({
          needsUpdate: true,
          isOffline: true,
          canUpdateHere,
          latestVersion: "268",
        }),
      ).toEqual({ kind: "badge", label: "Update v268" });
    }
  });

  it("enables Update on This computer when online and behind", () => {
    expect(
      resolveDeviceUpdateAction({
        needsUpdate: true,
        isOffline: false,
        canUpdateHere: true,
        latestVersion: "268",
      }),
    ).toEqual({ kind: "enabled", label: "Update to v268" });
  });

  it("shows a badge (not a disabled button) for an online remote computer", () => {
    expect(
      resolveDeviceUpdateAction({
        needsUpdate: true,
        isOffline: false,
        canUpdateHere: false,
        latestVersion: "268",
      }),
    ).toEqual({ kind: "badge", label: "Update v268" });
  });
});
