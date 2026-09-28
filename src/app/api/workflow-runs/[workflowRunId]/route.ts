import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { requireAuth } from "@/lib/auth/requireAuth";
import {
  getWorkflowRunById,
  listWorkflowStepRunsForWorkflowRunId,
} from "@/lib/workflowOrchestration/workflowRunQueries";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { readonly params: Promise<{ readonly workflowRunId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  const { workflowRunId } = await context.params;
  const run = await getWorkflowRunById(workflowRunId);

  if (run === null || run.requesterUserId !== actor.id) {
    return Response.json({ ok: false, message: "Not found." }, { status: 404 });
  }

  void getAgentWitchHub();

  const steps = await listWorkflowStepRunsForWorkflowRunId(workflowRunId);

  return Response.json({ ok: true, run, steps });
}
