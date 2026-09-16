import { describe, expect, it } from "vitest";

import { resolveSendReadinessBanner } from "@/features/agent/send-readiness/resolveSendReadinessBanner";
import {
  liveReadyDevice,
  readinessBannerBaseInput,
} from "@/features/agent/send-readiness/resolveSendReadinessBanner.fixtures";

describe("resolveSendReadinessBanner priority and form", () => {
  it("RDY-UPDATE and RDY-PRIORITY", () => {
    expect(
      resolveSendReadinessBanner({
        ...readinessBannerBaseInput,
        serverInstallBundleVersion: "40",
        devices: [{ ...liveReadyDevice, installBundleVersion: "33" }],
      })?.reasonCode,
    ).toBe("update_needed");

    expect(
      resolveSendReadinessBanner({
        ...readinessBannerBaseInput,
        serverInstallBundleVersion: "40",
        dnsUnreachable: true,
        devices: [
          {
            id: "mac-live",
            isConnected: false,
            isOnline: false,
            presenceTier: "offline",
            installBundleVersion: "33",
          },
        ],
      })?.reasonCode,
    ).toBe("update_needed");
  });

  it("RDY-DNS, RDY-FORM, and WS guard", () => {
    expect(
      resolveSendReadinessBanner({
        ...readinessBannerBaseInput,
        dnsUnreachable: true,
        devices: [
          {
            id: "mac-live",
            isConnected: false,
            isOnline: false,
            presenceTier: "offline",
          },
        ],
      })?.reasonCode,
    ).toBe("unreachable_dns");

    expect(
      resolveSendReadinessBanner({
        ...readinessBannerBaseInput,
        serverInstallBundleVersion: "40",
        formPromptEmpty: true,
      })?.reasonCode,
    ).toBe("empty_prompt");

    expect(
      resolveSendReadinessBanner({
        ...readinessBannerBaseInput,
        browserConnectionReady: false,
      }),
    ).toBeNull();
  });

  it("isOnline on live_other_instance is not send-ready", () => {
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
      })?.reasonCode,
    ).toBe("live_other_instance_failed");
  });
});
