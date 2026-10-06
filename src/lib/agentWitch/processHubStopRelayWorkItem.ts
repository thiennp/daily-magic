import {
  completeAgentWitchHubDispatchRelay,
  releaseAgentWitchHubDispatchRelayToPending,
} from "@/lib/agentWitch/updateAgentWitchHubDispatchRelayStatus";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type { HubStopRelayBody } from "@/lib/agentWitch/types/HubStopRelayBody.type";
import type { HubDispatchRelayWorkItem } from "@/lib/agentWitch/types/HubDispatchRelayWorkItem.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

/**
 * S0-7 — socket-owning instance forwards a relayed stop to the exact device
 * (never retargeted to another computer). Socket gone → back to pending until
 * the relay TTL; the heartbeat check still applies the stop later.
 */
export const processHubStopRelayWorkItem = async (
  runtime: AgentWitchHubRuntime,
  workItem: HubDispatchRelayWorkItem,
  body: HubStopRelayBody,
): Promise<void> => {
  const agentClient = runtime.findAgentClientForUser(
    workItem.executorUserId,
    workItem.deviceId,
  );
  if (agentClient === undefined) {
    await releaseAgentWitchHubDispatchRelayToPending(workItem.relayId);
    return;
  }
  agentClient.send({
    type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_STOP,
    payload: { agentRunId: body.agentRunId },
    requestId: workItem.requestId,
  });
  await completeAgentWitchHubDispatchRelay({
    relayId: workItem.relayId,
    result: { ok: true },
  });
};
