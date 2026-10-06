import {
  agentAccessTooLargeResponse,
  guardAgentAccessPost,
} from "@/lib/agentAccess/guardAgentAccessPost";
import { registerOauthClient } from "@/lib/agentAccess/oauth/registerOauthClient";
import { readBoundedAgentAccessBody } from "@/lib/agentAccess/readBoundedAgentAccessBody";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  const limited = await guardAgentAccessPost(request);
  if (limited !== null) return limited;

  const payload = await readBoundedAgentAccessBody(request);
  if (payload === "too_large") return agentAccessTooLargeResponse();

  const outcome = await registerOauthClient({ body: payload });
  if (!outcome.ok) {
    return Response.json(
      { error: outcome.error, error_description: outcome.error_description },
      { status: outcome.status },
    );
  }
  return Response.json(outcome.body, { status: 201 });
}
