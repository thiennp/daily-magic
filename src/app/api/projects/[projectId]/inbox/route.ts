import { listProjectInbox } from "@/lib/projects/acl/messaging/listProjectInbox";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId } = await context.params;
  const url = new URL(request.url);
  const limitRaw = url.searchParams.get("limit");
  const result = await listProjectInbox({
    projectId,
    actorUserId: actor.id,
    since: url.searchParams.get("since"),
    limit: limitRaw === null ? undefined : Number(limitRaw),
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
