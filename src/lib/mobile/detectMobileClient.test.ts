import { afterEach, describe, expect, it, vi } from "vitest";

import detectMobileClient from "@/lib/mobile/detectMobileClient";
import { MOBILE_UA_FIXTURES as UA } from "@/lib/mobile/mobileUserAgentFixtures.constant";

const stubBrowser = (input: {
  readonly userAgent: string;
  readonly maxTouchPoints: number;
  readonly coarse: boolean;
  readonly fine: boolean;
  readonly width: number;
  readonly platform?: string;
  readonly userAgentDataMobile?: boolean;
}): void => {
  vi.stubGlobal("navigator", {
    userAgent: input.userAgent,
    platform: input.platform ?? "",
    maxTouchPoints: input.maxTouchPoints,
    ...(input.userAgentDataMobile === undefined
      ? {}
      : { userAgentData: { mobile: input.userAgentDataMobile } }),
  });
  vi.stubGlobal("window", {
    innerWidth: input.width,
    matchMedia: (query: string) => ({
      matches:
        query === "(pointer: coarse)"
          ? input.coarse
          : query === "(any-pointer: fine)"
            ? input.fine
            : false,
    }),
  });
};

describe("detectMobileClient", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns false on the server (no window)", () => {
    expect(detectMobileClient()).toBe(false);
  });

  it("reads browser signals and flags an iPhone", () => {
    stubBrowser({
      userAgent: UA.iphoneSafari,
      platform: "iPhone",
      maxTouchPoints: 5,
      coarse: true,
      fine: false,
      width: 390,
    });

    expect(detectMobileClient()).toBe(true);
  });

  it("reads userAgentData.mobile", () => {
    stubBrowser({
      userAgent: UA.linuxChrome,
      maxTouchPoints: 0,
      coarse: false,
      fine: true,
      width: 1280,
      userAgentDataMobile: true,
    });

    expect(detectMobileClient()).toBe(true);
  });

  it("keeps a desktop Mac browser as desktop", () => {
    stubBrowser({
      userAgent: UA.macSafari,
      platform: "MacIntel",
      maxTouchPoints: 0,
      coarse: false,
      fine: true,
      width: 1440,
      userAgentDataMobile: false,
    });

    expect(detectMobileClient()).toBe(false);
  });
});
