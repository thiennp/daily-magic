import { canManageGroupMembers } from "@/lib/auth/groupMemberPermissions";
import { requireAuth } from "@/lib/auth/requireAuth";
import { getGroupById } from "@/lib/auth/groupQueries";

import {
  buildMembershipRows,
  getActorMembershipContext,
} from "@/app/api/admin/groups/[groupId]/members/buildMembershipRows";

export async function getGroupMembers(groupId: string): Promise<Response> {
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

  const members = await buildMembershipRows(groupId);

  return Response.json({ group, members });
}
