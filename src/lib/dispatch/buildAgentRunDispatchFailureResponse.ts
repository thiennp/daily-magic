import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

const readDispatchErrorMessage = (
  payload: Readonly<Record<string, unknown>> | undefined,
): string =>
  typeof payload?.errorMessage === "string" && payload.errorMessage.length > 0
    ? payload.errorMessage
    : "Dispatch failed.";

const readDispatchErrorCode = (
  payload: Readonly<Record<string, unknown>> | undefined,
): string | undefined =>
  typeof payload?.errorCode === "string" && payload.errorCode.length > 0
    ? payload.errorCode
    : undefined;

const readDispatchHttpStatus = (
  payload: Readonly<Record<string, unknown>> | undefined,
  fallback: number,
): number =>
  typeof payload?.httpStatus === "number" &&
  Number.isFinite(payload.httpStatus)
    ? payload.httpStatus
    : fallback;

export const buildAgentRunDispatchFailureResponse = (
  message: {
    readonly type: string;
    readonly payload?: Readonly<Record<string, unknown>>;
    readonly requestId?: string;
  },
  status: number,
): Response => {
  const errorMessage = readDispatchErrorMessage(message.payload);
  const code = readDispatchErrorCode(message.payload);

  return Response.json(
    {
      ok: false,
      errorMessage,
      ...(code !== undefined ? { code } : {}),
      message,
    },
    { status: readDispatchHttpStatus(message.payload, status) },
  );
};

export const buildAgentRunDispatchPromptRequiredResponse = (): Response =>
  buildAgentRunDispatchFailureResponse(
    {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: { errorMessage: "prompt is required." },
    },
    400,
  );
