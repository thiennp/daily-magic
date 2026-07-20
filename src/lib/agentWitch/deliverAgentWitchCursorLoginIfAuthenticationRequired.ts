import {
  markAgentWitchCursorLoginDelivered,
  shouldDeliverAgentWitchCursorLogin,
} from "@/lib/agentWitch/agentWitchCursorLoginDeliveryRegistry";
import { isCursorAuthenticationRequiredError } from "@/lib/agentWitch/isCursorAuthenticationRequiredError";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export const deliverAgentWitchCursorLoginIfAuthenticationRequired = (
  sender: AgentWitchHubClient | undefined,
  output: string,
): boolean => {
  if (sender === undefined || sender.role !== "agent") {
    return false;
  }

  if (!isCursorAuthenticationRequiredError(output)) {
    return false;
  }

  if (
    !shouldDeliverAgentWitchCursorLogin({
      deviceId: sender.deviceId,
      clientId: sender.id,
    })
  ) {
    return false;
  }

  sender.send({
    type: AGENT_WITCH_MESSAGE_TYPES.WRITER_ENSURE,
    payload: {
      writerAgent: "cursor",
      reason: "cursor-authentication-required",
    },
  });

  markAgentWitchCursorLoginDelivered({
    deviceId: sender.deviceId,
    clientId: sender.id,
  });

  return true;
};
