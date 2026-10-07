import { canManageAllUsers } from "@/lib/auth/globalRolePermissions";
import { requireAuth } from "@/lib/auth/requireAuth";
import { setAdminFreeForUser } from "@/lib/billing/setAdminFreeForUser";

export const dynamic = "force-dynamic";

/** POST { userId, adminFree } — admin-only permanent Free flag. */
export async function POST(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  if (!canManageAllUsers(actor)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }
  const body: unknown = await request.json().catch(() => null);
  const userId =
    body !== null &&
    typeof body === "object" &&
    typeof (body as { userId?: unknown }).userId === "string"
      ? (body as { userId: string }).userId.trim()
      : "";
  const adminFree =
    body !== null &&
    typeof body === "object" &&
    typeof (body as { adminFree?: unknown }).adminFree === "boolean"
      ? (body as { adminFree: boolean }).adminFree
      : null;
  if (!userId || adminFree === null) {
    return Response.json(
      { error: "userId and adminFree are required." },
      { status: 400 },
    );
  }
  const updated = await setAdminFreeForUser({ userId, adminFree });
  if (!updated) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }
  return Response.json({ ok: true, userId, adminFree });
}
