import { describe, expect, it } from "vitest";

import { shouldShowConnectThisLinuxDownloadChoice } from "@/features/home/utils/shouldShowConnectThisLinuxDownloadChoice";

describe("shouldShowConnectThisLinuxDownloadChoice", () => {
  it("shows on desktop Linux", () => {
    expect(
      shouldShowConnectThisLinuxDownloadChoice({
        operatingSystem: "linux",
        isMobile: false,
        isReleased: true,
      }),
    ).toBe(true);
  });

  it("hides on mobile even when OS reports linux", () => {
    expect(
      shouldShowConnectThisLinuxDownloadChoice({
        operatingSystem: "linux",
        isMobile: true,
        isReleased: true,
      }),
    ).toBe(false);
  });

  it("hides on Mac and Windows", () => {
    expect(
      shouldShowConnectThisLinuxDownloadChoice({
        operatingSystem: "mac",
        isMobile: false,
        isReleased: true,
      }),
    ).toBe(false);
    expect(
      shouldShowConnectThisLinuxDownloadChoice({
        operatingSystem: "windows",
        isMobile: false,
        isReleased: true,
      }),
    ).toBe(false);
  });

  it("hides on desktop Linux until the release exists", () => {
    expect(
      shouldShowConnectThisLinuxDownloadChoice({
        operatingSystem: "linux",
        isMobile: false,
        isReleased: false,
      }),
    ).toBe(false);
  });
});
