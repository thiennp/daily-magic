import { requireAuth } from "@/lib/auth/requireAuth";
import { authorizeProjectPageActor } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { listProjectTaskRecords } from "@/lib/projects/tasks/projectTaskRecordReadQueries";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ readonly projectId: string }>;
};

/**
 * GET /api/projects/:projectId/task-records (DF-024)
 * { ok:true, tasks: ProjectTaskRecord[] } — newest first, meta only.
 * Any project page reader (owner / member / viewer); others 403, missing 404.
 * Writes go through agent-access create_project_task / update_project_task.
 */
export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;

  const { projectId } = await context.params;
  const page = await authorizeProjectPageActor({
    projectId,
    actorUserId: actor.id,
  });
  if (!page.ok) {
    const status = page.reason === "not_found" ? 404 : 403;
    return projectAccessErrorJson(page.reason, status);
  }

  const tasks = await listProjectTaskRecords(projectId);
  return Response.json({ ok: true, tasks });
}
