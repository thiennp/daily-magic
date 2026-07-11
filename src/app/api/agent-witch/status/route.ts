import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const status = getAgentWitchHub().getStatus();

  return Response.json({
    ok: true,
    ...status,
    wsPath: process.env.AGENT_WITCH_WS_PATH ?? "/api/agent-witch/ws",
  });
}
