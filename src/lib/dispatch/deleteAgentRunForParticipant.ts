import { getAgentRunForParticipant } from "@/lib/dispatch/getAgentRunForParticipant";
import { removeAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";
import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";
import { getSql } from "@/lib/db";

/** Deletes a run the user participates in (DB + in-memory session). */
export async function deleteAgentRunForParticipant(
  runId: string,
  userId: string,
): Promise<boolean> {
  const run = await getAgentRunForParticipant(runId, userId);
  if (run === null) {
    return false;
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
