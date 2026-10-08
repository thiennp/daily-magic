import { requireAuth } from "@/lib/auth/requireAuth";
import { enrichAgentRunRecords } from "@/lib/dispatch/enrichAgentRunRecords";
import { listAttentionAgentRunRowsForUser } from "@/lib/dispatch/listAttentionAgentRunRowsForUser";

export const dynamic = "force-dynamic";

/** a13083ee: the user's failed, Stalled and awaiting runs for Home. */
export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const runs = await listAttentionAgentRunRowsForUser(actor.id);
  return Response.json({ ok: true, runs: await enrichAgentRunRecords(runs) });
}
