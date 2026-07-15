import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { dispatchClaudeRunForDashboardUser } from "@/lib/dispatch/dispatchClaudeRunForDashboardUser";
import { parseAgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

const readDispatchErrorMessage = (
  payload: Readonly<Record<string, unknown>> | undefined,
): string =>
  typeof payload?.errorMessage === "string" && payload.errorMessage.length > 0
    ? payload.errorMessage
    : "Dispatch failed.";

export async function POST(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = parseAgentRunDispatchBody(body);

  if (parsed === null) {
    return Response.json(
      {
        ok: false,
        errorMessage: "prompt is required.",
        message: {
          type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
          payload: { errorMessage: "prompt is required." },
        },
      },
      { status: 400 },
    );
  }

  const result = await dispatchClaudeRunForDashboardUser({
    runtime: getAgentWitchHub(),
    requesterUserId: actor.id,
    requesterEmail: actor.email,
    body: parsed,
  });

  if (!result.ok) {
    return Response.json(
      {
        ok: false,
        errorMessage: readDispatchErrorMessage(result.message.payload),
        message: result.message,
      },
      { status: 400 },
    );
  }

  return Response.json({
    ok: true,
    message: result.message,
    run: result.run,
  });
}
