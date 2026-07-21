import { describe, expect, it } from "vitest";

import {
  buildMacDeviceDisplayNameById,
  isGenericMacDeviceLabel,
  resolveMacDeviceDisplayName,
} from "@/features/agent-witch/utils/resolveMacDeviceDisplayName";

describe("resolveMacDeviceDisplayName", () => {
  it("uses the hostname when it is specific", () => {
    expect(
      resolveMacDeviceDisplayName({
        deviceLabel: "Studio-MacBook-Pro",
      }),
    ).toBe("Studio-MacBook-Pro");
  });

  it("falls back to Your Mac for a generic label", () => {
    expect(
      resolveMacDeviceDisplayName({
        deviceLabel: "Mac",
        deviceCount: 1,
      }),
    ).toBe("Your Mac");
  });

  it("numbers unnamed Macs when there are several", () => {
    const names = buildMacDeviceDisplayNameById([
      { id: "a", deviceLabel: "Mac" },
      { id: "b", deviceLabel: null },
    ]);

    expect(names.get("a")).toBe("Your Mac");
    expect(names.get("b")).toBe("Mac 2");
  });

  it("treats Mac and Local agent as generic", () => {
    expect(isGenericMacDeviceLabel("Mac")).toBe(true);
    expect(isGenericMacDeviceLabel("Local agent")).toBe(true);
    expect(isGenericMacDeviceLabel("Office iMac")).toBe(false);
  });

  it("AGENT-048: strips macOS username from composite install labels in UI fallback", () => {
    expect(
      resolveMacDeviceDisplayName({
        deviceLabel: "L92KQX615Q#thiennguyen",
      }),
    ).toBe("L92KQX615Q");
  });
});
