import { dispatchAgentAutomation } from "@/lib/automations/dispatchAgentAutomation";
import { getAgentAutomationById } from "@/lib/automations/agentAutomationQueries";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function POST(
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

  const result = await dispatchAgentAutomation({
    automationId: id,
    runtime: getAgentWitchHub(),
    source: "manual",
  });

  return Response.json({
    ok: result.ok,
    automation: result.automation,
    agentRunId: result.agentRunId,
    errorMessage: result.errorMessage,
  });
}
