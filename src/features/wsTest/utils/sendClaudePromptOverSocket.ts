import { createAgentWitchRequestId } from "@/features/wsTest/utils/agentWitchSocketUtils";
import { requestAgentWitchWake } from "@/lib/agentWitch/requestAgentWitchWake";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export function sendClaudePromptOverSocket(input: {
  readonly socket: WebSocket | null;
  readonly prompt: string;
  readonly writerAgent: HarnessWriterAgent;
  readonly targetUserId?: string;
  readonly groupId?: string;
  readonly capabilityId?: string;
  readonly onResponse: (response: string) => void;
}): void {
  const sendPrompt = (): void => {
    const socket = input.socket;
    if (socket === null || socket.readyState !== WebSocket.OPEN) {
      input.onResponse(
        JSON.stringify({
          type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
          payload: { errorMessage: "WebSocket is not connected." },
        }),
      );
      return;
    }

    socket.send(
      JSON.stringify({
        type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RUN,
        payload: {
          prompt: input.prompt,
          writerAgent: input.writerAgent,
          ...(input.targetUserId ? { targetUserId: input.targetUserId } : {}),
          ...(input.groupId ? { groupId: input.groupId } : {}),
          ...(input.capabilityId ? { capabilityId: input.capabilityId } : {}),
        },
        requestId: createAgentWitchRequestId(),
      }),
    );
  };

  void requestAgentWitchWake().finally(sendPrompt);
}
