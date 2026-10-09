import { beforeEach, describe, expect, it, vi } from "vitest";

const authMock = vi.hoisted(() => vi.fn());
const membershipMock = vi.hoisted(() => vi.fn());
const deleteMock = vi.hoisted(() => vi.fn(async () => undefined));
vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth: authMock }));
vi.mock("@/lib/auth/groupMembershipQueries", () => ({
  getMembershipForUserInGroup: membershipMock,
  userOwnsGroupAsSuperAdmin: vi.fn(),
}));
vi.mock("@/lib/auth/groupQueries", () => ({
  createGroup: vi.fn(),
  createGroupForOwner: vi.fn(),
  deleteGroupById: deleteMock,
  listGroups: vi.fn(),
  listManageableGroupsForUser: vi.fn(),
}));

import { DELETE } from "@/app/api/admin/groups/route";

const call = () =>
  DELETE(
    new Request("http://x", {
      method: "DELETE",
      body: JSON.stringify({ groupId: "g1", deleteMembers: true }),
    }),
  );

describe("DELETE /api/admin/groups deleteMembers", () => {
  beforeEach(() => {
    deleteMock.mockClear();
    membershipMock.mockResolvedValue({
      groupId: "g1",
      userId: "u1",
      role: "group_super_admin",
    });
  });

  it("a company owner removes the company but never other people's accounts", async () => {
    authMock.mockResolvedValue({
      actor: { id: "u1", globalRole: "user", email: "o@example.org" },
      error: null,
    });
    expect((await call()).status).toBe(200);
    expect(deleteMock).toHaveBeenCalledWith("g1", false);
  });

  it("a platform admin may delete the members too", async () => {
    authMock.mockResolvedValue({
      actor: { id: "a1", globalRole: "admin", email: "a@example.org" },
      error: null,
    });
    expect((await call()).status).toBe(200);
    expect(deleteMock).toHaveBeenCalledWith("g1", true);
  });
});
