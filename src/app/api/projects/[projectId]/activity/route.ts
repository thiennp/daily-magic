import { listProjectActivity } from "@/lib/projects/acl/listProjectActivity";
import { PROJECT_ACL_FIRST_CONNECT } from "@/lib/projects/acl/projectAclFirstConnect.constant";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  const { projectId } = await context.params;
  const url = new URL(request.url);
  const since = url.searchParams.get("since");
  const cursor = url.searchParams.get("cursor");
  const limitRaw = url.searchParams.get("limit");
  const limit =
    limitRaw !== null && limitRaw.trim().length > 0
      ? Number(limitRaw)
      : undefined;

  const listed = await listProjectActivity({
    projectId,
    actorUserId: actor.id,
    since,
    cursor,
    limit,
  });

  if (!listed.ok) {
    const status = listed.code === "not_found" ? 404 : 403;
    return Response.json({ ok: false, errorMessage: listed.code }, { status });
  }

  return Response.json({
    ok: true,
    projectId,
    events: listed.events,
    nextCursor: listed.nextCursor,
    firstConnect: {
      role: PROJECT_ACL_FIRST_CONNECT.role,
      scopes: PROJECT_ACL_FIRST_CONNECT.scopes,
      note: PROJECT_ACL_FIRST_CONNECT.emptyStateNote,
    },
  });
}
