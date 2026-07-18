import { createAgentWitchRequestId } from "@/features/agent/utils/agentWitchSocketUtils";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export const sendWriterSessionStartOverSocket = (input: {
  readonly socket: WebSocket | null;
  readonly writerAgent: HarnessWriterAgent;
  readonly targetDeviceId?: string;
  readonly onResponse: (response: string) => void;
}): void => {
  const socket = input.socket;
  if (socket === null || socket.readyState !== WebSocket.OPEN) {
    input.onResponse(
      JSON.stringify({
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
        payload: {
          errorMessage: "This page is not connected to the server.",
        },
      }),
    );
    return;
  }

  socket.send(
    JSON.stringify({
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_START,
      payload: {
        writerAgent: input.writerAgent,
        ...(input.targetDeviceId !== undefined &&
        input.targetDeviceId.length > 0
          ? { targetDeviceId: input.targetDeviceId }
          : {}),
      },
      requestId: createAgentWitchRequestId(),
    }),
  );
};

export const dispatchWriterSessionStart = async (input: {
  readonly socket: WebSocket | null;
  readonly writerAgent: HarnessWriterAgent;
  readonly targetDeviceId?: string;
  readonly onResponse: (response: string) => void;
}): Promise<void> => {
  sendWriterSessionStartOverSocket(input);
};
