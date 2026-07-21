import { describe, expect, it } from "vitest";

import { resolveHomeDashboardMode } from "@/features/home/utils/resolveHomeDashboardMode";

describe("resolveHomeDashboardMode", () => {
  it("shows loading while devices are loading (HOME-003)", () => {
    expect(resolveHomeDashboardMode({ isLoading: true, deviceCount: 0 })).toBe(
      "loading",
    );
  });

  it("shows connect flow when no Mac is paired (HOME-003)", () => {
    expect(resolveHomeDashboardMode({ isLoading: false, deviceCount: 0 })).toBe(
      "connect",
    );
  });

  it("shows dashboard when Cursor Cloud is connected without a Mac", () => {
    expect(
      resolveHomeDashboardMode({
        isLoading: false,
        deviceCount: 0,
        hasCursorCloudConnection: true,
      }),
    ).toBe("dashboard");
  });

  it("shows full dashboard when at least one Mac is paired (HOME-003)", () => {
    expect(resolveHomeDashboardMode({ isLoading: false, deviceCount: 1 })).toBe(
      "dashboard",
    );
  });
});
