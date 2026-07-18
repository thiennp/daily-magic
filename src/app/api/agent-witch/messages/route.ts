import isAgentWitchMessage from "@/lib/agentWitch/isAgentWitchMessage";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { registerHttpAgentWitchClient } from "@/lib/agentWitch/registerHttpAgentWitchClient";
import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";

export const dynamic = "force-dynamic";

/**
 * Mac → server event ingest (replaces agent WebSocket sends).
 * Body is a single AgentWitchMessage JSON document.
 */
export async function POST(request: Request): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);

  if (auth instanceof Response) {
    return auth;
  }

  const body: unknown = await request.json().catch(() => null);

  if (!isAgentWitchMessage(body)) {
    return Response.json(
      { ok: false, error: "Invalid Agent Witch message." },
      { status: 400 },
    );
  }

  const client = registerHttpAgentWitchClient({
    deviceId: auth.device.id,
    userId: auth.device.userId,
    pairingToken: auth.pairingToken,
    deviceLabel: auth.device.deviceLabel,
  });

  const hub = getAgentWitchHub();
  const reply = await hub.handleMessageAsync(client.id, body);

  return Response.json({
    ok: true,
    reply,
  });
}
