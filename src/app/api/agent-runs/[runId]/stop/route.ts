import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { buildDashboardHttpSender } from "@/lib/dispatch/buildDashboardHttpSender";
import { handleWriterStopMessageAsync } from "@/lib/dispatch/handleWriterStopMessageAsync";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  context: { params: Promise<{ readonly runId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { runId } = await context.params;
  const result = await handleWriterStopMessageAsync(
    getAgentWitchHub(),
    {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_STOP,
      payload: { agentRunId: runId },
    },
    buildDashboardHttpSender(actor.id, actor.email),
  );

  if (result === null) {
    return Response.json(
      { ok: false, errorMessage: "Could not stop run." },
      { status: 500 },
    );
  }

  if (result.type === AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR) {
    const errorMessage =
      typeof result.payload?.errorMessage === "string"
        ? result.payload.errorMessage
        : "Could not stop run.";

    return Response.json(
      { ok: false, errorMessage, message: result },
      { status: 400 },
    );
  }

  return Response.json({ ok: true, message: result });
}
