import keepRunScopedComponentsInProjectForOwner from "@/lib/projects/composition/keepRunScopedComponentsInProjectForOwner";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  context: {
    params: Promise<{ readonly projectId: string; readonly runId: string }>;
  },
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { projectId, runId } = await context.params;
  const result = await keepRunScopedComponentsInProjectForOwner({
    ownerUserId: actor.id,
    projectId: projectId.trim(),
    agentRunId: runId.trim(),
  });

  if (!result.ok) {
    return Response.json(
      { ok: false, errorMessage: result.errorMessage },
      { status: 400 },
    );
  }

  return Response.json({ ok: true, boundCount: result.boundCount });
}
