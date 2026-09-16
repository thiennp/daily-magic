import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";

export default interface AgentWitchHubDispatchRelayResult {
  readonly ok: boolean;
  readonly message?: AgentWitchMessage;
  readonly run?: AgentRunRecord;
}
