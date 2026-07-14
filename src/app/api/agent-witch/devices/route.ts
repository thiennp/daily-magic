import buildAgentWitchDevicesWithOnlineStatus from "@/lib/agentWitch/buildAgentWitchDevicesWithOnlineStatus";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { listAgentWitchDevicesForUser } from "@/lib/agentWitch/listAgentWitchDevicesForUser";
import { buildMockDevicesApiResponse } from "@/lib/agentWitch/mock/buildMockDevicesApiResponse";
import { readAgentWitchMockScenario } from "@/lib/agentWitch/mock/readAgentWitchMockScenario";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const mockScenario = readAgentWitchMockScenario();
  if (mockScenario !== null) {
    const mockResponse = buildMockDevicesApiResponse(mockScenario);
    if (mockResponse instanceof Response) {
      return mockResponse;
    }

    return Response.json(mockResponse);
  }

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
