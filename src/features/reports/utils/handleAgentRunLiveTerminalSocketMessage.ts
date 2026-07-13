import {
  parseDispatchApprovalSocketMessage,
  type AgentRunInputRequest,
} from "@/features/dispatch/utils/agentRunInputSocket";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const handleAgentRunLiveTerminalSocketMessage = (
  runId: string,
  parsed: unknown,
  callbacks: {
    readonly onOutputChunk: (chunk: string) => void;
    readonly onStreamEnd: () => void;
    readonly onInputRequired: (request: AgentRunInputRequest) => void;
  },
): void => {
  if (!isRecord(parsed) || !("type" in parsed)) {
    return;
  }

  parseDispatchApprovalSocketMessage(parsed, {
    onApprovalRequired: () => undefined,
    onInputRequired: (request) => {
      if (request.agentRunId === runId) {
        callbacks.onInputRequired(request);
      }
    },
  });

  if (!("payload" in parsed) || !isRecord(parsed.payload)) {
    return;
  }

  const payload = parsed.payload;
  if (payload.runId !== runId) {
    return;
  }

  if (parsed.type === AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_CHUNK) {
    const chunk = typeof payload.chunk === "string" ? payload.chunk : "";
    if (chunk.length > 0) {
      callbacks.onOutputChunk(chunk);
    }
  }

  if (parsed.type === AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_END) {
    callbacks.onStreamEnd();
  }
};
