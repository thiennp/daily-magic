import { describe, expect, it } from "vitest";

import { buildMacDeviceDetailText } from "@/features/agent-witch/macDevices/utils/buildMacDeviceDetailText";

describe("buildMacDeviceDetailText", () => {
  it("shows Online for live Macs with matching bundle", () => {
    expect(
      buildMacDeviceDetailText({
        device: {
          isConnected: true,
          isOnline: true,
          lastSeenAt: new Date().toISOString(),
          installBundleVersion: "34",
        },
        serverInstallBundleVersion: "34",
      }),
    ).toEqual({
      text: "Online · Bundle 34",
      isMismatch: false,
    });
  });

  it("AGENT-051: shows Offline with last seen for stale Macs", () => {
    const threeMinutesAgo = new Date(Date.now() - 3 * 60_000).toISOString();

    expect(
      buildMacDeviceDetailText({
        device: {
          isConnected: false,
          isOnline: false,
          lastSeenAt: threeMinutesAgo,
          installBundleVersion: "54",
        },
        serverInstallBundleVersion: "54",
      })?.text,
    ).toMatch(/^Offline · Last seen .* · Bundle 54$/);
  });

  it("flags a bundle mismatch with the cloud version", () => {
    expect(
      buildMacDeviceDetailText({
        device: {
          isConnected: true,
          isOnline: true,
          lastSeenAt: new Date().toISOString(),
          installBundleVersion: "33",
        },
        serverInstallBundleVersion: "34",
      }),
    ).toEqual({
      text: "Online · Bundle 33 · update available (cloud 34)",
      isMismatch: true,
    });
  });
});
