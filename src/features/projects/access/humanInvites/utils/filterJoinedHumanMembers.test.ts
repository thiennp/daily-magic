import { describe, expect, it } from "vitest";

import { filterJoinedHumanMembers } from "@/features/projects/access/humanInvites/utils/filterJoinedHumanMembers";

describe("filterJoinedHumanMembers", () => {
  it("prefers memberKind=human over isAgent stub", () => {
    const rows = filterJoinedHumanMembers([
      {
        id: "h1",
        userId: "u1",
        role: "member",
        status: "active",
        isAgent: false,
        memberKind: "human",
        email: "a@example.com",
      },
      {
        id: "b1",
        userId: "u2",
        role: "member",
        status: "active",
        isAgent: true,
        memberKind: "bot",
      },
    ]);
    expect(rows).toHaveLength(1);
    expect(rows[0]?.membershipId).toBe("h1");
  });

  it("stubs !isAgent when memberKind absent", () => {
    const rows = filterJoinedHumanMembers([
      {
        id: "h2",
        userId: "u3",
        role: "viewer",
        isAgent: false,
        email: "v@example.com",
      },
      {
        id: "b2",
        userId: "u4",
        role: "member",
        isAgent: true,
      },
    ]);
    expect(rows).toHaveLength(1);
    expect(rows[0]?.role).toBe("viewer");
  });
});
