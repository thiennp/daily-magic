import { describe, expect, it } from "vitest";

import {
  canChangeMemberRole,
  canRemoveMember,
  type AuthActor,
  type GroupMembershipContext,
} from "@/lib/auth/permissions";
import { GlobalRole, GroupRole } from "@/lib/auth/roles";

const globalSuperAdmin: AuthActor = {
  id: "super-admin-1",
  email: "nguyenphongthien@gmail.com",
  globalRole: GlobalRole.SUPER_ADMIN,
};

const groupSuperAdmin: AuthActor = {
  id: "super-1",
  email: "super@example.com",
  globalRole: GlobalRole.USER,
};

const groupAdmin: AuthActor = {
  id: "ga-1",
  email: "ga@example.com",
  globalRole: GlobalRole.USER,
};

const superMembership: GroupMembershipContext = {
  groupId: "group-1",
  userId: groupSuperAdmin.id,
  role: GroupRole.GROUP_SUPER_ADMIN,
};

const adminMembership: GroupMembershipContext = {
  groupId: "group-1",
  userId: groupAdmin.id,
  role: GroupRole.GROUP_ADMIN,
};

const userMembership: GroupMembershipContext = {
  groupId: "group-1",
  userId: "user-1",
  role: GroupRole.USER,
};

describe("permissions", () => {
  it("prevents group_super_admin from changing own role", () => {
    expect(
      canChangeMemberRole(
        groupSuperAdmin,
        superMembership,
        superMembership,
        GroupRole.GROUP_ADMIN,
      ),
    ).toBe(false);
  });

  it("prevents group_admin from removing another group_admin", () => {
    const target: GroupMembershipContext = {
      groupId: "group-1",
      userId: "ga-2",
      role: GroupRole.GROUP_ADMIN,
    };

    expect(canRemoveMember(groupAdmin, adminMembership, target)).toBe(false);
  });

  it("allows group_super_admin to change a regular member role", () => {
    expect(
      canChangeMemberRole(
        groupSuperAdmin,
        superMembership,
        userMembership,
        GroupRole.GROUP_ADMIN,
      ),
    ).toBe(true);
  });

  it("allows global super admin to manage any member", () => {
    const target: GroupMembershipContext = {
      groupId: "group-1",
      userId: "ga-2",
      role: GroupRole.GROUP_ADMIN,
    };

    expect(canRemoveMember(globalSuperAdmin, null, target)).toBe(true);
  });
});
