import { describe, expect, it } from "vitest";

import isMobileUserAgent from "@/lib/mobile/isMobileUserAgent";
import { MOBILE_UA_FIXTURES as UA } from "@/lib/mobile/mobileUserAgentFixtures.constant";

describe("isMobileUserAgent", () => {
  it.each([
    ["iPhone Safari", UA.iphoneSafari],
    ["Android phone Chrome", UA.androidChrome],
    ["Android tablet Chrome", UA.androidTabletChrome],
    ["iPad (legacy UA)", UA.ipadLegacySafari],
  ])("flags %s as mobile", (_label, userAgent) => {
    expect(isMobileUserAgent(userAgent)).toBe(true);
  });

  it.each([
    ["macOS Chrome", UA.macChrome],
    ["macOS Safari", UA.macSafari],
    ["macOS Firefox", UA.macFirefox],
    ["Windows Chrome", UA.windowsChrome],
    ["Windows Firefox", UA.windowsFirefox],
    ["Windows Edge", UA.windowsEdge],
    ["Linux Chrome", UA.linuxChrome],
    ["iPad desktop-mode Safari (Mac UA)", UA.ipadDesktopModeSafari],
  ])("never flags %s as mobile", (_label, userAgent) => {
    expect(isMobileUserAgent(userAgent)).toBe(false);
  });

  it("treats a missing or empty UA as not mobile", () => {
    expect(isMobileUserAgent(null)).toBe(false);
    expect(isMobileUserAgent(undefined)).toBe(false);
    expect(isMobileUserAgent("")).toBe(false);
    expect(isMobileUserAgent("   ")).toBe(false);
  });
});
