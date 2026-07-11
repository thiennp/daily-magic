import { GroupRole, isGroupRole } from "@/lib/auth/roles";
import { canManageGroupMembers } from "@/lib/auth/groupMemberPermissions";
import { isGlobalAdmin } from "@/lib/auth/globalRolePermissions";
import { requireAuth } from "@/lib/auth/requireAuth";
import {
  addUserToGroup,
  countSuperAdminsInGroup,
} from "@/lib/auth/groupMembershipMutations";
import { getMembershipForUserInGroup } from "@/lib/auth/groupMembershipQueries";
import { getGroupById } from "@/lib/auth/groupQueries";
import { getUserByEmail } from "@/lib/auth/userRepository";

import { getActorMembershipContext } from "@/app/api/admin/groups/[groupId]/members/buildMembershipRows";

export async function postGroupMember(
  groupId: string,
  request: Request,
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const group = await getGroupById(groupId);

  if (!group) {
    return Response.json({ error: "Group not found" }, { status: 404 });
  }

  const actorMembership = await getActorMembershipContext(groupId, actor.id);

  if (!canManageGroupMembers(actor, actorMembership)) {
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
