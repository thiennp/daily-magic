import { describe, expect, it } from "vitest";

import { toHumanInviteListItem } from "@/lib/projects/acl/humanInvites/toHumanInviteListItem";

describe("toHumanInviteListItem", () => {
  it("never includes url, token, or accepter user id; exposes 108 status fields", () => {
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
      status: "pending",
      delivery: "email",
      requiresApproval: true,
      emailSentAt: "2026-10-05T00:00:01.000Z",
      acceptedAt: null,
      acceptedByUserId: "user-should-not-leak",
      acceptedDisplayName: null,
      acceptedByEmail: "bob@example.org",
      decidedAt: null,
    });
    expect(item).not.toHaveProperty("url");
    expect(item).not.toHaveProperty("token");
    expect(item.requireEmailMatch).toBe(true);
    expect(item.email).toBe("a@b.com");
    expect(item).not.toHaveProperty("acceptedByUserId");
    expect(item.status).toBe("pending");
    expect(item.delivery).toBe("email");
    expect(item.acceptedByEmail).toBe("bob@example.org");
    expect(Object.keys(item).sort()).toEqual([
      "acceptedAt",
      "acceptedByEmail",
      "acceptedDisplayName",
      "createdAt",
      "delivery",
      "email",
      "emailSentAt",
      "expiresAt",
      "inviteId",
      "maxUses",
      "requireEmailMatch",
      "requiresApproval",
      "revokedAt",
      "role",
      "status",
      "usesRemaining",
    ]);
  });
});
