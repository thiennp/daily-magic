import { requireAuth } from "@/lib/auth/requireAuth";
import { markProjectMessengerThreadReadForViewer } from "@/lib/projects/acl/messaging/messenger/markProjectMessengerThreadReadForViewer";
import { projectMessengerHttpStatus } from "@/lib/projects/acl/messaging/messenger/projectMessengerHttpStatus";

/** Mark one thread read for the signed-in user (unread → 0). Never acks. */
export async function POST(
  _request: Request,
  context: {
    params: Promise<{ readonly projectId: string; readonly threadKey: string }>;
  },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId, threadKey } = await context.params;
  const result = await markProjectMessengerThreadReadForViewer({
    projectId,
    actorUserId: actor.id,
    threadKey,
  });
  if (!result.ok) {
    return Response.json(
      { ok: false, errorMessage: result.code, code: result.code },
      { status: projectMessengerHttpStatus(result.code) },
    );
  }
  return Response.json(result);
}
