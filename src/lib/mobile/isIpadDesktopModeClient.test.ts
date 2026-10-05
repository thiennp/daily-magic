import { describe, expect, it } from "vitest";

import isIpadDesktopModeClient from "@/lib/mobile/isIpadDesktopModeClient";
import { MOBILE_UA_FIXTURES as UA } from "@/lib/mobile/mobileUserAgentFixtures.constant";

describe("isIpadDesktopModeClient", () => {
  it("flags a Mac UA with multi-touch (iPadOS desktop mode)", () => {
    expect(
      isIpadDesktopModeClient({
        platform: "MacIntel",
        userAgent: UA.ipadDesktopModeSafari,
        maxTouchPoints: 5,
      }),
    ).toBe(true);
  });

  it("never flags a real Mac (no touch points)", () => {
    for (const userAgent of [UA.macSafari, UA.macChrome, UA.macFirefox]) {
      expect(
        isIpadDesktopModeClient({
          platform: "MacIntel",
          userAgent,
          maxTouchPoints: 0,
        }),
      ).toBe(false);
    }
  });

  it("never flags a Windows touch laptop", () => {
    expect(
      isIpadDesktopModeClient({
        platform: "Win32",
        userAgent: UA.windowsChrome,
        maxTouchPoints: 10,
      }),
    ).toBe(false);
  });

  it("handles missing platform and UA", () => {
    expect(
      isIpadDesktopModeClient({
        platform: null,
        userAgent: null,
        maxTouchPoints: 5,
      }),
    ).toBe(false);
  });
});
