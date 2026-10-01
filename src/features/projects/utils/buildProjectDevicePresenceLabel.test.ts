import { describe, expect, it } from "vitest";

import buildProjectDevicePresenceLabel from "@/features/projects/utils/buildProjectDevicePresenceLabel";

describe("buildProjectDevicePresenceLabel", () => {
  it("MF-05: formats offline copy as Offline on {MacName}", () => {
    const label = buildProjectDevicePresenceLabel({
      deviceDisplayName: "Thien MacBook",
      device: {
        isConnected: false,
        isOnline: false,
        presenceTier: "offline",
      },
      deviceLastSeenAt: new Date(Date.now() - 3_600_000).toISOString(),
      isThisMac: false,
    });

    expect(label.text.startsWith("Offline on Thien MacBook")).toBe(true);
    expect(label.text).toContain("last seen");
  });
});
