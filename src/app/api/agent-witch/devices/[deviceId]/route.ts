import { getAgentWitchPairingStore } from "@/lib/agentWitch/getAgentWitchHub";
import { revokeAgentWitchDevice } from "@/lib/agentWitch/agentWitchDeviceRepository";
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
  const revoked = await revokeAgentWitchDevice({
    deviceId,
    userId: actor.id,
  });

  if (!revoked) {
    return Response.json({ error: "Device not found." }, { status: 404 });
  }

  getAgentWitchPairingStore().evictDeviceFromCache(deviceId);

  return Response.json({ ok: true, revoked: true });
}
