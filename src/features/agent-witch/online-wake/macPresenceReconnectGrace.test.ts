import { describe, expect, it } from "vitest";

import { formatMacPresenceStatusLabel } from "@/features/agent-witch/online-wake/macDevicePresence";
import {
  MAC_PRESENCE_RECONNECTING_GRACE_MS,
  expireStaleReconnectingTier,
} from "@/features/agent-witch/online-wake/macPresenceReconnectGrace";

const NOW = Date.parse("2026-10-08T10:35:00.000Z");
const ago = (ms: number): string => new Date(NOW - ms).toISOString();

describe("expireStaleReconnectingTier (S8)", () => {
  it("keeps Reconnecting while the device heartbeat is fresh", () => {
    expect(
      expireStaleReconnectingTier("live_other_instance", ago(25_000), NOW),
    ).toBe("live_other_instance");
  });

  it("goes Offline once the reconnect grace has passed", () => {
    expect(
      expireStaleReconnectingTier(
        "live_other_instance",
        ago(MAC_PRESENCE_RECONNECTING_GRACE_MS + 1),
        NOW,
      ),
    ).toBe("offline");
  });

  it("leaves other tiers and unknown last-seen alone", () => {
    expect(expireStaleReconnectingTier("live", ago(600_000), NOW)).toBe("live");
    expect(expireStaleReconnectingTier("live_other_instance", null, NOW)).toBe(
      "live_other_instance",
    );
  });

  it("drives the device chip label", () => {
    expect(
      formatMacPresenceStatusLabel({
        isConnected: false,
        isOnline: true,
        presenceTier: "live_other_instance",
        lastSeenAt: new Date(Date.now() - 10 * 60_000).toISOString(),
      }),
    ).toBe("Offline");
  });
});
