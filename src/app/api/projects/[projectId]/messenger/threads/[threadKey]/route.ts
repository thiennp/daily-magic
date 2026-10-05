import { requireAuth } from "@/lib/auth/requireAuth";
import { openProjectMessengerThread } from "@/lib/projects/acl/messaging/messenger/openProjectMessengerThread";
import { projectMessengerHttpStatus } from "@/lib/projects/acl/messaging/messenger/projectMessengerHttpStatus";

export const dynamic = "force-dynamic";

/** Open one thread (threadKey = bot membershipId or "whole"): timeline; marks it read. */
export async function GET(
  _request: Request,
  context: {
    params: Promise<{ readonly projectId: string; readonly threadKey: string }>;
  },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId, threadKey } = await context.params;
  const result = await openProjectMessengerThread({
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
  return Response.json({ projectId, ...result });
}
