import { requireAuth } from "@/lib/auth/requireAuth";
import { authorizeProjectPageActor } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { createProjectTask } from "@/lib/projects/tasks/createProjectTask";
import { mapCreateProjectTaskErrorStatus } from "@/lib/projects/tasks/mapCreateProjectTaskErrorStatus";
import { listProjectTaskRecords } from "@/lib/projects/tasks/projectTaskRecordReadQueries";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ readonly projectId: string }>;
};

/**
 * GET /api/projects/:projectId/task-records (DF-024)
 * { ok:true, tasks: ProjectTaskRecord[] } — newest first, meta only.
 * Any project page reader (owner / member / viewer); others 403, missing 404.
 * POST creates a record for the signed-in owner/member (not viewers); status
 * changes go through PATCH .../:taskId, bots through agent-access tools.
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

/**
 * POST /api/projects/:projectId/task-records (Tasks tab "Create task")
 * Body: { title, description?, priority?, status? queued|planned|in_progress, ownerMembershipId? }.
 * 201 { ok:true, task } · else { ok:false, code } with 400/403/404/409/429.
 */
export async function POST(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;

  const body: unknown = await request.json().catch(() => null);
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return Response.json(
      { ok: false, code: "invalid_arguments" },
      { status: 400 },
    );
  }
  const { projectId } = await context.params;
  const { title, description, priority, status, ownerMembershipId } =
    body as Record<string, unknown>;
  const result = await createProjectTask({
    actorUserId: actor.id,
    args: {
      projectId,
      title,
      ...(description !== undefined && { description }),
      ...(priority !== undefined && { priority }),
      ...(status !== undefined && { status }),
      ...(ownerMembershipId !== undefined && { ownerMembershipId }),
    },
  });
  if (!result.ok) {
    return Response.json(
      { ok: false, code: result.code },
      { status: mapCreateProjectTaskErrorStatus(result.code) },
    );
  }
  return Response.json({ ok: true, task: result.task }, { status: 201 });
}
