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

export async function POST(request: Request): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);

  if (auth instanceof Response) {
    return auth;
  }

  const body = await request.json().catch(() => ({}));

  await touchAgentWitchDeviceLastSeen(auth.pairingToken, parseHostname(body));

  return Response.json({
    ok: true,
    deviceId: auth.device.id,
  });
}
