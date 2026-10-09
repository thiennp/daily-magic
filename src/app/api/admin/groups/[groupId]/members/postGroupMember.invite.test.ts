import { beforeEach, describe, expect, it, vi } from "vitest";

const authMock = vi.hoisted(() => vi.fn());
const userMock = vi.hoisted(() => vi.fn());
const addMock = vi.hoisted(() => vi.fn(async () => ({ id: "m1" })));
const inviteMock = vi.hoisted(() => vi.fn(async () => ({ id: "i1" })));
vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth: authMock }));
vi.mock("@/lib/auth/userRepository", () => ({ getUserByEmail: userMock }));
vi.mock("@/lib/auth/groupQueries", () => ({
  getGroupById: async () => ({ id: "g1", name: "Co" }),
}));
vi.mock("@/lib/auth/groupMembershipQueries", () => ({
  getMembershipForUserInGroup: async () => null,
}));
vi.mock("@/lib/auth/groupMembershipMutations", () => ({
  addUserToGroup: addMock,
  countSuperAdminsInGroup: async () => 1,
}));
vi.mock("@/lib/auth/groupInvites/createGroupInvite", () => ({
  createGroupInvite: inviteMock,
}));
vi.mock("@/app/api/admin/groups/[groupId]/members/buildMembershipRows", () => ({
  getActorMembershipContext: async () => ({
    groupId: "g1",
    userId: "owner",
    role: "group_super_admin",
  }),
}));

import { postGroupMember } from "@/app/api/admin/groups/[groupId]/members/postGroupMember";

const call = (role = "user") =>
  postGroupMember(
    "g1",
    new Request("http://x", {
      method: "POST",
      body: JSON.stringify({ email: "victim@example.org", role }),
    }),
  );

describe("postGroupMember consent", () => {
  beforeEach(() => {
    for (const m of [authMock, userMock, addMock, inviteMock]) m.mockClear();
    authMock.mockResolvedValue({
      actor: { id: "owner", globalRole: "user", email: "o@example.org" },
      error: null,
    });
    userMock.mockResolvedValue({ id: "victim" });
  });

  it("a company owner sends an invitation; nobody is added until they accept", async () => {
    const response = await call();
    expect(response.status).toBe(202);
    expect(inviteMock).toHaveBeenCalledWith(
      expect.objectContaining({ inviteeUserId: "victim", role: "user" }),
    );
    expect(addMock).not.toHaveBeenCalled();
  });

  it("answers the same for an address without an account", async () => {
    userMock.mockResolvedValue(null);
    const response = await call();
    expect(response.status).toBe(202);
    expect(inviteMock).not.toHaveBeenCalled();
  });

  it("an owner cannot hand out ownership by invite", async () => {
    expect((await call("group_super_admin")).status).toBeGreaterThanOrEqual(
      400,
    );
    expect(inviteMock).not.toHaveBeenCalled();
  });

  it("a platform admin still adds directly", async () => {
    authMock.mockResolvedValue({
      actor: { id: "a1", globalRole: "admin", email: "a@example.org" },
      error: null,
    });
    expect((await call()).status).toBe(201);
    expect(addMock).toHaveBeenCalled();
  });
});
