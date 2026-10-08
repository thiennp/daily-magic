import { requireAuth } from "@/lib/auth/requireAuth";
import { loadProjectKnowledgeImpact } from "@/lib/knowledge/loadProjectKnowledgeImpact";
import { authorizeProjectPageActor } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";

export const dynamic = "force-dynamic";

/**
 * GET: project knowledge impact (aggregates reported by members' computers).
 * Every page actor sees totals and weekly series; only the owner also sees the
 * per-computer breakdown and install status. Non-members get 404.
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
  const impact = await loadProjectKnowledgeImpact({
    projectId: access.project.id,
    includeComputers: access.role === "owner",
  });
  return Response.json({ ok: true, projectId: access.project.id, impact });
}
