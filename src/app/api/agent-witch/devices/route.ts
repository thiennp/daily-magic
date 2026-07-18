import buildAgentWitchDevicesWithOnlineStatus from "@/lib/agentWitch/buildAgentWitchDevicesWithOnlineStatus";
import { ensureAgentWitchDeviceSchema } from "@/lib/agentWitch/ensureAgentWitchDeviceSchema";
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

  try {
    await ensureAgentWitchDeviceSchema();
    const devices = await listAgentWitchDevicesForUser(actor.id);
    const devicesWithStatus = buildAgentWitchDevicesWithOnlineStatus(devices);

    return Response.json({
      ok: true,
      devices: devicesWithStatus,
    });
  } catch (loadError) {
    const message =
      loadError instanceof Error
        ? loadError.message
        : "Could not load connected Macs.";

    console.error("[api/agent-witch/devices]", loadError);

    return Response.json(
      {
        ok: false,
        error: "Could not load connected Macs.",
        detail: process.env.NODE_ENV === "production" ? undefined : message,
      },
      { status: 500 },
    );
  }
}
