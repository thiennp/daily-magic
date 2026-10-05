import { describe, expect, it } from "vitest";

import { toHumanInviteListItem } from "@/lib/projects/acl/humanInvites/toHumanInviteListItem";

describe("toHumanInviteListItem", () => {
  it("never includes url or token; exposes requireEmailMatch", () => {
    const item = toHumanInviteListItem({
      id: "inv-1",
      projectId: "p",
      createdByUserId: "o",
      email: "a@b.com",
      requireEmailMatch: true,
      role: "member",
      maxUses: 1,
      usesRemaining: 1,
      expiresAt: "2026-10-20T00:00:00.000Z",
      revokedAt: null,
      redeemedAt: null,
      redeemedByUserId: null,
      createdAt: "2026-10-05T00:00:00.000Z",
    });
    expect(item).not.toHaveProperty("url");
    expect(item).not.toHaveProperty("token");
    expect(item.requireEmailMatch).toBe(true);
    expect(item.email).toBe("a@b.com");
    expect(Object.keys(item).sort()).toEqual([
      "createdAt",
      "email",
      "expiresAt",
      "inviteId",
      "maxUses",
      "requireEmailMatch",
      "revokedAt",
      "role",
      "usesRemaining",
    ]);
  });
});
