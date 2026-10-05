import { requireAuth } from "@/lib/auth/requireAuth";
import { listProjectMessengerThreads } from "@/lib/projects/acl/messaging/messenger/listProjectMessengerThreads";
import { projectMessengerHttpStatus } from "@/lib/projects/acl/messaging/messenger/projectMessengerHttpStatus";

export const dynamic = "force-dynamic";

/** Thread list: Whole project (pinned) + one thread per bot, unread + status. Read-only. */
export async function GET(
  _request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId } = await context.params;
  const result = await listProjectMessengerThreads({
    projectId,
    actorUserId: actor.id,
  });
  if (!result.ok) {
    return Response.json(
      { ok: false, errorMessage: result.code, code: result.code },
      { status: projectMessengerHttpStatus(result.code) },
    );
  }
  return Response.json({ ok: true, projectId, ...result.threads });
}
