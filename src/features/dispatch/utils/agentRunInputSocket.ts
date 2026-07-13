import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { createAgentWitchRequestId } from "@/features/wsTest/utils/agentWitchSocketUtils";

export interface AgentRunInputRequest {
  readonly agentRunId: string;
  readonly question: string;
  readonly partialOutput: string;
}

export const parseDispatchApprovalSocketMessage = (
  parsed: Record<string, unknown>,
  handlers: {
    readonly onApprovalRequired: (payload: {
      readonly runId: string;
      readonly requesterEmail: string;
      readonly prompt: string;
    }) => void;
    readonly onInputRequired?: (payload: AgentRunInputRequest) => void;
  },
): void => {
  if (
    parsed.type === AGENT_WITCH_MESSAGE_TYPES.DISPATCH_APPROVAL_REQUIRED &&
    "payload" in parsed &&
    typeof parsed.payload === "object" &&
    parsed.payload !== null
  ) {
    const payload = parsed.payload as Record<string, unknown>;
    const runId = typeof payload.runId === "string" ? payload.runId : "";
    const prompt = typeof payload.prompt === "string" ? payload.prompt : "";
    const requesterEmail =
      typeof payload.requesterEmail === "string"
        ? payload.requesterEmail
        : "Teammate";

    if (runId.length > 0 && prompt.length > 0) {
      handlers.onApprovalRequired({ runId, prompt, requesterEmail });
    }
  }

  if (
    handlers.onInputRequired !== undefined &&
    parsed.type === AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_INPUT_REQUIRED &&
    "payload" in parsed &&
    typeof parsed.payload === "object" &&
    parsed.payload !== null
  ) {
    const payload = parsed.payload as Record<string, unknown>;
    const agentRunId =
      typeof payload.agentRunId === "string" ? payload.agentRunId : "";
    const question =
      typeof payload.question === "string" ? payload.question : "";
    const partialOutput =
      typeof payload.partialOutput === "string" ? payload.partialOutput : "";

    if (agentRunId.length > 0 && question.length > 0) {
      handlers.onInputRequired({ agentRunId, question, partialOutput });
    }
  }
};

export const sendAgentRunInputResponse = (
  socket: WebSocket,
  agentRunId: string,
  response: string,
): void => {
  socket.send(
    JSON.stringify({
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_INPUT_RESPOND,
      payload: {
        agentRunId,
        response,
      },
      requestId: createAgentWitchRequestId(),
    }),
  );
};
