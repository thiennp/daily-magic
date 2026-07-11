import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

interface RouteContext {
  readonly params: Promise<{
    readonly runId: string;
  }>;
}

export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { runId } = await context.params;
  const run = await getAgentRunById(runId);

  if (
    run === null ||
    (run.requesterUserId !== actor.id && run.executorUserId !== actor.id)
  ) {
    return Response.json({ error: "Run not found." }, { status: 404 });
  }

  return Response.json({ ok: true, run });
}
