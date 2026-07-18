import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { createLinkAccountToken } from "@/lib/agentWitch/linkAccountToken";
import { registerPendingAccountLink } from "@/lib/agentWitch/pendingAccountLinkRegistry";
import { pushPendingAccountLinkToAgents } from "@/lib/agentWitch/pushPendingAccountLinkToAgents";
import { buildAppOriginFromHeaders } from "@/lib/agentWitch/resolveAgentWitchAppOrigin";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const linkToken = createLinkAccountToken(actor.id, actor.email);
  if (linkToken === null) {
    return Response.json(
      { error: "Account linking is not configured on this server." },
      { status: 503 },
    );
  }

  const email = actor.email.trim().toLowerCase();
  const appOrigin = buildAppOriginFromHeaders(request.headers);

  registerPendingAccountLink({
    userId: actor.id,
    email,
    linkToken,
    appOrigin,
  });
  pushPendingAccountLinkToAgents(getAgentWitchHub(), email);

  return Response.json({
    ok: true,
    linkToken,
    email,
  });
}
