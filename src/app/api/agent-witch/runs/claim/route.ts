import { claimAgentRunForDevice } from "@/lib/dispatch/claimAgentRunForDevice";
import { registerAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";
import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);

  if (auth instanceof Response) {
    return auth;
  }

  const run = await claimAgentRunForDevice(auth.device.id);

  if (run === null) {
    return Response.json({ ok: true, run: null });
  }

  registerAgentRunSession(run);

  return Response.json({ ok: true, run });
}
