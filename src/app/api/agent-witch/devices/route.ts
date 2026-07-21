import buildAgentWitchDevicesWithOnlineStatus from "@/lib/agentWitch/buildAgentWitchDevicesWithOnlineStatus";
import { AGENT_WITCH_INSTALL_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchInstallBundleVersion";
import { collectLiveAgentWitchDeviceIdsForUser } from "@/lib/agentWitch/collectLiveAgentWitchDeviceIdsForUser";
import { consolidateDuplicateAgentWitchDevicesForUser } from "@/lib/agentWitch/consolidateDuplicateAgentWitchDevicesForUser";
import { ensureAgentWitchDeviceSchema } from "@/lib/agentWitch/ensureAgentWitchDeviceSchema";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { listAgentWitchDevicesForUser } from "@/lib/agentWitch/listAgentWitchDevicesForUser";
import { buildMockDevicesApiResponse } from "@/lib/agentWitch/mock/buildMockDevicesApiResponse";
import { readAgentWitchMockScenario } from "@/lib/agentWitch/mock/readAgentWitchMockScenario";
import { recordAgentWitchTraffic } from "@/lib/agentWitch/agentWitchTrafficLog";
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
    const liveDeviceIds = await collectLiveAgentWitchDeviceIdsForUser(
      getAgentWitchHub(),
      actor.id,
    );
    await consolidateDuplicateAgentWitchDevicesForUser({
      userId: actor.id,
      preferDeviceIds: liveDeviceIds,
    });
    const devices = await listAgentWitchDevicesForUser(actor.id);
    const devicesWithStatus = buildAgentWitchDevicesWithOnlineStatus(
      devices,
      liveDeviceIds,
    );
    const response = {
      ok: true,
      serverInstallBundleVersion: AGENT_WITCH_INSTALL_BUNDLE_VERSION,
      devices: devicesWithStatus,
    };

    recordAgentWitchTraffic({
      direction: "browser_to_server",
      path: "/api/agent-witch/devices",
      summary: `devices list (${devicesWithStatus.length}; connected=${devicesWithStatus.filter((device) => device.isConnected).length})`,
      response: {
        devices: devicesWithStatus.map((device) => ({
          id: device.id,
          isConnected: device.isConnected,
          isOnline: device.isOnline,
          lastSeenAt: device.lastSeenAt,
        })),
      },
    });

    return Response.json(response);
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
