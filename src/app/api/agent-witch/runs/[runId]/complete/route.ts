import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { getAgentRunRowById } from "@/lib/dispatch/agentRunEventQueries";
import { markAgentRunCompleted } from "@/lib/dispatch/dispatchWriterRunToAgent";
import {
  parseAgentRunCompleteBody,
  parseAgentRunEstimateComparisonBody,
} from "@/lib/dispatch/parseAgentRunCompleteBody";
import { setAgentRunEstimateComparison } from "@/lib/dispatch/setAgentRunEstimateComparison";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";

export const dynamic = "force-dynamic";

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

  const body = await request.json().catch(() => ({}));
  const comparison = parseAgentRunEstimateComparisonBody(body);
  const hub = getAgentWitchHub();

  if (existing.status !== AgentRunStatus.RUNNING) {
    if (comparison === null) {
      return Response.json({ ok: true, run: existing });
    }

    const updated = await setAgentRunEstimateComparison(hub, runId, comparison);
    return Response.json({ ok: true, run: updated ?? existing });
  }

  const parsed = parseAgentRunCompleteBody(body);

  if (parsed === null) {
    if (comparison === null) {
      return Response.json(
        { ok: false, error: "exitCode and output are required." },
        { status: 400 },
      );
    }

    const updated = await setAgentRunEstimateComparison(hub, runId, comparison);
    return Response.json({ ok: true, run: updated ?? existing });
  }

  const completed = await markAgentRunCompleted(
    hub,
    runId,
    parsed.exitCode,
    parsed.output,
    comparison ?? undefined,
  );

  return Response.json({ ok: true, run: completed });
}
