import { createAgentWitchRequestId } from "@/features/agent/utils/agentWitchSocketUtils";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export const sendWriterSessionEnd = (
  socket: WebSocket | null,
  writerAgent: HarnessWriterAgent,
): void => {
  if (socket === null || socket.readyState !== WebSocket.OPEN) {
    return;
  }

  socket.send(
    JSON.stringify({
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_END,
      payload: { writerAgent },
      requestId: createAgentWitchRequestId(),
    }),
  );
};
