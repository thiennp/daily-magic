import { updateAgentWitchDevicePreferredWriter } from "@/lib/agentWitch/updateAgentWitchDeviceAuthFields";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export const handleWriterStatusMessageAsync = async (
  runtime: AgentWitchHubRuntime,
  sender: AgentWitchHubClient | undefined,
  message: AgentWitchMessage,
): Promise<AgentWitchMessage | null> => {
  if (sender?.role !== "agent") {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: { errorMessage: "Only agents can report writer.status." },
      requestId: message.requestId,
    };
  }

  const writerAgent =
    typeof message.payload?.writerAgent === "string"
      ? message.payload.writerAgent
      : "";
  const loggedIn = message.payload?.loggedIn === true;
  const installed = message.payload?.installed === true;

  if (
    sender.deviceId !== undefined &&
    writerAgent.length > 0 &&
    installed &&
    loggedIn
  ) {
    await updateAgentWitchDevicePreferredWriter({
      deviceId: sender.deviceId,
      preferredWriter: writerAgent,
    });
  }

  if (sender.userId !== undefined) {
    runtime.broadcastToDashboardUser(sender.userId, {
      type: AGENT_WITCH_MESSAGE_TYPES.WRITER_STATUS,
      payload: {
        deviceId: sender.deviceId,
        writerAgent,
        installed,
        loggedIn,
        errorMessage:
          typeof message.payload?.errorMessage === "string"
            ? message.payload.errorMessage
            : undefined,
      },
      requestId: message.requestId,
    });
  }

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    requestId: message.requestId,
  };
};
