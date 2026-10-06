import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export type ProjectOwnerUserIdLookup = (
  projectId: string,
) => Promise<string | null>;

const loadProjectOwnerUserId: ProjectOwnerUserIdLookup = async (projectId) => {
  const rows = asRowArray(
    await getSql()`
      SELECT owner_user_id
      FROM user_projects
      WHERE id = ${projectId}
      LIMIT 1
    `,
  );
  const owner = rows[0]?.owner_user_id;
  return typeof owner === "string" && owner.length > 0 ? owner : null;
};

/**
 * S0-7 — who may stop a run: the device owner (executor), the person who
 * asked for it (requester; unchanged from main), or the project owner for a
 * project run. Fails closed when the project owner can't be read.
 */
export const isAgentRunStopAllowed = async (
  run: Pick<AgentRunRecord, "requesterUserId" | "executorUserId" | "projectId">,
  userId: string,
  lookupProjectOwner: ProjectOwnerUserIdLookup = loadProjectOwnerUserId,
): Promise<boolean> => {
  if (run.executorUserId === userId || run.requesterUserId === userId) {
    return true;
  }
  if (run.projectId === null || run.projectId.length === 0) {
    return false;
  }
  try {
    return (await lookupProjectOwner(run.projectId)) === userId;
  } catch {
    return false;
  }
};
