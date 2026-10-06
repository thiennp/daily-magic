import { beforeEach, describe, expect, it, vi } from "vitest";

const authorize = vi.hoisted(() => vi.fn());
const writer = vi.hoisted(() => vi.fn(async () => undefined));
const sqlMock = vi.fn();

vi.mock("@/lib/projects/acl/authorizeProjectOwner", () => ({ authorizeProjectOwner: authorize }));
vi.mock("@/lib/projects/acl/activity/writeProjectActivityEvent", () => ({
  writeProjectActivityEvent: writer,
}));
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));
vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: vi.fn(async () => undefined),
}));

import { issueHumanProjectInvite } from "@/lib/projects/acl/humanInvites/issueHumanProjectInvite";
import { removeHumanProjectMembership } from "@/lib/projects/acl/humanInvites/removeHumanProjectMembership";
import { revokeHumanProjectInvite } from "@/lib/projects/acl/humanInvites/revokeHumanProjectInvite";

const inviteRow = {
  id: "hinv-12345678",
  project_id: "p",
  created_by_user_id: "owner",
  email: "friend@example.com",
  require_email_match: true,
  role: "viewer",
  max_uses: 1,
  uses_remaining: 1,
  expires_at: "2026-10-20T00:00:00.000Z",
  revoked_at: null,
  redeemed_at: null,
  redeemed_by_user_id: null,
  created_at: "2026-10-06T09:00:00.000Z",
};
const memberRow = {
  id: "m1", project_id: "p", user_id: "u2", role: "member", status: "revoked",
  member_kind: "human", team_label: null, scopes: [], project_display_name: "Lan",
  created_at: "2026-10-05T00:00:00.000Z", revoked_at: "2026-10-06T09:00:00.000Z",
};
const lastEvent = () => JSON.stringify(writer.mock.calls.at(-1) ?? null);

describe("human invite Access log hooks", () => {
  beforeEach(() => {
    authorize.mockReset().mockResolvedValue({ allow: true });
    sqlMock.mockReset();
    writer.mockClear();
  });

  it("issue logs human_invite.created with role, never the email (F1)", async () => {
    sqlMock.mockResolvedValueOnce([inviteRow]);
    const issued = await issueHumanProjectInvite({
      projectId: "p", ownerUserId: "owner", role: "viewer",
      email: "friend@example.com", requireEmailMatch: true,
    });
    expect(issued.ok).toBe(true);
    expect(writer).toHaveBeenCalledWith(expect.objectContaining({
      type: "human_invite.created",
      actor: { kind: "owner", userId: "owner" },
      detail: expect.objectContaining({ role: "viewer", label: "hinv-123" }),
    }));
    expect(lastEvent()).not.toMatch(/example\.com|@/);
  });

  it("revoke logs human_invite.revoked with role only once the UPDATE commits (F1, F8)", async () => {
    sqlMock.mockResolvedValueOnce([{ ...inviteRow, revoked_at: "2026-10-06T09:00:10.000Z" }]);
    await revokeHumanProjectInvite({ projectId: "p", inviteId: inviteRow.id, ownerUserId: "owner" });
    expect(writer).toHaveBeenCalledTimes(1);
    expect(writer).toHaveBeenCalledWith(expect.objectContaining({
      type: "human_invite.revoked",
      detail: { inviteId: inviteRow.id, label: "hinv-123", role: "viewer" },
    }));
    expect(lastEvent()).not.toMatch(/@/);
  });

  it("revoke that does not commit (already revoked / redeemed) logs nothing (F8)", async () => {
    sqlMock.mockResolvedValueOnce([]).mockResolvedValueOnce([{ ...inviteRow, revoked_at: "x" }]);
    const result = await revokeHumanProjectInvite({ projectId: "p", inviteId: "i", ownerUserId: "owner" });
    expect(result).toEqual({ ok: false, code: "already_revoked" });
    expect(writer).not.toHaveBeenCalled();
  });

  it("remove logs member.removed with memberKind=human after the UPDATE commits (F5, F8)", async () => {
    sqlMock.mockResolvedValueOnce([memberRow]);
    await removeHumanProjectMembership({ projectId: "p", membershipId: "m1", ownerUserId: "owner" });
    expect(writer).toHaveBeenCalledWith({
      projectId: "p",
      type: "member.removed",
      actor: { kind: "owner", userId: "owner" },
      target: { membershipId: "m1", userId: "u2", label: "Lan" },
      detail: { membershipId: "m1", memberKind: "human", role: "member" },
    });
  });

  it("remove that does not commit, or a non-owner call, logs nothing (F8)", async () => {
    sqlMock.mockResolvedValueOnce([]);
    expect(await removeHumanProjectMembership({ projectId: "p", membershipId: "m1", ownerUserId: "owner" }))
      .toEqual({ ok: false, code: "not_active" });
    authorize.mockResolvedValue({ allow: false, reason: "forbidden" });
    await revokeHumanProjectInvite({ projectId: "p", inviteId: "i", ownerUserId: "x" });
    expect(writer).not.toHaveBeenCalled();
  });
});
