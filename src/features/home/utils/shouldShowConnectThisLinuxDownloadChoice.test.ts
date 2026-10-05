import { describe, expect, it } from "vitest";

import { shouldShowConnectThisLinuxDownloadChoice } from "@/features/home/utils/shouldShowConnectThisLinuxDownloadChoice";

describe("shouldShowConnectThisLinuxDownloadChoice", () => {
  it("shows on desktop Linux", () => {
    expect(
      shouldShowConnectThisLinuxDownloadChoice({
        operatingSystem: "linux",
        isMobile: false,
      }),
    ).toBe(true);
  });

  it("hides on mobile even when OS reports linux", () => {
    expect(
      shouldShowConnectThisLinuxDownloadChoice({
        operatingSystem: "linux",
        isMobile: true,
      }),
    ).toBe(false);
  });

  it("hides on Mac and Windows", () => {
    expect(
      shouldShowConnectThisLinuxDownloadChoice({
        operatingSystem: "mac",
        isMobile: false,
      }),
    ).toBe(false);
    expect(
      shouldShowConnectThisLinuxDownloadChoice({
        operatingSystem: "windows",
        isMobile: false,
      }),
    ).toBe(false);
  });
});
