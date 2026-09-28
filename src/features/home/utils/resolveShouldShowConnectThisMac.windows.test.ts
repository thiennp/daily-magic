import { describe, expect, it } from "vitest";

import { resolveShouldShowConnectThisMac } from "@/features/home/utils/resolveShouldShowConnectThisMac";

describe("resolveShouldShowConnectThisMac windows (HOME-055)", () => {
  it("shows connect on Windows with no devices yet", () => {
    expect(
      resolveShouldShowConnectThisMac({
        localTokenHash: null,
        isCheckingLocalHostname: false,
        isMobileBrowser: false,
        operatingSystem: "windows",
        devices: [],
      }),
    ).toBe(true);
  });
});
