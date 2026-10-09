import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { dispatchClaudeRunForDashboardUser } from "@/lib/dispatch/dispatchWriterRunForDashboardUser";
import {
  buildAgentRunDispatchFailureResponse,
  buildAgentRunDispatchPromptRequiredResponse,
} from "@/lib/dispatch/buildAgentRunDispatchFailureResponse";
import { isAllowedAppHttpOrigin } from "@/lib/app/isAllowedAppHttpOrigin";
import { guardAgentRunDispatchBody } from "@/lib/dispatch/guardAgentRunDispatchBody";
import { parseAgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";
import { isCursorCloudDispatchBody } from "@/lib/dispatch/isCursorCloudDispatchBody";
import { isCursorCloudExecutorDeviceId } from "@/lib/cursorCloud/cursorCloudExecutorDeviceId.constant";
import { requireAuth } from "@/lib/auth/requireAuth";
import { refuseTooOldAgentWitchDeviceForConnect } from "@/lib/agentWitch/refuseTooOldAgentWitchDeviceForConnect";
import { resolveTargetDeviceId } from "@/lib/dispatch/resolveWriterRunAgentClient";
import { buildClaudeDispatchPayloadFromBody } from "@/lib/dispatch/buildWriterDispatchPayloadFromBody";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  try {
    const { actor, error } = await requireAuth();

    if (error || !actor) {
      return error;
    }

    const body: unknown = await request.json().catch(() => null);
    const parsed = parseAgentRunDispatchBody(body);

    if (parsed === null) {
      return buildAgentRunDispatchPromptRequiredResponse();
    }

    const targetDeviceId = resolveTargetDeviceId(
      buildClaudeDispatchPayloadFromBody(parsed),
    );
    if (
      targetDeviceId !== undefined &&
      !isCursorCloudExecutorDeviceId(targetDeviceId)
    ) {
      const tooOldResponse =
        await refuseTooOldAgentWitchDeviceForConnect(targetDeviceId);
      if (tooOldResponse !== null) {
        return tooOldResponse;
      }
    }

    if (isCursorCloudDispatchBody(parsed) && !isAllowedAppHttpOrigin(request)) {
      return buildAgentRunDispatchFailureResponse(
        {
          type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
          payload: {
            errorMessage:
              "Cursor Cloud dispatch must be requested from this app origin.",
          },
        },
        403,
      );
    }

    const bodyGuard = await guardAgentRunDispatchBody({
      requesterUserId: actor.id,
      body: parsed,
    });
    if (!bodyGuard.ok) {
      return Response.json(
        { ok: false, errorMessage: bodyGuard.errorMessage },
        { status: 403 },
      );
    }

    const result = await dispatchClaudeRunForDashboardUser({
      runtime: getAgentWitchHub(),
      requesterUserId: actor.id,
      requesterEmail: actor.email,
      body: parsed,
    });

    if (!result.ok) {
      return buildAgentRunDispatchFailureResponse(result.message, 400);
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
    return buildAgentRunDispatchFailureResponse(
      {
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
        payload: { errorMessage },
      },
      500,
    );
  }
}
