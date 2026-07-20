import { describe, expect, it } from "vitest";

import { buildMacDeviceDetailText } from "@/features/agent-witch/macDevices/utils/buildMacDeviceDetailText";

describe("buildMacDeviceDetailText", () => {
  it("shows matching bundle versions for online Macs", () => {
    expect(
      buildMacDeviceDetailText({
        device: {
          isOnline: true,
          lastSeenAt: new Date().toISOString(),
          installBundleVersion: "34",
        },
        serverInstallBundleVersion: "34",
      }),
    ).toEqual({
      text: "Bundle 34",
      isMismatch: false,
    });
  });

  it("flags a bundle mismatch with the cloud version", () => {
    expect(
      buildMacDeviceDetailText({
        device: {
          isOnline: true,
          lastSeenAt: new Date().toISOString(),
          installBundleVersion: "33",
        },
        serverInstallBundleVersion: "34",
      }),
    ).toEqual({
      text: "Bundle 33 · update available (cloud 34)",
      isMismatch: true,
    });
  });
});
