import { canRemoveMember } from "@/lib/auth/groupMemberPermissions";
import { requireAuth } from "@/lib/auth/requireAuth";
import { removeMembership } from "@/lib/auth/groupMembershipMutations";
import { getMembershipById } from "@/lib/auth/groupMembershipQueries";

import { getActorMembershipContext } from "@/app/api/admin/groups/[groupId]/members/buildMembershipRows";

export async function deleteGroupMember(
  groupId: string,
  request: Request,
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const actorMembership = await getActorMembershipContext(groupId, actor.id);
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
    !canRemoveMember(actor, actorMembership, {
      groupId: targetMembership.groupId,
      userId: targetMembership.userId,
      role: targetMembership.role,
    })
  ) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  await removeMembership(membershipId);

  return Response.json({ deleted: true });
}
