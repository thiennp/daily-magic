import {
  canDeleteUser,
  canManageAllUsers,
  isGlobalAdmin,
} from "@/lib/auth/permissions";
import { requireAuth } from "@/lib/auth/requireAuth";
import {
  deleteUserById,
  getUserById,
  listUsers,
} from "@/lib/auth/userRepository";

export async function GET() {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  if (!canManageAllUsers(actor)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await listUsers();

  return Response.json({ users });
}

export async function DELETE(request: Request) {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  if (!isGlobalAdmin(actor)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await request.json()) as { userId?: string };
  const userId = body.userId?.trim();

  if (!userId) {
    return Response.json({ error: "userId is required" }, { status: 400 });
  }

  const target = await getUserById(userId);

  if (!target) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  if (!canDeleteUser(actor, target)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  await deleteUserById(userId);

  return Response.json({ deleted: true });
}
