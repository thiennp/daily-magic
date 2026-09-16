import { describe, expect, it } from "vitest";

import {
  hasAnyWriterSendReadyMac,
  isMacWriterSendReady,
} from "./macDeviceWriterSendReady";

describe("isMacWriterSendReady (AW-READY-1)", () => {
  it("requires live tier and isDispatchReady", () => {
    expect(
      isMacWriterSendReady({
        isConnected: true,
        isOnline: true,
        presenceTier: "live",
        isDispatchReady: true,
      }),
    ).toBe(true);

    expect(
      isMacWriterSendReady({
        isConnected: true,
        isOnline: true,
        presenceTier: "live",
        isDispatchReady: false,
      }),
    ).toBe(false);
  });

  it("does not treat isOnline on live_other_instance as send-ready", () => {
    expect(
      isMacWriterSendReady({
        isConnected: false,
        isOnline: true,
        presenceTier: "live_other_instance",
        isDispatchReady: false,
      }),
    ).toBe(false);

    expect(
      hasAnyWriterSendReadyMac([
        {
          isConnected: false,
          isOnline: true,
          presenceTier: "live_other_instance",
        },
      ]),
    ).toBe(false);
  });
});
