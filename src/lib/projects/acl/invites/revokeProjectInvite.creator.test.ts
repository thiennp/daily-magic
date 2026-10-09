import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.hoisted(() => vi.fn());
const creatorMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (r: unknown) => (Array.isArray(r) ? r : []),
}));
vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: async () => undefined,
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: async () => ({ ownerUserId: "owner" }),
}));
vi.mock("@/lib/projects/acl/invites/isActiveMemberInviteCreator", () => ({
  isActiveMemberInviteCreator: creatorMock,
}));
vi.mock("@/lib/projects/acl/writeProjectAccessAudit", () => ({
  writeProjectAccessAudit: async () => undefined,
}));

import { revokeProjectInvite } from "@/lib/projects/acl/invites/revokeProjectInvite";

const revoke = () =>
  revokeProjectInvite({
    projectId: "p1",
    inviteId: "i1",
    ownerUserId: "member",
  });

describe("revokeProjectInvite by a member", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    creatorMock.mockReset();
  });

  it("is forbidden unless the member created the invite", async () => {
    creatorMock.mockResolvedValue(false);
    expect(await revoke()).toEqual({ ok: false, code: "forbidden" });
    expect(sqlMock).not.toHaveBeenCalled();
  });

  it("lets the member who created the invite revoke it", async () => {
    creatorMock.mockResolvedValue(true);
    sqlMock.mockResolvedValue([{ id: "i1", project_id: "p1", scopes: [] }]);
    expect((await revoke()).ok).toBe(true);
  });
});
