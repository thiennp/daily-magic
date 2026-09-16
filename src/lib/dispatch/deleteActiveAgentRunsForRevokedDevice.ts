import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { removeAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";
import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";
import { asRowArray, getSql } from "@/lib/db";

const ACTIVE_AGENT_RUN_STATUSES = [
  AgentRunStatus.RUNNING,
  AgentRunStatus.PENDING_APPROVAL,
] as const;

export const deleteActiveAgentRunsForRevokedDevice = async (input: {
  readonly deviceId: string;
  readonly userId: string;
}): Promise<readonly string[]> => {
  if (isAgentWitchDevDashboardEnabled()) {
    return [];
  }

  const sql = getSql();
  const rows = asRowArray(
    await sql`
      DELETE FROM agent_runs
      WHERE device_id = ${input.deviceId}
        AND status IN (${ACTIVE_AGENT_RUN_STATUSES[0]}, ${ACTIVE_AGENT_RUN_STATUSES[1]})
        AND (
          requester_user_id = ${input.userId}
          OR executor_user_id = ${input.userId}
        )
      RETURNING id
    `,
  );

  const deletedRunIds = rows
    .map((row) => row.id)
    .filter((id): id is string => typeof id === "string" && id.length > 0);

  deletedRunIds.forEach((runId) => {
    removeAgentRunSession(runId);
  });

  return deletedRunIds;
};
