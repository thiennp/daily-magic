import { listProposedImprovementsForOwner } from "@/lib/improvements/capabilityImprovementActions";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const items = await listProposedImprovementsForOwner(actor.id);

  return Response.json({ ok: true, items });
}
