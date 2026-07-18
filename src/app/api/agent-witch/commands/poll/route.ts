import { pollAgentWitchDeviceCommand } from "@/lib/agentWitch/agentWitchOutboundCommandQueue";
import { registerHttpAgentWitchClient } from "@/lib/agentWitch/registerHttpAgentWitchClient";
import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";
import { touchAgentWitchDeviceLastSeen } from "@/lib/agentWitch/touchAgentWitchDeviceLastSeen";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: Request): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);

  if (auth instanceof Response) {
    return auth;
  }

  registerHttpAgentWitchClient({
    deviceId: auth.device.id,
    userId: auth.device.userId,
    pairingToken: auth.pairingToken,
    deviceLabel: auth.device.deviceLabel,
  });

  await touchAgentWitchDeviceLastSeen(
    auth.pairingToken,
    auth.device.deviceLabel,
  );

  const command = await pollAgentWitchDeviceCommand(auth.device.id, 25_000);

  if (command === null) {
    return Response.json({ ok: true, command: null });
  }

  return Response.json({
    ok: true,
    command: {
      id: command.id,
      message: command.message,
    },
  });
}
