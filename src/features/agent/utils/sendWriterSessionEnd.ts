import { createAgentWitchRequestId } from "@/features/agent/utils/agentWitchSocketUtils";
import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export const sendWriterSessionEnd = (
  socket: WebSocket | null,
  writerAgent: HarnessWriterAgent,
  writerSessionId: string | null,
): void => {
  if (socket === null || socket.readyState !== WebSocket.OPEN) {
    return;
  }

  socket.send(
    JSON.stringify({
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_END,
      payload: {
        writerAgent,
        ...(writerSessionId !== null && writerSessionId.length > 0
          ? { writerSessionId }
          : {}),
      },
      requestId: createAgentWitchRequestId(),
    }),
  );
};

export const finishAgentLiveTerminalWriterSession = (
  socket: WebSocket | null,
  state: Pick<
    AgentLiveTerminalState,
    "sessionWriterAgent" | "sessionWriterSessionId"
  >,
): void => {
  if (state.sessionWriterAgent === null) {
    return;
  }

  sendWriterSessionEnd(
    socket,
    state.sessionWriterAgent,
    state.sessionWriterSessionId,
  );
};
