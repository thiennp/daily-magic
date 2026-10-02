import { listProjectInbox } from "@/lib/projects/acl/messaging/listProjectInbox";
import { listProjectMessageLog } from "@/lib/projects/acl/messaging/listProjectMessageLog";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

/**
 * GET inbox:
 * - default: actor-addressed inbox (owner or member)
 * - ?scope=project: owner-only full project message log (peer↔peer + Owner)
 */
export async function GET(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId } = await context.params;
  const url = new URL(request.url);
  const limitRaw = url.searchParams.get("limit");
  const limit = limitRaw === null ? undefined : Number(limitRaw);
  const since = url.searchParams.get("since");
  const scope = url.searchParams.get("scope");

  if (scope === "project") {
    const result = await listProjectMessageLog({
      projectId,
      actorUserId: actor.id,
      since,
      cursor: url.searchParams.get("cursor"),
      limit,
    });
    if (!result.ok) {
      const status = result.code === "not_found" ? 404 : 403;
      return Response.json({ ok: false, errorMessage: result.code }, { status });
    }
    return Response.json({
      ok: true,
      projectId,
      scope: "project",
      messages: result.messages,
      nextCursor: result.nextCursor,
    });
  }

  const result = await listProjectInbox({
    projectId,
    actorUserId: actor.id,
    since,
    limit,
  });
  if (!result.ok) {
    return Response.json({ ok: false, errorMessage: result.code }, { status: 403 });
  }
  return Response.json({
    ok: true,
    projectId,
    messages: result.messages,
  });
}
