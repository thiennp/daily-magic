import { getAgentRunForStrictParticipant } from "@/lib/dispatch/getAgentRunForStrictParticipant";
import { removeAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";
import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";
import { getSql } from "@/lib/db";

/** Deletes a run the user participates in (DB + in-memory session). Strict ACL. */
export async function deleteAgentRunForParticipant(
  runId: string,
  userId: string,
): Promise<boolean> {
  const run = await getAgentRunForStrictParticipant(runId, userId);
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
