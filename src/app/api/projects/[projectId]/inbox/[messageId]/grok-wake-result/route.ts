import { readProjectGrokWakeResult } from "@/lib/projects/acl/messaging/readProjectGrokWakeResult";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

const statusForCode = (code: "not_found" | "forbidden"): number =>
  code === "not_found" ? 404 : 403;

/**
 * GET one stored Grok wake result. Owner of this project only.
 * JSON is messageId, membershipId, and result. No other fields.
 */
export async function GET(
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
  const { projectId, messageId } = await context.params;
  const read = await readProjectGrokWakeResult({
    projectId,
    messageId,
    actorUserId: actor.id,
  });
  if (!read.ok) {
    return Response.json(
      { ok: false, errorMessage: read.code },
      { status: statusForCode(read.code) },
    );
  }
  return Response.json({
    messageId: read.messageId,
    membershipId: read.membershipId,
    result: read.result,
  });
}
