import { describe, expect, it } from "vitest";

import isMobileRequest from "@/lib/mobile/isMobileRequest";
import { MOBILE_UA_FIXTURES as UA } from "@/lib/mobile/mobileUserAgentFixtures.constant";

const headersOf = (entries: Record<string, string>): Headers =>
  new Headers(entries);

describe("isMobileRequest", () => {
  it("is mobile for iPhone, Android, and iPad User-Agents", () => {
    expect(isMobileRequest(headersOf({ "user-agent": UA.iphoneSafari }))).toBe(
      true,
    );
    expect(isMobileRequest(headersOf({ "user-agent": UA.androidChrome }))).toBe(
      true,
    );
    expect(
      isMobileRequest(headersOf({ "user-agent": UA.ipadLegacySafari })),
    ).toBe(true);
  });

  it("is mobile when Sec-CH-UA-Mobile is ?1 even with a generic UA", () => {
    expect(
      isMobileRequest(
        headersOf({ "user-agent": UA.linuxChrome, "sec-ch-ua-mobile": "?1" }),
      ),
    ).toBe(true);
  });

  it("keeps a mobile UA mobile when the hint is ?0 (Android tablets)", () => {
    expect(
      isMobileRequest(
        headersOf({
          "user-agent": UA.androidTabletChrome,
          "sec-ch-ua-mobile": "?0",
        }),
      ),
    ).toBe(true);
  });

  it.each([UA.macChrome, UA.macSafari, UA.macFirefox, UA.windowsChrome])(
    "is desktop for %s with ?0 or no hint",
    (userAgent) => {
      expect(isMobileRequest(headersOf({ "user-agent": userAgent }))).toBe(
        false,
      );
      expect(
        isMobileRequest(
          headersOf({ "user-agent": userAgent, "sec-ch-ua-mobile": "?0" }),
        ),
      ).toBe(false);
    },
  );

  it("is desktop when both headers are missing", () => {
    expect(isMobileRequest(headersOf({}))).toBe(false);
  });
});
