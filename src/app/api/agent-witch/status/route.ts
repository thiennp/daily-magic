import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { isAgentWitchRuntimeSupported } from "@/lib/agentWitch/isAgentWitchRuntimeSupported";
import { resolveAgentWitchWsUrl } from "@/lib/agentWitch/resolveAgentWitchWsUrl";
import { buildAppOriginFromHeaders } from "@/lib/agentWitch/resolveAgentWitchAppOrigin";
import { isGlobalAdmin } from "@/lib/auth/globalRolePermissions";
import { requireAuth } from "@/lib/auth/requireAuth";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const requestHeaders = await headers();
  const appOrigin = buildAppOriginFromHeaders(requestHeaders);
  const hub = getAgentWitchHub();
  // Everyone sees their own connections; hostnames and counts of other users stay private.
  const clients = hub
    .listConnectedClients()
    .filter((client) => isGlobalAdmin(actor) || client.userId === actor.id);
  const status = {
    agentCount: clients.filter((client) => client.role === "agent").length,
    dashboardCount: clients.filter((client) => client.role === "dashboard")
      .length,
  };

  return Response.json({
    ok: true,
    ...status,
    clients,
    wsPath: process.env.AGENT_WITCH_WS_PATH ?? "/api/agent-witch/ws",
    wsUrl: resolveAgentWitchWsUrl(appOrigin),
    webSocketAvailable: isAgentWitchRuntimeSupported(),
  });
}
