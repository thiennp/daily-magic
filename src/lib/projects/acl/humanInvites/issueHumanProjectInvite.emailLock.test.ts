import { beforeEach, describe, expect, it, vi } from "vitest";

const authorize = vi.hoisted(() => vi.fn());
const sqlMock = vi.hoisted(() => vi.fn());

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
vi.mock("@/lib/projects/acl/humanInvites/buildHumanInviteUrl", () => ({
  buildHumanInviteUrl: (token: string) => `https://x/invite/h/${token}`,
}));
vi.mock("@/lib/projects/acl/humanInvites/hashHumanInviteToken", () => ({
  createHumanInviteToken: () => "t".repeat(22),
  hashHumanInviteToken: () => "hash",
}));

import { issueHumanProjectInvite } from "@/lib/projects/acl/humanInvites/issueHumanProjectInvite";

const row = {
  id: "inv-1",
  project_id: "proj-1",
  created_by_user_id: "owner-1",
  email: "ada@example.com",
  require_email_match: true,
  role: "member",
  max_uses: 1,
  uses_remaining: 1,
  expires_at: "2026-10-20T00:00:00.000Z",
  revoked_at: null,
  redeemed_at: null,
  redeemed_by_user_id: null,
  created_at: "2026-10-05T00:00:00.000Z",
};

describe("issueHumanProjectInvite email lock", () => {
  beforeEach(() => {
    authorize.mockReset();
    sqlMock.mockReset();
    authorize.mockResolvedValue({ allow: true });
  });

  it("mode A creates without email lock", async () => {
    sqlMock.mockResolvedValueOnce([{ ...row, email: null, require_email_match: false }]);
    const result = await issueHumanProjectInvite({
      projectId: "proj-1",
      ownerUserId: "owner-1",
      role: "member",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.invite.requireEmailMatch).toBe(false);
    }
  });

  it("mode B stores email + requireEmailMatch", async () => {
    sqlMock.mockResolvedValueOnce([row]);
    const result = await issueHumanProjectInvite({
      projectId: "proj-1",
      ownerUserId: "owner-1",
      email: "Ada@Example.COM",
      requireEmailMatch: true,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.invite.email).toBe("ada@example.com");
      expect(result.invite.requireEmailMatch).toBe(true);
    }
  });

  it("mode B without email returns email_required_for_lock", async () => {
    const result = await issueHumanProjectInvite({
      projectId: "proj-1",
      ownerUserId: "owner-1",
      requireEmailMatch: true,
    });
    expect(result).toEqual({ ok: false, code: "email_required_for_lock" });
    expect(sqlMock).not.toHaveBeenCalled();
  });
});
