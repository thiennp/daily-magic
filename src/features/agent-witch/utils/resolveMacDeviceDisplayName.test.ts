import { describe, expect, it } from "vitest";

import {
  isGenericMacDeviceLabel,
  resolveMacDeviceDisplayName,
} from "@/features/agent-witch/utils/resolveMacDeviceDisplayName";
import { buildMacDeviceDisplayNameById } from "@/features/agent-witch/utils/buildMacDeviceDisplayNameById";

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

  it("disambiguates two devices sharing the same raw hostname", () => {
    const names = buildMacDeviceDisplayNameById([
      { id: "device-aaaa1111", deviceLabel: "MKX52CMWN7" },
      { id: "device-bbbb2222", deviceLabel: "MKX52CMWN7" },
    ]);

    const first = names.get("device-aaaa1111");
    const second = names.get("device-bbbb2222");

    expect(first).not.toBe(second);
    expect(first).toContain("MKX52CMWN7");
    expect(second).toContain("MKX52CMWN7");
  });

  it("AGENT-048: strips macOS username from composite install labels in UI fallback", () => {
    expect(
      resolveMacDeviceDisplayName({
        deviceLabel: "L92KQX615Q#thiennguyen",
      }),
    ).toBe("L92KQX615Q");
  });

  it("labels Linux hosts without pretending they are Macs", () => {
    expect(
      resolveMacDeviceDisplayName({
        deviceLabel: "cloud-vm#dev",
        platform: "linux",
        deviceCount: 1,
      }),
    ).toBe("Linux device");
  });
});
