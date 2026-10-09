import { getAgentRunForStrictParticipant } from "@/lib/dispatch/getAgentRunForStrictParticipant";
import { removeAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";
import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";
import { getSql } from "@/lib/db";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

/** Deletes a run the user participates in (DB + in-memory session). Strict ACL; project runs: executor or project owner. */
export async function deleteAgentRunForParticipant(
  runId: string,
  userId: string,
): Promise<boolean> {
  const run = await getAgentRunForStrictParticipant(runId, userId);
  if (run === null) {
    return false;
  }
  // A project run lives on its executor's computer and in the project history: its requester
  // (a member) cannot wipe it; only the executor or the project owner can.
  const projectId = run.projectId?.trim() ?? "";
  if (projectId.length > 0 && run.executorUserId !== userId) {
    const project = await getUserProjectById(projectId);
    if (project?.ownerUserId !== userId) {
      return false;
    }
  }

  removeAgentRunSession(runId);

  if (isAgentWitchDevDashboardEnabled()) {
    return true;
  }

  const sql = getSql();
  await sql`
    DELETE FROM agent_runs
    WHERE id = ${runId}
  `;

  return true;
}
