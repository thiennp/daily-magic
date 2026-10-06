import { describe, expect, it } from "vitest";

import { resolveHomeMacStatusForBrowser } from "@/features/home/utils/resolveHomeMacStatusForBrowser";

const offlineDevice = {
  isConnected: false,
  isOnline: false,
  presenceTier: "offline" as const,
};

describe("resolveHomeMacStatusForBrowser (HOME-057)", () => {
  it("tells the user to connect when listed computers are offline and this computer is not linked", () => {
    const summary = resolveHomeMacStatusForBrowser({
      devices: [offlineDevice],
      shouldShowConnectThisMac: true,
    });

    expect(summary.label).toBe("This computer is not linked");
    expect(summary.detail).toContain("Connect this computer");
  });

  it("keeps the offline start-helper copy when this computer is already linked", () => {
    const summary = resolveHomeMacStatusForBrowser({
      devices: [offlineDevice],
      shouldShowConnectThisMac: false,
    });

    expect(summary.label).toBe("Mac offline");
  });

  it("keeps an online summary when another computer is live", () => {
    const summary = resolveHomeMacStatusForBrowser({
      devices: [{ isConnected: true, isOnline: true, presenceTier: "live" }],
      shouldShowConnectThisMac: true,
    });

    expect(summary.label).toBe("Mac online");
  });

  it("HOME-058: uses not-linked copy when another computer is only seen recently", () => {
    const summary = resolveHomeMacStatusForBrowser({
      devices: [{ isConnected: false, isOnline: true, presenceTier: "recent" }],
      shouldShowConnectThisMac: true,
    });

    expect(summary.label).toBe("This computer is not linked");
    expect(summary.detail).toContain("Connect this computer");
  });
});
