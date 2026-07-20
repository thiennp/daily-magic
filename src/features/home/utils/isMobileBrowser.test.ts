import { describe, expect, it } from "vitest";

import isMobileBrowser from "@/features/home/utils/isMobileBrowser";

describe("isMobileBrowser", () => {
  it("HOME-028: detects Android mobile user agents", () => {
    const originalNavigator = globalThis.navigator;

    Object.defineProperty(globalThis, "navigator", {
      configurable: true,
      value: {
        userAgent:
          "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36",
      },
    });

    expect(isMobileBrowser()).toBe(true);

    Object.defineProperty(globalThis, "navigator", {
      configurable: true,
      value: originalNavigator,
    });
  });

  it("HOME-028: does not treat desktop Linux as mobile", () => {
    const originalNavigator = globalThis.navigator;

    Object.defineProperty(globalThis, "navigator", {
      configurable: true,
      value: {
        userAgent:
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
      },
    });

    expect(isMobileBrowser()).toBe(false);

    Object.defineProperty(globalThis, "navigator", {
      configurable: true,
      value: originalNavigator,
    });
  });
});
