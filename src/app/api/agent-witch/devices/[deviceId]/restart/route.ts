import { requestAgentWitchDeviceRestart } from "@/features/agent-witch/online-wake";
import isAgentWitchDeviceOwnedByUser from "@/lib/agentWitch/isAgentWitchDeviceOwnedByUser";
import { ensureAgentWitchDeviceSchema } from "@/lib/agentWitch/ensureAgentWitchDeviceSchema";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

interface RouteContext {
  readonly params: Promise<{
    readonly deviceId: string;
  }>;
}

export async function POST(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { deviceId } = await context.params;

  await ensureAgentWitchDeviceSchema();

  const owned = await isAgentWitchDeviceOwnedByUser(deviceId, actor.id);
  if (!owned) {
    return Response.json(
      { ok: false, error: "Device not found." },
      { status: 404 },
    );
  }

  const queued = await requestAgentWitchDeviceRestart(deviceId);
  if (!queued) {
    return Response.json(
      { ok: false, error: "Could not queue restart." },
      { status: 500 },
    );
  }

  return Response.json({
    ok: true,
    deviceId,
    restartRequested: true,
    delivery: "http-heartbeat",
  });
}
