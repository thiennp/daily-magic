import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { appendAgentRunEvent } from "@/lib/dispatch/agentRunEventQueries";
import { getAgentRunRowById } from "@/lib/dispatch/agentRunEventQueries";
import { updateAgentRunStatus } from "@/lib/dispatch/agentRunQueries";
import { registerAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";
import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";

export const dynamic = "force-dynamic";

const parseCompleteBody = (
  body: unknown,
): { readonly exitCode: number; readonly output: string } | null => {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const exitCode = (body as { exitCode?: unknown }).exitCode;
  const output = (body as { output?: unknown }).output;

  if (typeof exitCode !== "number" || typeof output !== "string") {
    return null;
  }

  return { exitCode, output };
};

export async function POST(
  request: Request,
  context: { readonly params: Promise<{ readonly runId: string }> },
): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);

  if (auth instanceof Response) {
    return auth;
  }

  const { runId } = await context.params;
  const existing = await getAgentRunRowById(runId);

  if (
    existing === null ||
    existing.deviceId !== auth.device.id ||
    existing.status !== AgentRunStatus.RUNNING
  ) {
    return Response.json(
      { ok: false, error: "Run not found." },
      { status: 404 },
    );
  }

  const body = await request.json().catch(() => ({}));

  const parsed = parseCompleteBody(body);

  if (parsed === null) {
    return Response.json(
      { ok: false, error: "exitCode and output are required." },
      { status: 400 },
    );
  }

  await appendAgentRunEvent({
    agentRunId: runId,
    kind: "terminal.end",
    payload: { exitCode: parsed.exitCode, output: parsed.output },
  });

  const completed = await updateAgentRunStatus(
    runId,
    parsed.exitCode === 0 ? AgentRunStatus.COMPLETED : AgentRunStatus.FAILED,
    {
      resultExitCode: parsed.exitCode,
      resultOutput: parsed.output,
    },
  );

  if (completed !== null) {
    registerAgentRunSession(completed);
  }

  return Response.json({ ok: true, run: completed });
}
