import { requireAuth } from "@/lib/auth/requireAuth";
import { loadEntitlementsForUser } from "@/lib/billing/loadEntitlementsForUser";

export const dynamic = "force-dynamic";

/** GET — customer-safe plan gates (no infra euros). */
export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const entitlements = await loadEntitlementsForUser(actor.id);
  return Response.json(entitlements);
}
