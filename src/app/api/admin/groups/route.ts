import { canManageAllGroups, isGlobalAdmin } from "@/lib/auth/permissions";
import { requireAuth } from "@/lib/auth/requireAuth";
import {
  createGroup,
  deleteGroupById,
  listGroups,
  listManageableGroupsForUser,
} from "@/lib/auth/groupRepository";

export async function GET() {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const groups = isGlobalAdmin(actor)
    ? await listGroups()
    : await listManageableGroupsForUser(actor.id);

  if (!canManageAllGroups(actor) && groups.length === 0) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  return Response.json({ groups });
}

export async function POST(request: Request) {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  if (!isGlobalAdmin(actor)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await request.json()) as { name?: string };
  const name = body.name?.trim();

  if (!name) {
    return Response.json({ error: "name is required" }, { status: 400 });
  }

  const group = await createGroup(name);

  return Response.json({ group }, { status: 201 });
}

export async function DELETE(request: Request) {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  if (!isGlobalAdmin(actor)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await request.json()) as {
    groupId?: string;
    deleteMembers?: boolean;
  };
  const groupId = body.groupId?.trim();

  if (!groupId) {
    return Response.json({ error: "groupId is required" }, { status: 400 });
  }

  await deleteGroupById(groupId, body.deleteMembers === true);

  return Response.json({ deleted: true });
}
