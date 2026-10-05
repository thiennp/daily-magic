import { describe, expect, it } from "vitest";

import isMobileClient from "@/lib/mobile/isMobileClient";
import { MOBILE_UA_FIXTURES as UA } from "@/lib/mobile/mobileUserAgentFixtures.constant";
import type MobileClientSignals from "@/lib/mobile/types/MobileClientSignals.type";

const desktop = (
  overrides: Partial<MobileClientSignals> = {},
): MobileClientSignals => ({
  userAgent: UA.macChrome,
  userAgentDataMobile: false,
  platform: "macOS",
  maxTouchPoints: 0,
  primaryPointerCoarse: false,
  anyPointerFine: true,
  viewportWidth: 1440,
  ...overrides,
});

describe("isMobileClient", () => {
  it("flags iPhone, Android phone, and iPad (legacy UA)", () => {
    for (const userAgent of [
      UA.iphoneSafari,
      UA.androidChrome,
      UA.ipadLegacySafari,
    ]) {
      expect(
        isMobileClient(
          desktop({
            userAgent,
            userAgentDataMobile: null,
            maxTouchPoints: 5,
            primaryPointerCoarse: true,
            anyPointerFine: false,
            viewportWidth: 1024,
          }),
        ),
      ).toBe(true);
    }
  });

  it("flags iPadOS desktop mode (Mac UA + multi-touch)", () => {
    expect(
      isMobileClient(
        desktop({
          userAgent: UA.ipadDesktopModeSafari,
          userAgentDataMobile: null,
          platform: "MacIntel",
          maxTouchPoints: 5,
          viewportWidth: 1180,
        }),
      ),
    ).toBe(true);
  });

  it("flags userAgentData.mobile === true", () => {
    expect(
      isMobileClient(
        desktop({ userAgent: UA.linuxChrome, userAgentDataMobile: true }),
      ),
    ).toBe(true);
  });

  it("flags a touch-only phone-width client with an unknown UA", () => {
    expect(
      isMobileClient(
        desktop({
          userAgent: "SomeBrowser/1.0",
          userAgentDataMobile: null,
          platform: null,
          maxTouchPoints: 5,
          primaryPointerCoarse: true,
          anyPointerFine: false,
          viewportWidth: 360,
        }),
      ),
    ).toBe(true);
  });
});
