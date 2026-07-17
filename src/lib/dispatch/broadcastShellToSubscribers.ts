import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import {
  buildShellSubscriptionKey,
  getShellSession,
} from "@/lib/dispatch/shellSessionRegistry";
import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";
import { getAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";

export const broadcastShellToSubscribers = async (
  runtime: AgentWitchHubRuntime,
  shellSessionId: string,
  message: AgentWitchMessage,
): Promise<void> => {
  const session = getShellSession(shellSessionId);
  if (session === undefined) {
    return;
  }

  const subscriptionKey = buildShellSubscriptionKey(shellSessionId);
  runtime.broadcastToSubscribedDashboardUser(
    session.ownerUserId,
    subscriptionKey,
    message,
  );

  if (session.activeRunId === null) {
    return;
  }

  const run =
    getAgentRunSession(session.activeRunId) ??
    (await getAgentRunById(session.activeRunId));
  if (run === null) {
    return;
  }

  if (
    run.requesterUserId.length > 0 &&
    run.requesterUserId !== session.ownerUserId
  ) {
    runtime.broadcastToSubscribedDashboardUser(
      run.requesterUserId,
      subscriptionKey,
      message,
    );
  }
};
