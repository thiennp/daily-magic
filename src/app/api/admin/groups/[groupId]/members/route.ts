import { GroupRole, isGroupRole } from "@/lib/auth/roles";
import {
  canChangeMemberRole,
  canManageGroupMembers,
  canRemoveMember,
  isGlobalAdmin,
} from "@/lib/auth/permissions";
import { requireAuth } from "@/lib/auth/requireAuth";
import {
  addUserToGroup,
  countSuperAdminsInGroup,
  getGroupById,
  getMembershipById,
  getMembershipForUserInGroup,
  listGroupMemberships,
  removeMembership,
  updateMembershipRole,
} from "@/lib/auth/groupRepository";
import { getUserByEmail, getUserById } from "@/lib/auth/userRepository";

interface MembershipResponseRow {
  readonly membership: Awaited<ReturnType<typeof listGroupMemberships>>[number];
  readonly user: Awaited<ReturnType<typeof getUserById>>;
}

async function buildMembershipRows(
  groupId: string,
): Promise<readonly MembershipResponseRow[]> {
  const memberships = await listGroupMemberships(groupId);
  const rows = await Promise.all(
    memberships.map(async (membership) => ({
      membership,
      user: await getUserById(membership.userId),
    })),
  );

  return rows;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ groupId: string }> },
) {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { groupId } = await context.params;
  const group = await getGroupById(groupId);

  if (!group) {
    return Response.json({ error: "Group not found" }, { status: 404 });
  }

  const actorMembership = await getMembershipForUserInGroup(groupId, actor.id);

  if (
    !canManageGroupMembers(
      actor,
      actorMembership
        ? {
            groupId: actorMembership.groupId,
            userId: actorMembership.userId,
            role: actorMembership.role,
          }
        : null,
    )
  ) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const members = await buildMembershipRows(groupId);

  return Response.json({ group, members });
}

export async function POST(
  request: Request,
  context: { params: Promise<{ groupId: string }> },
) {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { groupId } = await context.params;
  const group = await getGroupById(groupId);

  if (!group) {
    return Response.json({ error: "Group not found" }, { status: 404 });
  }

  const actorMembership = await getMembershipForUserInGroup(groupId, actor.id);

  if (
    !canManageGroupMembers(
      actor,
      actorMembership
        ? {
            groupId: actorMembership.groupId,
            userId: actorMembership.userId,
            role: actorMembership.role,
          }
        : null,
    )
  ) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await request.json()) as {
    email?: string;
    role?: string;
  };
  const email = body.email?.trim().toLowerCase();
  const role = body.role?.trim();

  if (!email) {
    return Response.json({ error: "email is required" }, { status: 400 });
  }

  if (!role || !isGroupRole(role)) {
    return Response.json({ error: "Invalid role" }, { status: 400 });
  }

  const user = await getUserByEmail(email);

  if (!user) {
    return Response.json(
      { error: "User must sign in before they can be added to a group" },
      { status: 404 },
    );
  }

  const existingMembership = await getMembershipForUserInGroup(
    groupId,
    user.id,
  );

  if (existingMembership) {
    return Response.json(
      { error: "User is already in this group" },
      { status: 409 },
    );
  }

  if (role === GroupRole.GROUP_SUPER_ADMIN) {
    const superAdminCount = await countSuperAdminsInGroup(groupId);

    if (superAdminCount > 0 && !isGlobalAdmin(actor)) {
      return Response.json(
        { error: "Group already has a super admin" },
        { status: 409 },
      );
    }
  }

  const membership = await addUserToGroup(groupId, user.id, role);

  return Response.json({ membership, user }, { status: 201 });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ groupId: string }> },
) {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { groupId } = await context.params;
  const actorMembership = await getMembershipForUserInGroup(groupId, actor.id);

  const body = (await request.json()) as {
    membershipId?: string;
    role?: string;
  };
  const membershipId = body.membershipId?.trim();
  const role = body.role?.trim();

  if (!membershipId || !role || !isGroupRole(role)) {
    return Response.json(
      { error: "membershipId and valid role are required" },
      { status: 400 },
    );
  }

  const targetMembership = await getMembershipById(membershipId);

  if (!targetMembership || targetMembership.groupId !== groupId) {
    return Response.json({ error: "Membership not found" }, { status: 404 });
  }

  if (
    !canChangeMemberRole(
      actor,
      actorMembership
        ? {
            groupId: actorMembership.groupId,
            userId: actorMembership.userId,
            role: actorMembership.role,
          }
        : null,
      {
        groupId: targetMembership.groupId,
        userId: targetMembership.userId,
        role: targetMembership.role,
      },
      role,
    )
  ) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  if (role === GroupRole.GROUP_SUPER_ADMIN) {
    const superAdminCount = await countSuperAdminsInGroup(groupId);

    if (
      superAdminCount > 0 &&
      targetMembership.role !== GroupRole.GROUP_SUPER_ADMIN
    ) {
      return Response.json(
        { error: "Group already has a super admin" },
        { status: 409 },
      );
    }
  }

  const membership = await updateMembershipRole(membershipId, role);

  return Response.json({ membership });
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ groupId: string }> },
) {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { groupId } = await context.params;
  const actorMembership = await getMembershipForUserInGroup(groupId, actor.id);
  const body = (await request.json()) as { membershipId?: string };
  const membershipId = body.membershipId?.trim();

  if (!membershipId) {
    return Response.json(
      { error: "membershipId is required" },
      { status: 400 },
    );
  }

  const targetMembership = await getMembershipById(membershipId);

  if (!targetMembership || targetMembership.groupId !== groupId) {
    return Response.json({ error: "Membership not found" }, { status: 404 });
  }

  if (
    !canRemoveMember(
      actor,
      actorMembership
        ? {
            groupId: actorMembership.groupId,
            userId: actorMembership.userId,
            role: actorMembership.role,
          }
        : null,
      {
        groupId: targetMembership.groupId,
        userId: targetMembership.userId,
        role: targetMembership.role,
      },
    )
  ) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  await removeMembership(membershipId);

  return Response.json({ deleted: true });
}
