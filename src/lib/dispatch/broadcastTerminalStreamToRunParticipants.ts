import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { buildRunTerminalSubscriptionKey } from "@/lib/dispatch/dashboardTerminalSubscriptionRegistry";

export const broadcastTerminalStreamToRunParticipants = (
  runtime: AgentWitchHubRuntime,
  run: AgentRunRecord,
  message: AgentWitchMessage,
): void => {
  const subscriptionKey = buildRunTerminalSubscriptionKey(run.id);
  runtime.broadcastToSubscribedDashboardUser(
    run.requesterUserId,
    subscriptionKey,
    message,
  );
  if (run.executorUserId !== run.requesterUserId) {
    runtime.broadcastToSubscribedDashboardUser(
      run.executorUserId,
      subscriptionKey,
      message,
    );
  }
};
