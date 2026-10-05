import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";

const sqlMock = vi.fn();
const membershipStatus = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/checkProjectMembershipStatus", () => ({
  checkProjectMembershipStatus: membershipStatus,
}));

import { claimProjectInviteToken } from "@/lib/projects/acl/invites/claimProjectInviteToken";
import { redeemProjectInvite } from "@/lib/projects/acl/invites/redeemProjectInvite";

const TOKEN = "a".repeat(22);
const inviteRow = {
  id: "inv-1",
  project_id: "proj-1",
  created_by_user_id: "owner-1",
  token_hash: "h",
  team_label: null,
  scopes: [],
  max_uses: 2,
  uses_remaining: 1,
  expires_at: "2026-10-09T00:00:00.000Z",
  revoked_at: null,
  created_at: "2026-10-02T00:00:00.000Z",
};

const queries = (needle: string): string[] =>
  sqlMock.mock.calls.map((c) => String(c[0])).filter((q) => q.includes(needle));

describe("invite redeem: expired/revoked/replay", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    membershipStatus.mockReset();
    resetProjectAclSchemaEnsureForTests();
  });

  it("claims only unrevoked, unexpired invites with uses left, in one atomic UPDATE", async () => {
    sqlMock.mockResolvedValue([]);
    expect(await claimProjectInviteToken(TOKEN)).toEqual({
      ok: false,
      code: "invalid_token",
    });
    const claim = queries("UPDATE project_invites")[0] ?? "";
    expect(claim).toContain("revoked_at IS NULL");
    expect(claim).toContain("expires_at > NOW()");
    expect(claim).toContain("uses_remaining > 0");
    expect(claim).toContain("SET uses_remaining = uses_remaining - 1");
  });

  it("an expired or revoked invite (claim matches no row) is never redeemed", async () => {
    sqlMock.mockResolvedValue([]);
    const result = await redeemProjectInvite({
      token: TOKEN,
      actorUserId: "bot-1",
    });
    expect(result).toEqual({ ok: false, code: "invalid_token" });
    expect(queries("INSERT INTO project_access_requests")).toEqual([]);
    expect(queries("INSERT INTO project_memberships")).toEqual([]);
  });

  it.each([
    ["active", "already_member"],
    ["pending", "already_pending"],
  ])(
    "redeeming again while %s creates no second membership and gives the use back",
    async (status, code) => {
      membershipStatus.mockResolvedValue(status);
      sqlMock.mockImplementation(async (strings: TemplateStringsArray) =>
        String(strings).includes("UPDATE project_invites") &&
        String(strings).includes("uses_remaining - 1")
          ? [inviteRow]
          : [],
      );
      const result = await redeemProjectInvite({
        token: TOKEN,
        actorUserId: "bot-1",
      });
      expect(result).toEqual({ ok: false, code });
      expect(queries("INSERT INTO project_access_requests")).toEqual([]);
      expect(queries("INSERT INTO project_memberships")).toEqual([]);
      expect(queries("uses_remaining + 1")).toHaveLength(1);
    },
  );
});
