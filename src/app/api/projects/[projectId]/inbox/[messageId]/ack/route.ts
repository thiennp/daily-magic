import { ackProjectMessage } from "@/lib/projects/acl/messaging/ackProjectMessage";
import { requireAuth } from "@/lib/auth/requireAuth";

export async function POST(
  _request: Request,
  context: {
    params: Promise<{
      readonly projectId: string;
      readonly messageId: string;
    }>;
  },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { messageId } = await context.params;
  const result = await ackProjectMessage({ messageId, actorUserId: actor.id });
  if (!result.ok) {
    return Response.json({ ok: false, errorMessage: result.code }, { status: 403 });
  }
  return Response.json({ ok: true, messageId: result.messageId });
}
