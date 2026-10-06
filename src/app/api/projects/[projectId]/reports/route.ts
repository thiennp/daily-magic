import { enrichAgentRunRecords } from "@/lib/dispatch/enrichAgentRunRecords";
import { listAgentRunsForProject } from "@/lib/dispatch/listAgentRunsForProject";
import { requireAuth } from "@/lib/auth/requireAuth";
import { authorizeProjectPageActor } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";

export const dynamic = "force-dynamic";

/**
 * GET: project Reports (agent runs) for a page actor.
 * Owner | member | viewer see all runs in the project; else 404.
 */
export async function GET(
  _request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }
  const { projectId } = await context.params;
  const access = await authorizeProjectPageActor({
    projectId: projectId.trim(),
    actorUserId: actor.id,
  });
  if (!access.ok) {
    return Response.json({ error: "Project not found." }, { status: 404 });
  }
  const runs = await listAgentRunsForProject(access.project.id);
  const enrichedRuns = await enrichAgentRunRecords(runs);
  return Response.json({
    ok: true,
    projectId: access.project.id,
    role: access.role,
    runs: enrichedRuns,
  });
}
