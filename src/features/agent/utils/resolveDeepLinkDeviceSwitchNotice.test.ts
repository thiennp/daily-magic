import { describe, expect, it } from "vitest";

import { resolveDeepLinkDeviceSwitchNotice } from "@/features/agent/utils/resolveDeepLinkDeviceSwitchNotice";

const names = new Map([
  ["347a1364", "Linux device · 8F03"],
  ["4d58cce5", "Linux device · 9031"],
]);

describe("resolveDeepLinkDeviceSwitchNotice (77e29f7a)", () => {
  it("names both computers when the link's device was replaced", () => {
    expect(
      resolveDeepLinkDeviceSwitchNotice({
        linkDeviceId: "347a1364",
        runDeviceId: "4d58cce5",
        displayNameById: names,
      }),
    ).toBe(
      "This link was for Linux device · 8F03. This task will run on Linux device · 9031; pick the computer again to change it.",
    );
  });

  it("explains a link device that is gone", () => {
    expect(
      resolveDeepLinkDeviceSwitchNotice({
        linkDeviceId: "gone",
        runDeviceId: "4d58cce5",
        displayNameById: names,
      }),
    ).toContain("isn't connected any more");
  });

  it("stays quiet when the link matches or has no device", () => {
    const base = { runDeviceId: "347a1364", displayNameById: names };
    expect(
      resolveDeepLinkDeviceSwitchNotice({ ...base, linkDeviceId: "347a1364" }),
    ).toBeNull();
    expect(
      resolveDeepLinkDeviceSwitchNotice({ ...base, linkDeviceId: "" }),
    ).toBeNull();
  });
});
