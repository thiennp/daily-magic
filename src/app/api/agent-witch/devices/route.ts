import buildAgentWitchDevicesWithOnlineStatus from "@/lib/agentWitch/buildAgentWitchDevicesWithOnlineStatus";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { listAgentWitchDevicesForUser } from "@/lib/agentWitch/listAgentWitchDevicesForUser";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const hub = getAgentWitchHub();
  const devices = await listAgentWitchDevicesForUser(actor.id);
  const onlineClients = hub.listOnlineAgentClientsForUser(actor.id);
  const devicesWithStatus = buildAgentWitchDevicesWithOnlineStatus(
    devices,
    onlineClients,
  );

  return Response.json({
    ok: true,
    devices: devicesWithStatus,
  });
}
