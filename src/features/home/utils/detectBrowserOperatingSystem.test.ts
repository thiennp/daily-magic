import { afterEach, describe, expect, it } from "vitest";

import detectBrowserOperatingSystem from "@/features/home/utils/detectBrowserOperatingSystem";

const setNavigator = (platform: string, userAgent: string): void => {
  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value: { platform, userAgent },
  });
};

describe("detectBrowserOperatingSystem", () => {
  afterEach(() => {
    Reflect.deleteProperty(globalThis, "navigator");
  });

  it("HOME-053: treats desktop Linux as linux", () => {
    setNavigator(
      "Linux x86_64",
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
    );

    expect(detectBrowserOperatingSystem()).toBe("linux");
  });

  it("does not treat Android as a Linux host", () => {
    setNavigator(
      "Linux armv8l",
      "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36",
    );

    expect(detectBrowserOperatingSystem()).toBe("other");
  });
});
