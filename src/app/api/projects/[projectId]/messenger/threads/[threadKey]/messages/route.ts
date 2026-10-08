import { requireAuth } from "@/lib/auth/requireAuth";
import { orchestrateProjectMessengerSend } from "@/lib/projects/acl/messaging/messenger/orchestrateProjectMessengerSend";
import { projectMessengerHttpStatus } from "@/lib/projects/acl/messaging/messenger/projectMessengerHttpStatus";

const readJson = async (request: Request): Promise<unknown> => {
  try {
    return await request.json();
  } catch {
    return null;
  }
};

/**
 * Send { text, needsReply? } into a bot thread or "whole" (fan-out to every
 * bot). Owner and members; viewers 403 (viewer_read_only); caps 429.
 */
export async function POST(
  request: Request,
  context: {
    params: Promise<{ readonly projectId: string; readonly threadKey: string }>;
  },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId, threadKey } = await context.params;
  const result = await orchestrateProjectMessengerSend({
    projectId,
    actorUserId: actor.id,
    threadKey,
    body: await readJson(request),
  });
  if (!result.ok) {
    const errorMessage =
      result.code === "single_recipient_required"
        ? "One recipient per send"
        : "message" in result
          ? result.message
          : result.code;
    return Response.json(
      {
        ...result,
        errorMessage,
      },
      { status: projectMessengerHttpStatus(result.code) },
    );
  }
  return Response.json(result);
}
