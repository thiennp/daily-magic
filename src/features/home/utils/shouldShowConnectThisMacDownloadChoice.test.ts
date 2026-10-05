import { describe, expect, it } from "vitest";

import { shouldShowConnectThisMacDownloadChoice } from "@/features/home/utils/shouldShowConnectThisMacDownloadChoice";

describe("shouldShowConnectThisMacDownloadChoice", () => {
  it("shows on desktop Mac", () => {
    expect(
      shouldShowConnectThisMacDownloadChoice({
        operatingSystem: "mac",
        isMobile: false,
      }),
    ).toBe(true);
  });

  it("hides on mobile even when OS reports mac", () => {
    expect(
      shouldShowConnectThisMacDownloadChoice({
        operatingSystem: "mac",
        isMobile: true,
      }),
    ).toBe(false);
  });

  it("hides on Linux and Windows", () => {
    expect(
      shouldShowConnectThisMacDownloadChoice({
        operatingSystem: "linux",
        isMobile: false,
      }),
    ).toBe(false);
    expect(
      shouldShowConnectThisMacDownloadChoice({
        operatingSystem: "windows",
        isMobile: false,
      }),
    ).toBe(false);
  });
});
