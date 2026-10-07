import { beforeEach, describe, expect, it, vi } from "vitest";

const authorize = vi.hoisted(() => vi.fn());
const sqlMock = vi.hoisted(() => vi.fn());
const logDenied = vi.hoisted(() => vi.fn());

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
  logHumanInviteRequestDenied: logDenied,
}));

import { denyHumanInviteRequest } from "@/lib/projects/acl/humanInvites/denyHumanInviteRequest";

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
const input = {
  projectId: "proj-1",
  inviteId: "inv-1",
  ownerUserId: "owner-1",
};

describe("denyHumanInviteRequest (108)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    authorize.mockResolvedValue({ allow: true });
  });

  it("deny: accepted → revoked, logs request.denied", async () => {
    sqlMock.mockResolvedValueOnce([{ ...inviteRow, status: "revoked" }]);
    const result = await denyHumanInviteRequest(input);
    expect(result.ok).toBe(true);
    const text = (sqlMock.mock.calls[0][0] as readonly string[]).join("?");
    expect(text).toContain("SET status = 'revoked'");
    expect(text).not.toContain("project_memberships");
    expect(logDenied).toHaveBeenCalledTimes(1);
  });

  it("deny: non-owner forbidden", async () => {
    authorize.mockResolvedValue({ allow: false, reason: "forbidden" });
    expect(await denyHumanInviteRequest(input)).toEqual({
      ok: false,
      code: "forbidden",
    });
  });
});
