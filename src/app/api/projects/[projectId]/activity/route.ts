import { listProjectActivityEvents } from "@/lib/projects/acl/activity/listProjectActivityEvents";
import type { ProjectActivityLogErrorCode } from "@/lib/projects/acl/activity/types/ProjectActivityLog.type";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

const STATUS: Readonly<Record<ProjectActivityLogErrorCode, number>> = {
  owner_only: 403,
  not_found: 404,
  invalid_cursor: 400,
  invalid_query: 400,
  unauthorized: 401,
};

/**
 * Access log (owner only). Members and everyone else get 403 owner_only.
 * Query: limit (1–100, default 50), cursor (opaque), category (access|wake), since (ISO).
 * Contract: docs/agentwitch/project-access-log-contract.md
 */
export async function GET(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }
  const { projectId } = await context.params;
  const params = new URL(request.url).searchParams;
  const listed = await listProjectActivityEvents({
    projectId,
    actorUserId: actor.id,
    limit: params.get("limit") ?? undefined,
    cursor: params.get("cursor"),
    category: params.get("category"),
    since: params.get("since"),
  });
  if (!listed.ok) {
    return Response.json(
      { ok: false, error: listed.code },
      { status: STATUS[listed.code] },
    );
  }
  return Response.json(listed);
}
