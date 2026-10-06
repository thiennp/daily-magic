import { describe, expect, it } from "vitest";

import {
  isInviteStillUsable,
  resolveInviteListStatus,
} from "@/features/projects/access/invites/inviteListStatus";
import type { AwcProjectAccessInvite } from "@/features/projects/access/hooks/loadAwcProjectAccess";

const base = (overrides: Partial<AwcProjectAccessInvite>): AwcProjectAccessInvite => ({
  inviteId: "inv-1",
  createdAt: "2026-10-01T00:00:00.000Z",
  expiresAt: "2026-10-09T00:00:00.000Z",
  revokedAt: null,
  maxUses: 1,
  usesRemaining: 1,
  teamLabel: null,
  scopes: [],
  autoApprove: false,
  ...overrides,
});

describe("resolveInviteListStatus", () => {
  it("labels revoked / used up / expired / active", () => {
    expect(
      resolveInviteListStatus(
        base({ revokedAt: "2026-10-02T00:00:00.000Z" }),
        Date.parse("2026-10-02T12:00:00.000Z"),
      ),
    ).toBe("revoked");
    expect(
      resolveInviteListStatus(
        base({ usesRemaining: 0 }),
        Date.parse("2026-10-02T12:00:00.000Z"),
      ),
    ).toBe("used_up");
    expect(
      resolveInviteListStatus(
        base({ expiresAt: "2026-10-01T00:00:00.000Z" }),
        Date.parse("2026-10-02T12:00:00.000Z"),
      ),
    ).toBe("expired");
    expect(
      resolveInviteListStatus(
        base({}),
        Date.parse("2026-10-02T12:00:00.000Z"),
      ),
    ).toBe("active");
  });

  it("isInviteStillUsable only for active", () => {
    expect(isInviteStillUsable(base({}))).toBe(true);
    expect(isInviteStillUsable(base({ usesRemaining: 0 }))).toBe(false);
  });
});
