import { describe, expect, it } from "vitest";

import { isAgentWitchConnectPlaceholder } from "@/lib/agentWitch/isAgentWitchConnectPlaceholder";

const pending = {
  isConnected: false,
  isOnline: false,
  installBundleVersion: null,
  deviceLabel: null,
  displayName: null,
};

describe("isAgentWitchConnectPlaceholder (c689f75d)", () => {
  it("flags a pairing that never checked in", () => {
    expect(isAgentWitchConnectPlaceholder(pending)).toBe(true);
  });

  it("keeps real computers, online or offline", () => {
    expect(
      isAgentWitchConnectPlaceholder({
        ...pending,
        installBundleVersion: "247",
      }),
    ).toBe(false);
    expect(
      isAgentWitchConnectPlaceholder({
        ...pending,
        deviceLabel: "Grey - Study",
      }),
    ).toBe(false);
    expect(
      isAgentWitchConnectPlaceholder({ ...pending, isConnected: true }),
    ).toBe(false);
  });
});
