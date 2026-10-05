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

describe("isMobileClient desktop safety", () => {
  it.each([
    ["macOS Chrome", desktop()],
    [
      "macOS Safari",
      desktop({ userAgent: UA.macSafari, userAgentDataMobile: null }),
    ],
    [
      "macOS Firefox",
      desktop({ userAgent: UA.macFirefox, userAgentDataMobile: null }),
    ],
    [
      "Windows Chrome",
      desktop({ userAgent: UA.windowsChrome, platform: "Windows" }),
    ],
    [
      "Windows touch laptop",
      desktop({
        userAgent: UA.windowsChrome,
        platform: "Windows",
        maxTouchPoints: 10,
        primaryPointerCoarse: true,
        anyPointerFine: true,
        viewportWidth: 700,
      }),
    ],
    ["narrow desktop window", desktop({ viewportWidth: 400 })],
  ])("never flags %s", (_label, signals) => {
    expect(isMobileClient(signals)).toBe(false);
  });

  it("treats a missing UA with desktop signals as desktop", () => {
    expect(
      isMobileClient(
        desktop({ userAgent: null, userAgentDataMobile: null, platform: null }),
      ),
    ).toBe(false);
  });
});
