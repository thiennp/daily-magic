import { describe, expect, it } from "vitest";

import mapHumanInviteRow from "@/lib/projects/acl/humanInvites/mapHumanInviteRow";

describe("mapHumanInviteRow", () => {
  it("ISO-normalizes Date timestamps (no GMT+0200)", () => {
    const expires = new Date("2026-10-12T10:00:00.000Z");
    const created = new Date("2026-10-05T08:38:04.859Z");
    const revoked = new Date("2026-10-06T12:00:00.000Z");
    const redeemed = new Date("2026-10-07T15:30:00.000Z");
    // Prove String(Date) would have polluted output in Berlin.
    expect(String(expires)).toMatch(/GMT/i);

    const mapped = mapHumanInviteRow({
      id: "inv-1",
      project_id: "proj-1",
      created_by_user_id: "owner-1",
      email: null,
      require_email_match: false,
      role: "member",
      max_uses: 1,
      uses_remaining: 1,
      expires_at: expires,
      revoked_at: revoked,
      redeemed_at: redeemed,
      redeemed_by_user_id: "user-1",
      created_at: created,
    });

    expect(mapped.expiresAt).toBe("2026-10-12T10:00:00.000Z");
    expect(mapped.createdAt).toBe("2026-10-05T08:38:04.859Z");
    expect(mapped.revokedAt).toBe("2026-10-06T12:00:00.000Z");
    expect(mapped.redeemedAt).toBe("2026-10-07T15:30:00.000Z");
    for (const value of [
      mapped.expiresAt,
      mapped.createdAt,
      mapped.revokedAt,
      mapped.redeemedAt,
    ]) {
      expect(value).not.toMatch(/GMT/i);
      expect(value).toMatch(/^\d{4}-\d{2}-\d{2}T.*Z$/);
    }
  });

  it("keeps null optional timestamps null", () => {
    const mapped = mapHumanInviteRow({
      id: "inv-1",
      project_id: "proj-1",
      created_by_user_id: "owner-1",
      email: "Ada@X.com",
      require_email_match: true,
      role: "viewer",
      max_uses: 1,
      uses_remaining: 1,
      expires_at: "2026-10-12T10:00:00.000Z",
      revoked_at: null,
      redeemed_at: null,
      redeemed_by_user_id: null,
      created_at: "2026-10-05T08:38:04.859Z",
    });
    expect(mapped.revokedAt).toBeNull();
    expect(mapped.redeemedAt).toBeNull();
    expect(mapped.role).toBe("viewer");
    expect(mapped.requireEmailMatch).toBe(true);
    expect(mapped.email).toBe("Ada@X.com");
  });
});
