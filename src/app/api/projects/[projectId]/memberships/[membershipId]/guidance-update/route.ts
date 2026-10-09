import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { sendBotGuidanceUpdate } from "@/lib/projects/acl/sendBotGuidanceUpdate";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

/** POST — owner or the inviting member asks an assistant to fetch new guidance. */
export async function POST(
  _request: Request,
  context: {
    params: Promise<{
      readonly projectId: string;
      readonly membershipId: string;
    }>;
  },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }
  const { projectId, membershipId } = await context.params;
  const result = await sendBotGuidanceUpdate({
    projectId,
    membershipId,
    actorUserId: actor.id,
  });
  if (!result.ok) {
    const status =
      result.code === "forbidden"
        ? 403
        : result.code === "not_found"
          ? 404
          : 400;
    return projectAccessErrorJson(result.code, status);
  }
  return Response.json({ ok: true, messageId: result.messageId });
}
