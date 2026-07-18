import {
  acknowledgeAgentWitchDeviceRestart,
  isAgentWitchDeviceRestartRequested,
} from "@/features/agent-witch/online-wake/agentWitchDeviceRestartRequest";
import { findEnrichedAgentClientForUser } from "@/lib/agentWitch/findEnrichedAgentClientForUser";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export const deliverAgentWitchDeviceRestartIfRequested = async (
  runtime: AgentWitchHubRuntime,
  input: {
    readonly userId: string;
    readonly deviceId: string;
  },
): Promise<boolean> => {
  const requested = await isAgentWitchDeviceRestartRequested(input.deviceId);
  if (!requested) {
    return false;
  }

  const agentClient = await findEnrichedAgentClientForUser(
    runtime,
    input.userId,
    input.deviceId,
  );

  if (agentClient === undefined) {
    return false;
  }

  agentClient.send({
    type: AGENT_WITCH_MESSAGE_TYPES.DEVICE_RESTART,
    payload: { deviceId: input.deviceId, reason: "cloud-restart" },
  });

  await acknowledgeAgentWitchDeviceRestart(input.deviceId);
  return true;
};

export const sendAgentWitchDeviceRestartNow = async (
  runtime: AgentWitchHubRuntime,
  input: {
    readonly userId: string;
    readonly deviceId: string;
  },
): Promise<"sent" | "queued"> => {
  const agentClient = await findEnrichedAgentClientForUser(
    runtime,
    input.userId,
    input.deviceId,
  );

  if (agentClient === undefined) {
    return "queued";
  }

  agentClient.send({
    type: AGENT_WITCH_MESSAGE_TYPES.DEVICE_RESTART,
    payload: { deviceId: input.deviceId, reason: "cloud-restart" },
  });

  await acknowledgeAgentWitchDeviceRestart(input.deviceId);
  return "sent";
};
