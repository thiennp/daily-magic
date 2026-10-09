import {
  HUMAN_INVITE_LIST_NEVER_REDEEMED_FRAGMENT,
  HUMAN_INVITE_USABLE_WHERE_SQL,
} from "@/lib/projects/acl/humanInvites/humanInviteUsableSql.constant";
import { asRowArray, getSql } from "@/lib/db";

/**
 * Owner list SELECT: unused (never accepted), unexpired, unrevoked.
 * Claim/accept path does not apply the never-redeemed fragment.
 */
export const selectUsableHumanInviteRows = async (
  projectId: string,
  /** A member sees only the invites they created; the owner passes null. */
  createdByUserId: string | null = null,
): Promise<readonly Record<string, unknown>[]> => {
  const sql = getSql();
  return asRowArray(
    await sql`
      SELECT *
      FROM project_human_invites
      WHERE project_id = ${projectId}
        AND (${createdByUserId}::text IS NULL
          OR created_by_user_id = ${createdByUserId})
        AND ${sql.unsafe(HUMAN_INVITE_USABLE_WHERE_SQL)}
        AND ${sql.unsafe(HUMAN_INVITE_LIST_NEVER_REDEEMED_FRAGMENT)}
      ORDER BY created_at DESC
      LIMIT 100
    `,
  );
};
