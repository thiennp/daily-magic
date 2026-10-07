import { canManageAllUsers } from "@/lib/auth/globalRolePermissions";
import { requireAuth } from "@/lib/auth/requireAuth";
import { loadCostControlSnapshot } from "@/lib/billing/loadCostControlSnapshot";

export const dynamic = "force-dynamic";

/** GET — admin-only Railway/Neon/infra budget. Never call from Pricing. */
export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  if (!canManageAllUsers(actor)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }
  const snapshot = await loadCostControlSnapshot();
  return Response.json(snapshot);
}
