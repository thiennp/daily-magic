import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const hub = getAgentWitchHub();
  const status = hub.getStatus();

  return Response.json({
    ok: true,
    ...status,
    clients: hub.listConnectedClients(),
    wsPath: process.env.AGENT_WITCH_WS_PATH ?? "/api/agent-witch/ws",
  });
}
