import { readAgentAccessRetryAfterHeader } from "@/lib/agentAccess/agentAccessRateLimited";
import {
  agentAccessTooLargeResponse,
  guardAgentAccessPost,
} from "@/lib/agentAccess/guardAgentAccessPost";
import { readBoundedAgentAccessBody } from "@/lib/agentAccess/readBoundedAgentAccessBody";
import {
  isAgentAccessActor,
  requireAgentAccessActor,
} from "@/lib/agentAccess/requireAgentAccessActor";
import { botProjectInviteErrorBody } from "@/lib/projects/acl/invites/botInvites/botProjectInviteErrorBody";
import { botProjectInviteSuccessBody } from "@/lib/projects/acl/invites/botInvites/botProjectInviteSuccessBody";
import { createBotProjectInvite } from "@/lib/projects/acl/invites/botInvites/createBotProjectInvite";

export const dynamic = "force-dynamic";

/**
 * DF-038 REST twin of the create_project_assistant_invite tool. Agent-access
 * Bearer (aw_…) only: no session cookie, no awc_proj_ key. Owner-session
 * invite creation stays on POST ../invites (unchanged).
 */
export async function POST(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const limited = await guardAgentAccessPost(request);
  if (limited !== null) return limited;
  const actor = await requireAgentAccessActor(
    request.headers.get("authorization"),
  );
  if (!isAgentAccessActor(actor)) {
    return Response.json(JSON.parse(actor.text) as unknown, { status: 401 });
  }
  const { projectId } = await context.params;
  const body = await readBoundedAgentAccessBody(request);
  if (body === "too_large") return agentAccessTooLargeResponse();
  const payload =
    body !== null && typeof body === "object"
      ? (body as Record<string, unknown>)
      : {};
  const result = await createBotProjectInvite({
    projectId,
    actorUserId: actor.id,
    role: payload.role,
    scopes: payload.scopes,
    teamLabel: payload.teamLabel,
    platform: payload.platform,
  });
  if (result.ok) {
    return Response.json(botProjectInviteSuccessBody(result), { status: 201 });
  }
  const failure = botProjectInviteErrorBody(result);
  return Response.json(failure.body, {
    status: failure.status,
    headers:
      failure.status === 429 ? readAgentAccessRetryAfterHeader(failure.body) : {},
  });
}
