import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export const broadcastTerminalStreamToRunParticipants = (
  runtime: AgentWitchHubRuntime,
  run: AgentRunRecord,
  message: AgentWitchMessage,
): void => {
  runtime.broadcastToDashboardUser(run.requesterUserId, message);
  if (run.executorUserId !== run.requesterUserId) {
    runtime.broadcastToDashboardUser(run.executorUserId, message);
  }
};
