import { requireAuth } from "@/lib/auth/requireAuth";
import { withProjectTaskOwnerName } from "@/lib/projects/tasks/loadProjectTaskOwnerName";
import { mapProjectTaskErrorStatus } from "@/lib/projects/tasks/mapProjectTaskErrorStatus";
import { updateProjectTask } from "@/lib/projects/tasks/updateProjectTask";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ readonly projectId: string; readonly taskId: string }>;
};

/**
 * PATCH /api/projects/:projectId/task-records/:taskId
 * Body: { status?, priority? (p0..p3|null), ownerMembershipId? (seat id|null) }.
 * 200 { ok:true, task } · else { ok:false, code } with 400/403/404/409.
 * Auth, status FSM, compare-and-set and agent notices: updateProjectTask.
 */
export async function PATCH(
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
  const { status, priority, ownerMembershipId } = body as Record<
    string,
    unknown
  >;
  const { projectId, taskId } = await context.params;
  const result = await updateProjectTask({
    actorUserId: actor.id,
    args: {
      projectId,
      taskId,
      ...(status !== undefined && { status }),
      ...(priority !== undefined && { priority }),
      ...(ownerMembershipId !== undefined && { ownerMembershipId }),
    },
  });
  if (!result.ok) {
    return Response.json(
      { ok: false, code: result.code },
      { status: mapProjectTaskErrorStatus(result.code) },
    );
  }
  return Response.json({
    ok: true,
    task: await withProjectTaskOwnerName(result.task),
  });
}
