import { guardTaskSyncOwner } from "@/lib/projects/taskSync/guardTaskSyncOwner";
import { syncAllTasksToLinear } from "@/lib/projects/taskSync/syncAllTasksToLinear";
import { loadTaskSyncSettings } from "@/lib/projects/taskSync/taskSyncSettingsQueries";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

type RouteContext = { params: Promise<{ readonly projectId: string }> };

/**
 * POST /api/projects/:projectId/task-sync/linear/sync — owner only.
 * Pushes up to one batch of unlinked / changed tasks; repeat while
 * `remaining` > 0. 409 sync_disabled when sync is not enabled.
 */
export async function POST(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { projectId } = await context.params;
  const denied = await guardTaskSyncOwner(projectId);
  if (denied !== null) return denied;
  const settings = await loadTaskSyncSettings(projectId, "linear");
  if (settings === null || !settings.enabled) {
    return Response.json(
      { ok: false, code: "sync_disabled", errorMessage: "Task sync is off." },
      { status: 409 },
    );
  }
  return Response.json({
    ok: true,
    ...(await syncAllTasksToLinear(projectId)),
  });
}
