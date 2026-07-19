import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { getAgentRunRowById } from "@/lib/dispatch/agentRunEventQueries";
import { markAgentRunCompleted } from "@/lib/dispatch/dispatchClaudeRunToAgent";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
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

  if (existing === null || existing.deviceId !== auth.device.id) {
    return Response.json(
      { ok: false, error: "Run not found." },
      { status: 404 },
    );
  }

  const existingRun = existing;

  if (existingRun.status !== AgentRunStatus.RUNNING) {
    return Response.json({ ok: true, run: existingRun });
  }

  const body = await request.json().catch(() => ({}));

  const parsed = parseCompleteBody(body);

  if (parsed === null) {
    return Response.json(
      { ok: false, error: "exitCode and output are required." },
      { status: 400 },
    );
  }

  const completed = await markAgentRunCompleted(
    getAgentWitchHub(),
    runId,
    parsed.exitCode,
    parsed.output,
  );

  return Response.json({ ok: true, run: completed });
}
