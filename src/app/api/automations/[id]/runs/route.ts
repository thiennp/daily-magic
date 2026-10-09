import { getAgentAutomationById } from "@/lib/automations/agentAutomationQueries";
import { listAutomationRuns } from "@/lib/automations/listAutomationRuns";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

/** Owner GET: recent runs of this automation (meta only). */
export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }
  const { id } = await context.params;
  const automation = await getAgentAutomationById(id);
  if (automation === null || automation.ownerUserId !== actor.id) {
    return Response.json(
      { ok: false, errorMessage: "Not found." },
      { status: 404 },
    );
  }
  return Response.json({ ok: true, runs: await listAutomationRuns(id) });
}
