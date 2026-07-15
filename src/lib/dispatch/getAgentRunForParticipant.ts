import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export async function getAgentRunForParticipant(
  runId: string,
  userId: string,
): Promise<AgentRunRecord | null> {
  const run = await getAgentRunById(runId);

  if (
    run === null ||
    (run.requesterUserId !== userId && run.executorUserId !== userId)
  ) {
    return null;
  }

  return run;
}
