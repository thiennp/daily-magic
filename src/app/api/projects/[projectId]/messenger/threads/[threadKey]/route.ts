import { requireAuth } from "@/lib/auth/requireAuth";
import { openProjectMessengerThread } from "@/lib/projects/acl/messaging/messenger/openProjectMessengerThread";
import { parseProjectMessengerThreadQuery } from "@/lib/projects/acl/messaging/messenger/parseProjectMessengerThreadQuery";
import { projectMessengerHttpStatus } from "@/lib/projects/acl/messaging/messenger/projectMessengerHttpStatus";

export const dynamic = "force-dynamic";

/**
 * Open one thread (threadKey = bot membershipId or "whole"): newest-first
 * timeline page; marks read on the first (newest) page. Query: before, limit.
 */
export async function GET(
  request: Request,
  context: {
    params: Promise<{ readonly projectId: string; readonly threadKey: string }>;
  },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId, threadKey } = await context.params;
  const parsed = parseProjectMessengerThreadQuery(
    new URL(request.url).searchParams,
  );
  if (!parsed.ok) {
    return Response.json(
      { ok: false, errorMessage: parsed.code, code: parsed.code },
      { status: 400 },
    );
  }
  const result = await openProjectMessengerThread({
    projectId,
    actorUserId: actor.id,
    threadKey,
    before: parsed.query.before,
    limit: parsed.query.limit,
  });
  if (!result.ok) {
    return Response.json(
      { ok: false, errorMessage: result.code, code: result.code },
      { status: projectMessengerHttpStatus(result.code) },
    );
  }
  return Response.json({ projectId, ...result });
}
