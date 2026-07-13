import { isGlobalAdmin } from "@/lib/auth/globalRolePermissions";
import { canDeleteGroup } from "@/lib/auth/groupMemberPermissions";
import {
  getMembershipForUserInGroup,
  userOwnsGroupAsSuperAdmin,
} from "@/lib/auth/groupMembershipQueries";
import { requireAuth } from "@/lib/auth/requireAuth";
import {
  createGroup,
  createGroupForOwner,
  deleteGroupById,
  listGroups,
  listManageableGroupsForUser,
} from "@/lib/auth/groupQueries";

export async function GET() {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const groups = isGlobalAdmin(actor)
    ? await listGroups()
    : await listManageableGroupsForUser(actor.id);

  return Response.json({ groups });
}

export async function POST(request: Request) {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const body = (await request.json()) as { name?: string };
  const name = body.name?.trim();

  if (!name) {
    return Response.json({ error: "name is required" }, { status: 400 });
  }

  if (isGlobalAdmin(actor)) {
    const group = await createGroup(name);

    return Response.json({ group }, { status: 201 });
  }

  if (await userOwnsGroupAsSuperAdmin(actor.id)) {
    return Response.json(
      { error: "You already manage a company. Invite teammates instead." },
      { status: 409 },
    );
  }

  const group = await createGroupForOwner(name, actor.id);

  return Response.json({ group }, { status: 201 });
}

export async function DELETE(request: Request) {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const body = (await request.json()) as {
    groupId?: string;
    deleteMembers?: boolean;
  };
  const groupId = body.groupId?.trim();

  if (!groupId) {
    return Response.json({ error: "groupId is required" }, { status: 400 });
  }

  const actorMembership = await getMembershipForUserInGroup(groupId, actor.id);

  if (
    !canDeleteGroup(
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

  await deleteGroupById(groupId, body.deleteMembers === true);

  return Response.json({ deleted: true });
}
