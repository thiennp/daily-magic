import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { getTaskSyncOverview } from "@/lib/projects/taskSync/getTaskSyncOverview";
import { guardTaskSyncOwner } from "@/lib/projects/taskSync/guardTaskSyncOwner";
import { parseTaskSyncSettingsPatch } from "@/lib/projects/taskSync/parseTaskSyncSettingsPatch";
import { updateTaskSyncSettings } from "@/lib/projects/taskSync/updateTaskSyncSettings";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ readonly projectId: string }> };

/** GET /api/projects/:projectId/task-sync/linear — owner only; no secrets. */
export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { projectId } = await context.params;
  const denied = await guardTaskSyncOwner(projectId);
  if (denied !== null) return denied;
  return Response.json({ ok: true, ...(await getTaskSyncOverview(projectId)) });
}

/**
 * PUT { enabled?, externalTeamId?, importNew? } — owner only. Enabling
 * registers the Linear webhook, disabling removes it. Returns the new overview.
 */
export async function PUT(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const { projectId } = await context.params;
  const denied = await guardTaskSyncOwner(projectId);
  if (denied !== null) return denied;
  const patch = parseTaskSyncSettingsPatch(
    await request.json().catch(() => null),
  );
  if (patch === null) return projectAccessErrorJson("invalid_request", 400);
  const result = await updateTaskSyncSettings({ projectId, patch });
  if (!result.ok) {
    return Response.json(
      { ok: false, code: result.code, errorMessage: result.code },
      { status: result.code === "unavailable" ? 501 : 409 },
    );
  }
  return Response.json({ ok: true, ...(await getTaskSyncOverview(projectId)) });
}
