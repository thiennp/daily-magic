import { getAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export async function getAgentRunForParticipant(
  runId: string,
  userId: string,
): Promise<AgentRunRecord | null> {
  const run = getAgentRunSession(runId);

  if (
    run === undefined ||
    (run.requesterUserId !== userId && run.executorUserId !== userId)
  ) {
    return null;
  }

  return run;
}
