import { canManageAllUsers } from "@/lib/auth/globalRolePermissions";
import { requireAuth } from "@/lib/auth/requireAuth";
import { setCostControlExcludedForUser } from "@/lib/billing/setCostControlExcludedForUser";

export const dynamic = "force-dynamic";

/** POST { userId, excluded } — admin-only cost-control exclusion flag. */
export async function POST(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  if (!canManageAllUsers(actor)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = (await request.json().catch(() => null)) as {
    userId?: unknown;
    excluded?: unknown;
  } | null;
  const userId = typeof body?.userId === "string" ? body.userId.trim() : "";
  const excluded = typeof body?.excluded === "boolean" ? body.excluded : null;
  if (!userId || excluded === null) {
    return Response.json(
      { error: "userId and excluded are required." },
      { status: 400 },
    );
  }
  const updated = await setCostControlExcludedForUser({ userId, excluded });
  if (!updated) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }
  return Response.json({ ok: true, userId, excluded });
}
