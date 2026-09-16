import { describe, expect, it } from "vitest";

import { resolveSendReadinessBanner } from "@/features/agent/send-readiness/resolveSendReadinessBanner";
import { readinessBannerBaseInput } from "@/features/agent/send-readiness/resolveSendReadinessBanner.fixtures";

describe("resolveSendReadinessBanner tiers", () => {
  it("RDY-LIVE: no blocking banner when live and dispatch-ready", () => {
    expect(resolveSendReadinessBanner(readinessBannerBaseInput)).toBeNull();
  });

  it("RDY-OTHER-CONNECTING and RDY-OTHER-FAIL", () => {
    expect(
      resolveSendReadinessBanner({
        ...readinessBannerBaseInput,
        selectedDeviceId: "mac-other",
        devices: [
          {
            id: "mac-other",
            isConnected: false,
            isOnline: true,
            presenceTier: "live_other_instance",
          },
        ],
        relayState: "connecting",
      })?.reasonCode,
    ).toBe("live_other_instance_connecting");

    expect(
      resolveSendReadinessBanner({
        ...readinessBannerBaseInput,
        selectedDeviceId: "mac-other",
        devices: [
          {
            id: "mac-other",
            isConnected: false,
            isOnline: true,
            presenceTier: "live_other_instance",
          },
        ],
        relayState: "failed",
      })?.reasonCode,
    ).toBe("live_other_instance_failed");
  });

  it("RDY-RECENT and RDY-OFFLINE", () => {
    expect(
      resolveSendReadinessBanner({
        ...readinessBannerBaseInput,
        devices: [
          {
            id: "mac-live",
            isConnected: false,
            isOnline: true,
            presenceTier: "recent",
          },
        ],
      })?.reasonCode,
    ).toBe("recent");

    expect(
      resolveSendReadinessBanner({
        ...readinessBannerBaseInput,
        devices: [
          {
            id: "mac-live",
            isConnected: false,
            isOnline: false,
            presenceTier: "offline",
          },
        ],
      })?.reasonCode,
    ).toBe("offline");
  });
});
