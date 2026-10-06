import { describe, expect, it } from "vitest";

import { detectInviteAutoApprovedMembers } from "@/features/projects/access/hooks/applyAwcProjectAccessSnapshot";
import type { AwcProjectAccessMember } from "@/features/projects/access/hooks/loadAwcProjectAccess";

const member = (
  overrides: Partial<AwcProjectAccessMember> & { readonly id: string },
): AwcProjectAccessMember =>
  ({
    userId: "u-1",
    teamLabel: null,
    scopes: [],
    createdAt: "2026-10-06T00:00:00.000Z",
    projectDisplayName: "Soft Vale",
    isAgent: true,
    displayName: "Soft Vale",
    autoApprovedViaInviteLabel: null,
    ...overrides,
  }) as AwcProjectAccessMember;

describe("detectInviteAutoApprovedMembers", () => {
  it("shows banner and badge only for invite auto-approve admits", () => {
    const detected = detectInviteAutoApprovedMembers({
      members: [
        member({
          id: "mem-auto",
          autoApprovedViaInviteLabel: "inv-1abcd",
        }),
        member({ id: "mem-manual", projectDisplayName: "Manual Bot" }),
      ],
      addedIds: ["mem-auto", "mem-manual"],
    });
    expect(detected.badgeIds).toEqual(["mem-auto"]);
    expect(detected.banner).toBe(
      "Soft Vale joined with invite inv-1abcd and was auto-approved",
    );
  });

  it("shows no banner or badge when a member was manually Approved", () => {
    const detected = detectInviteAutoApprovedMembers({
      members: [
        member({
          id: "mem-manual",
          projectDisplayName: "Manual Bot",
          autoApprovedViaInviteLabel: null,
        }),
      ],
      addedIds: ["mem-manual"],
    });
    expect(detected.banner).toBeNull();
    expect(detected.badgeIds).toEqual([]);
  });
});

