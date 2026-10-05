import { afterEach, describe, expect, it, vi } from "vitest";

import isMobileBrowser from "@/features/home/utils/isMobileBrowser";
import { MOBILE_UA_FIXTURES as UA } from "@/lib/mobile/mobileUserAgentFixtures.constant";

/** Same signal stub as `detectMobileClient` — `isMobileBrowser` is an alias. */
const stubBrowser = (input: {
  readonly userAgent: string;
  readonly maxTouchPoints: number;
  readonly coarse: boolean;
  readonly fine: boolean;
  readonly width: number;
  readonly platform?: string;
}): void => {
  vi.stubGlobal("navigator", {
    userAgent: input.userAgent,
    platform: input.platform ?? "",
    maxTouchPoints: input.maxTouchPoints,
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

describe("isMobileBrowser", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("HOME-028: aliases detectMobileClient for an Android phone UA", () => {
    stubBrowser({
      userAgent: UA.androidChrome,
      maxTouchPoints: 5,
      coarse: true,
      fine: false,
      width: 390,
    });

    expect(isMobileBrowser()).toBe(true);
  });

  it("HOME-028: aliases detectMobileClient for desktop Linux", () => {
    stubBrowser({
      userAgent: UA.linuxChrome,
      maxTouchPoints: 0,
      coarse: false,
      fine: true,
      width: 1280,
    });

    expect(isMobileBrowser()).toBe(false);
  });
});
