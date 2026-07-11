import { GroupRole, isGroupRole } from "@/lib/auth/roles";
import { canChangeMemberRole } from "@/lib/auth/groupMemberPermissions";
import { requireAuth } from "@/lib/auth/requireAuth";
import {
  countSuperAdminsInGroup,
  updateMembershipRole,
} from "@/lib/auth/groupMembershipMutations";
import { getMembershipById } from "@/lib/auth/groupMembershipQueries";

import { getActorMembershipContext } from "@/app/api/admin/groups/[groupId]/members/buildMembershipRows";

export async function patchGroupMember(
  groupId: string,
  request: Request,
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const actorMembership = await getActorMembershipContext(groupId, actor.id);

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
      actorMembership,
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
