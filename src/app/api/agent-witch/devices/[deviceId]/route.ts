import { cancelQueuedAgentWitchDispatchOutboxForDevice } from "@/lib/agentWitch/cancelQueuedAgentWitchDispatchOutboxForDevice";
import { deleteAgentWitchDevice } from "@/lib/agentWitch/deleteAgentWitchDevice";
import disconnectAgentClientsForDevice from "@/lib/agentWitch/disconnectAgentClientsForDevice";
import {
  getAgentWitchHub,
  getAgentWitchPairingStore,
} from "@/lib/agentWitch/getAgentWitchHub";
import { deleteActiveAgentRunsForRevokedDevice } from "@/lib/dispatch/deleteActiveAgentRunsForRevokedDevice";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

interface RouteContext {
  readonly params: Promise<{
    readonly deviceId: string;
  }>;
}

export async function DELETE(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { deviceId } = await context.params;
  const deleted = await deleteAgentWitchDevice({
    deviceId,
    userId: actor.id,
  });

  if (!deleted) {
    return Response.json({ error: "Device not found." }, { status: 404 });
  }

  const hub = getAgentWitchHub();
  getAgentWitchPairingStore().evictDeviceFromCache(deviceId);
  disconnectAgentClientsForDevice(hub, actor.id, deviceId);

  const [deletedRunIds] = await Promise.all([
    deleteActiveAgentRunsForRevokedDevice({
      deviceId,
      userId: actor.id,
    }),
    cancelQueuedAgentWitchDispatchOutboxForDevice({
      deviceId,
      userId: actor.id,
    }),
  ]);

  return Response.json({ ok: true, deleted: true, deletedRunIds });
}
