import { asRowArray, getSql } from "@/lib/db";

/**
 * Owned-bot wake link gate: `callerUserId` holds a LIVE credential of the bot behind this
 * membership AND is still the project owner or an active human member. A revoked credential or
 * a person who left the project no longer controls where the bot's wakes go.
 */
export const mayControlOwnedBotWakeLink = async (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly callerUserId: string;
}): Promise<boolean> =>
  asRowArray(
    await getSql()`
      SELECT 1
      FROM project_memberships m
      WHERE m.id = ${input.membershipId}::text
        AND m.project_id = ${input.projectId}::text
        AND EXISTS (
          SELECT 1 FROM agent_access_tokens t
          WHERE t.user_id = m.user_id
            AND t.owner_user_id = ${input.callerUserId}::text
            AND t.revoked_at IS NULL
            AND (t.expires_at IS NULL OR t.expires_at > NOW())
        )
        AND (
          EXISTS (
            SELECT 1 FROM user_projects up
            WHERE up.id = m.project_id
              AND up.owner_user_id = ${input.callerUserId}::text
          )
          OR EXISTS (
            SELECT 1 FROM project_memberships h
            WHERE h.project_id = m.project_id
              AND h.user_id = ${input.callerUserId}::text
              AND h.status = 'active' AND h.member_kind = 'human'
              AND h.role = 'member'
          )
        )
      LIMIT 1
    `,
  ).length > 0;
