import { beforeEach, describe, expect, it, vi } from "vitest";

const authorize = vi.hoisted(() => vi.fn());
const sqlMock = vi.hoisted(() => vi.fn());
const logApproved = vi.hoisted(() => vi.fn());

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
vi.mock("@/lib/projects/acl/humanInvites/logHumanInviteDecision", () => ({
  logHumanInviteRequestApproved: logApproved,
}));

import { approveHumanInviteRequest } from "@/lib/projects/acl/humanInvites/approveHumanInviteRequest";

const inviteRow = {
  id: "inv-1",
  project_id: "proj-1",
  created_by_user_id: "owner-1",
  email: "ada@example.org",
  role: "member",
  max_uses: 1,
  uses_remaining: 0,
  expires_at: "2026-10-14T00:00:00.000Z",
  created_at: "2026-10-07T00:00:00.000Z",
  status: "approved",
  delivery: "email",
  requires_approval: true,
  accepted_by_user_id: "user-2",
  accepted_display_name: "Ada",
};
const memberRow = {
  id: "mem-1",
  project_id: "proj-1",
  user_id: "user-2",
  role: "member",
  status: "active",
  scopes: [],
  project_display_name: "Ada",
  member_kind: "human",
  created_at: "2026-10-07T00:00:00.000Z",
};
const input = {
  projectId: "proj-1",
  inviteId: "inv-1",
  ownerUserId: "owner-1",
};

describe("approveHumanInviteRequest (108)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    authorize.mockResolvedValue({ allow: true });
  });

  it("approve: one atomic statement flips accepted → approved and inserts the human seat", async () => {
    sqlMock.mockResolvedValueOnce([
      { invite_row: inviteRow, member_row: memberRow },
    ]);
    const result = await approveHumanInviteRequest(input);
    expect(result.ok).toBe(true);
    const text = (sqlMock.mock.calls[0][0] as readonly string[]).join("?");
    expect(text).toContain("status = 'accepted'");
    expect(text).toContain("INSERT INTO project_memberships");
    expect(text).toContain("'human'");
    if (result.ok) {
      expect(result.membership.userId).toBe("user-2");
      expect(result.invite.status).toBe("approved");
    }
    expect(logApproved).toHaveBeenCalledTimes(1);
  });

  it("approve: non-owner forbidden, no SQL", async () => {
    authorize.mockResolvedValue({ allow: false, reason: "forbidden" });
    expect(await approveHumanInviteRequest(input)).toEqual({
      ok: false,
      code: "forbidden",
    });
    expect(sqlMock).not.toHaveBeenCalled();
  });

  it("approve: already decided → not_awaiting_approval; unknown → not_found", async () => {
    sqlMock.mockResolvedValueOnce([]).mockResolvedValueOnce([{ id: "inv-1" }]);
    expect(await approveHumanInviteRequest(input)).toEqual({
      ok: false,
      code: "not_awaiting_approval",
    });
    sqlMock.mockResolvedValueOnce([]).mockResolvedValueOnce([]);
    expect(await approveHumanInviteRequest(input)).toEqual({
      ok: false,
      code: "not_found",
    });
    expect(logApproved).not.toHaveBeenCalled();
  });

  it("approve: nickname collision maps to display_name_taken", async () => {
    sqlMock.mockRejectedValueOnce(
      new Error('duplicate key "project_memberships_display_name_active_idx"'),
    );
    expect(await approveHumanInviteRequest(input)).toEqual({
      ok: false,
      code: "display_name_taken",
    });
  });
});
