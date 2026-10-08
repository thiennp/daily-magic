import { describe, expect, it, vi } from "vitest";

import { shouldOpenMacDeviceWakeModal } from "@/features/agent-witch/macDevices/utils/shouldOpenMacDeviceWakeModal";

/** 2a281d42: Delete in the ⋯ menu of an offline row opened the wake modal. */
describe("shouldOpenMacDeviceWakeModal (2a281d42)", () => {
  it("a portaled menu item (Delete) never opens the wake modal", () => {
    const currentTarget = {
      contains: vi.fn().mockReturnValue(false),
    } as unknown as EventTarget;
    const target = {
      closest: vi.fn(),
    } as unknown as EventTarget;

    expect(shouldOpenMacDeviceWakeModal(currentTarget, target)).toBe(false);
  });

  it("returns false for row actions target", () => {
    const currentTarget = {
      contains: vi.fn().mockReturnValue(true),
    } as unknown as EventTarget;
    const target = {
      closest: vi.fn().mockReturnValue({}),
    } as unknown as EventTarget;

    expect(shouldOpenMacDeviceWakeModal(currentTarget, target)).toBe(false);
  });

  it("returns true for plain row surface", () => {
    const currentTarget = {
      contains: vi.fn().mockReturnValue(true),
    } as unknown as EventTarget;
    const target = {
      closest: vi.fn().mockReturnValue(null),
    } as unknown as EventTarget;

    expect(shouldOpenMacDeviceWakeModal(currentTarget, target)).toBe(true);
  });

  it("returns false for null", () => {
    expect(shouldOpenMacDeviceWakeModal(null, null)).toBe(false);
  });
});
