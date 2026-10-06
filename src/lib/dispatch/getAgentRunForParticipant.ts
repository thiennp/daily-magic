import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { authorizeProjectPageActor } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";

/**
 * Detail READ: requester/executor, or any project page actor (owner |
 * member | viewer) when the run is bound to a project.
 * DELETE / terminal subscribe use getAgentRunForStrictParticipant instead.
 */
export async function getAgentRunForParticipant(
  runId: string,
  userId: string,
): Promise<AgentRunRecord | null> {
  const run = await getAgentRunById(runId);
  if (run === null) {
    return null;
  }
  if (run.requesterUserId === userId || run.executorUserId === userId) {
    return run;
  }
  const projectId = run.projectId?.trim() ?? "";
  if (projectId.length === 0) {
    return null;
  }
  const access = await authorizeProjectPageActor({
    projectId,
    actorUserId: userId,
  });
  return access.ok ? run : null;
}
