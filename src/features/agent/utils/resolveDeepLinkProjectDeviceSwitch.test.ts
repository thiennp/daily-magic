import { describe, expect, it } from "vitest";

import { resolveDeepLinkProjectDeviceSwitch } from "@/features/agent/utils/resolveDeepLinkProjectDeviceSwitch";

describe("resolveDeepLinkProjectDeviceSwitch (5c30842c)", () => {
  const deviceIds = ["dev-8f03", "dev-9031"];

  it("switches to the computer the linked project is bound to", () => {
    expect(
      resolveDeepLinkProjectDeviceSwitch({
        projectDeviceId: "dev-9031",
        selectedDeviceId: "dev-8f03",
        deviceIds,
      }),
    ).toBe("dev-9031");
  });

  it("stays put when already there, unbound, or the computer is gone", () => {
    for (const projectDeviceId of ["dev-8f03", null, "dev-gone"]) {
      expect(
        resolveDeepLinkProjectDeviceSwitch({
          projectDeviceId,
          selectedDeviceId: "dev-8f03",
          deviceIds,
        }),
      ).toBeNull();
    }
  });
});
