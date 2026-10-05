import { beforeEach, describe, expect, it, vi } from "vitest";

const authorize = vi.hoisted(() => vi.fn());
const sqlMock = vi.fn();

vi.mock("@/lib/projects/acl/authorizeProjectOwner", () => ({
  authorizeProjectOwner: authorize,
}));
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));
vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: vi.fn(async () => undefined),
}));

import { removeHumanProjectMembership } from "@/lib/projects/acl/humanInvites/removeHumanProjectMembership";
import { revokeHumanProjectInvite } from "@/lib/projects/acl/humanInvites/revokeHumanProjectInvite";

describe("revokeHumanProjectInvite + removeHumanProjectMembership", () => {
  beforeEach(() => {
    authorize.mockReset();
    sqlMock.mockReset();
    authorize.mockResolvedValue({ allow: true });
  });

  it("forbids non-owners on revoke", async () => {
    authorize.mockResolvedValue({ allow: false, reason: "forbidden" });
    await expect(
      revokeHumanProjectInvite({
        projectId: "p",
        inviteId: "i",
        ownerUserId: "u",
      }),
    ).resolves.toEqual({ ok: false, code: "forbidden" });
    expect(sqlMock).not.toHaveBeenCalled();
  });

  it("forbids non-owners on remove", async () => {
    authorize.mockResolvedValue({ allow: false, reason: "forbidden" });
    await expect(
      removeHumanProjectMembership({
        projectId: "p",
        membershipId: "m",
        ownerUserId: "u",
      }),
    ).resolves.toEqual({ ok: false, code: "forbidden" });
    expect(sqlMock).not.toHaveBeenCalled();
  });

  it("remove then allows a fresh membership insert path (status revoked)", async () => {
    sqlMock.mockResolvedValueOnce([
      {
        id: "m1",
        project_id: "p",
        user_id: "u2",
        role: "member",
        status: "revoked",
        member_kind: "human",
        team_label: null,
        scopes: [],
        project_display_name: null,
        created_at: "2026-10-05T00:00:00.000Z",
        revoked_at: "2026-10-05T12:00:00.000Z",
      },
    ]);
    const removed = await removeHumanProjectMembership({
      projectId: "p",
      membershipId: "m1",
      ownerUserId: "owner",
    });
    expect(removed.ok).toBe(true);
    if (!removed.ok) return;
    expect(removed.membership.status).toBe("revoked");
    const query = String(sqlMock.mock.calls[0]?.[0] ?? "");
    expect(query).toContain("member_kind = 'human'");
    expect(query).toContain("status = 'revoked'");
  });
});
