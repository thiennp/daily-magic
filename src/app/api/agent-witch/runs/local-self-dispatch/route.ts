import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { DispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";
import createAgentRun from "@/lib/dispatch/createAgentRun";
import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";
import { registerAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";
import { parseLocalSelfDispatchBody } from "@/lib/dispatch/parseLocalSelfDispatchBody";
import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);

  if (auth instanceof Response) {
    return auth;
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = parseLocalSelfDispatchBody(body);

  if (parsed === null) {
    return Response.json(
      { ok: false, errorMessage: "Invalid local self-dispatch payload." },
      { status: 400 },
    );
  }

  // The id is chosen by the client: never let it touch (or overwrite the stored prompt of) a run
  // that already exists, whoever owns it.
  if ((await getAgentRunById(parsed.agentRunId)) !== null) {
    return Response.json(
      { ok: false, errorMessage: "This run id is already in use." },
      { status: 409 },
    );
  }

  const run = await createAgentRun({
    id: parsed.agentRunId,
    groupId: null,
    requesterUserId: auth.device.userId,
    executorUserId: auth.device.userId,
    deviceId: auth.device.id,
    prompt: parsed.prompt,
    status: AgentRunStatus.RUNNING,
    dispatchPolicy: DispatchPolicy.OPEN,
    writerAgent: parsed.writerAgent,
  });

  registerAgentRunSession(run);

  return Response.json({ ok: true, run });
}
