import { asRowArray, getSql } from "@/lib/db";

/**
 * Did this access request come from someone who already has a revoked seat in the project?
 * A member may not re-seat what was revoked (possibly by the owner): the owner decides.
 */
export const requesterWasRevoked = async (input: {
  readonly projectId: string;
  readonly requestId: string;
}): Promise<boolean> =>
  asRowArray(
    await getSql()`
      SELECT 1
      FROM project_access_requests r
      JOIN project_memberships m
        ON m.project_id = r.project_id AND m.user_id = r.requester_user_id
      WHERE r.id = ${input.requestId} AND r.project_id = ${input.projectId}
        AND m.status = 'revoked'
      LIMIT 1
    `,
  ).length > 0;
