import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

/**
 * Strict participant ACL: requester or executor only.
 * Use for DELETE and terminal subscribe — not for project page read.
 */
export async function getAgentRunForStrictParticipant(
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
