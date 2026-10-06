import { describe, expect, it } from "vitest";

import { AWC_PROJECT_COMPUTER_MEMBER_COPY } from "@/features/projects/access/awcProjectComputerMemberCopy.constant";
import { describeComputerAccessMember } from "@/features/projects/access/utils/describeComputerAccessMember";
import { isComputerAccessMember } from "@/features/projects/access/utils/isComputerAccessMember";

const base = {
  projectDisplayName: "Studio Mac",
  ownerUserId: "owner-1",
  ownerDisplayName: "Thien",
  isOnline: true,
  connectVersionStatus: "ok",
  assignable: true,
} as const;

describe("isComputerAccessMember", () => {
  it("is true only for memberKind=computer", () => {
    expect(isComputerAccessMember({ memberKind: "computer" })).toBe(true);
    expect(isComputerAccessMember({ memberKind: "bot" })).toBe(false);
    expect(isComputerAccessMember({ memberKind: "human" })).toBe(false);
    expect(isComputerAccessMember({})).toBe(false);
  });
});

describe("describeComputerAccessMember", () => {
  it("online + assignable → Online, Your computer for the owner", () => {
    expect(describeComputerAccessMember(base, "owner-1")).toEqual({
      name: "Studio Mac",
      ownerLine: AWC_PROJECT_COMPUTER_MEMBER_COPY.yourComputer,
      status: "online",
      statusLabel: AWC_PROJECT_COMPUTER_MEMBER_COPY.statusOnline,
    });
  });

  it("other viewer → <Owner>'s computer; no owner name → Computer", () => {
    expect(describeComputerAccessMember(base, "someone").ownerLine).toBe(
      "Thien's computer",
    );
    expect(
      describeComputerAccessMember({ ...base, ownerDisplayName: null }, null)
        .ownerLine,
    ).toBe(AWC_PROJECT_COMPUTER_MEMBER_COPY.genericOwner);
  });

  it("offline wins over version", () => {
    const view = describeComputerAccessMember(
      { ...base, isOnline: false, connectVersionStatus: "too_old" },
      "owner-1",
    );
    expect(view.status).toBe("offline");
  });

  it("too_old or online-but-not-assignable → Needs update", () => {
    expect(
      describeComputerAccessMember(
        { ...base, connectVersionStatus: "too_old", assignable: false },
        null,
      ).status,
    ).toBe("needs_update");
    expect(
      describeComputerAccessMember({ ...base, assignable: false }, null).status,
    ).toBe("needs_update");
  });

  it("empty name falls back to This computer; copy never says AWL/agent/device", () => {
    expect(
      describeComputerAccessMember({ ...base, projectDisplayName: " " }, null)
        .name,
    ).toBe(AWC_PROJECT_COMPUTER_MEMBER_COPY.fallbackName);
    const strings = Object.values(AWC_PROJECT_COMPUTER_MEMBER_COPY).join(" ");
    expect(strings).not.toMatch(/\b(AWL|agent|device)\b/i);
  });
});
