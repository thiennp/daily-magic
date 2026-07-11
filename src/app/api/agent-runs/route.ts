import { listAgentRunsForUser } from "@/lib/dispatch/agentRunQueries";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const runs = await listAgentRunsForUser(actor.id);

  return Response.json({ ok: true, runs });
}
