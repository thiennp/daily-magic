import { collectLiveAgentWitchDeviceIdsForUser } from "@/lib/agentWitch/collectLiveAgentWitchDeviceIdsForUser";
import { ensureAgentWitchDeviceSchema } from "@/lib/agentWitch/ensureAgentWitchDeviceSchema";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { listAgentWitchDevicesForUser } from "@/lib/agentWitch/listAgentWitchDevicesForUser";
import { resolveAgentWitchInstallConnectionStatus } from "@/lib/agentWitch/resolveAgentWitchInstallConnectionStatus";
export const handleAgentWitchInstallConnectionGet = async (actor: {
  readonly id: string;
}): Promise<Response> => {
  try {
    await ensureAgentWitchDeviceSchema();
    const devices = await listAgentWitchDevicesForUser(actor.id);
    const liveDeviceIds = await collectLiveAgentWitchDeviceIdsForUser(
      getAgentWitchHub(),
      actor.id,
    );
    const status = resolveAgentWitchInstallConnectionStatus({
      devices,
      liveDeviceIds,
    });

    return Response.json({
      ok: true,
      ...status,
    });
  } catch (loadError) {
    const message =
      loadError instanceof Error
        ? loadError.message
        : "Could not verify Mac connection.";

    console.error("[api/agent-witch/install-connection]", loadError);

    return Response.json(
      {
        ok: false,
        error: "Could not verify Mac connection.",
        detail: process.env.NODE_ENV === "production" ? undefined : message,
      },
      { status: 500 },
    );
  }
};
