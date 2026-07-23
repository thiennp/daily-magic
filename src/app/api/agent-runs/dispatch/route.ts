import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { dispatchClaudeRunForDashboardUser } from "@/lib/dispatch/dispatchWriterRunForDashboardUser";
import { parseAgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

const readDispatchErrorMessage = (
  payload: Readonly<Record<string, unknown>> | undefined,
): string =>
  typeof payload?.errorMessage === "string" && payload.errorMessage.length > 0
    ? payload.errorMessage
    : "Dispatch failed.";

const buildDispatchFailureResponse = (
  errorMessage: string,
  status: number,
): Response =>
  Response.json(
    {
      ok: false,
      errorMessage,
      message: {
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
        payload: { errorMessage },
      },
    },
    { status },
  );

export async function POST(request: Request): Promise<Response> {
  try {
    const { actor, error } = await requireAuth();

    if (error || !actor) {
      return error;
    }

    const body: unknown = await request.json().catch(() => null);
    const parsed = parseAgentRunDispatchBody(body);

    if (parsed === null) {
      return buildDispatchFailureResponse("prompt is required.", 400);
    }

    const result = await dispatchClaudeRunForDashboardUser({
      runtime: getAgentWitchHub(),
      requesterUserId: actor.id,
      requesterEmail: actor.email,
      body: parsed,
    });

    if (!result.ok) {
      return buildDispatchFailureResponse(
        readDispatchErrorMessage(result.message.payload),
        400,
      );
    }

    return Response.json({
      ok: true,
      message: result.message,
      run: result.run,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Dispatch failed.";
    console.error("[dispatch] POST /api/agent-runs/dispatch failed:", error);
    return buildDispatchFailureResponse(errorMessage, 500);
  }
}
