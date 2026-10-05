import { describe, expect, it } from "vitest";

import { resolveComputerMembershipDisplayName } from "@/lib/projects/acl/resolveComputerMembershipDisplayName";

describe("resolveComputerMembershipDisplayName", () => {
  it("prefers displayName over label", () => {
    expect(
      resolveComputerMembershipDisplayName({
        displayName: " Studio ",
        deviceLabel: "mac.local",
        deviceId: "abcdef12xxxx",
      }),
    ).toBe("Studio");
  });

  it("falls back to label then short device id", () => {
    expect(
      resolveComputerMembershipDisplayName({
        displayName: null,
        deviceLabel: " mac.local ",
        deviceId: "abcdef12xxxx",
      }),
    ).toBe("mac.local");
    expect(
      resolveComputerMembershipDisplayName({
        displayName: "  ",
        deviceLabel: null,
        deviceId: "abcdef12xxxx",
      }),
    ).toBe("Computer abcdef12");
  });
});
