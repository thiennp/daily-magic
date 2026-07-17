import { describe, expect, it, vi } from "vitest";

import { isMacDeviceRowInteractiveTarget } from "@/features/agent-witch/macDevices/utils/isMacDeviceRowInteractiveTarget";

describe("isMacDeviceRowInteractiveTarget (MAC_DEVICES-001)", () => {
  it("returns false for null", () => {
    expect(isMacDeviceRowInteractiveTarget(null)).toBe(false);
  });

  it("returns true when closest matches row actions", () => {
    const target = {
      closest: vi.fn((selector: string) =>
        selector.includes("data-mac-device-row-actions") ? {} : null,
      ),
    } as unknown as Element;

    expect(isMacDeviceRowInteractiveTarget(target)).toBe(true);
  });

  it("returns false when closest finds nothing", () => {
    const target = {
      closest: vi.fn(() => null),
    } as unknown as Element;

    expect(isMacDeviceRowInteractiveTarget(target)).toBe(false);
  });
});
