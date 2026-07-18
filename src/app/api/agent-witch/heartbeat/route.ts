import {
  acknowledgeAgentWitchDeviceRestart,
  isAgentWitchDeviceRestartRequested,
} from "@/features/agent-witch/online-wake";
import { ensureAgentWitchDeviceSchema } from "@/lib/agentWitch/ensureAgentWitchDeviceSchema";
import { touchAgentWitchDeviceLastSeen } from "@/lib/agentWitch/touchAgentWitchDeviceLastSeen";
import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";

export const dynamic = "force-dynamic";

const parseHostname = (body: unknown): string | null => {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const hostname = (body as { hostname?: unknown }).hostname;
  if (typeof hostname !== "string") {
    return null;
  }

  const trimmed = hostname.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const parseRestartAck = (body: unknown): boolean => {
  if (typeof body !== "object" || body === null) {
    return false;
  }

  return (body as { restartAck?: unknown }).restartAck === true;
};

export async function POST(request: Request): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);

  if (auth instanceof Response) {
    return auth;
  }

  await ensureAgentWitchDeviceSchema();

  const body = await request.json().catch(() => ({}));

  if (parseRestartAck(body)) {
    await acknowledgeAgentWitchDeviceRestart(auth.device.id);
  }

  await touchAgentWitchDeviceLastSeen(auth.pairingToken, parseHostname(body));

  const restartRequested = await isAgentWitchDeviceRestartRequested(
    auth.device.id,
  );

  return Response.json({
    ok: true,
    deviceId: auth.device.id,
    restartRequested,
  });
}
