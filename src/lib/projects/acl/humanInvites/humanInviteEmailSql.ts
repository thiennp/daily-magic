import { HUMAN_INVITE_EMAIL_RATE_LIMIT_WINDOW_MINUTES } from "@/lib/projects/acl/humanInvites/humanInviteEmail.constant";
import { asRowArray, getSql } from "@/lib/db";

/** Lazy expire: pending email invites past expires_at stop blocking a re-invite. */
export const expireStaleHumanEmailInvites = async (input: {
  readonly projectId: string;
  readonly email: string;
}): Promise<void> => {
  const sql = getSql();
  await sql`
    UPDATE project_human_invites
    SET status = 'expired', updated_at = NOW()
    WHERE project_id = ${input.projectId}
      AND email = ${input.email}
      AND delivery = 'email'
      AND status = 'pending'
      AND expires_at <= NOW()
  `;
};

/** Email invites created for this project inside the rate-limit window. */
export const countRecentHumanEmailInvites = async (
  projectId: string,
): Promise<number> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT COUNT(*)::int AS n
      FROM project_human_invites
      WHERE project_id = ${projectId}
        AND delivery = 'email'
        AND created_at > NOW() - make_interval(mins => ${HUMAN_INVITE_EMAIL_RATE_LIMIT_WINDOW_MINUTES})
    `,
  );
  return rows.length === 0 ? 0 : Number(rows[0].n ?? 0);
};

/** Send failed after insert: retire the row so the owner can retry cleanly. */
export const retireUnsentHumanEmailInvite = async (
  inviteId: string,
): Promise<void> => {
  const sql = getSql();
  await sql`
    UPDATE project_human_invites
    SET status = 'revoked', revoked_at = NOW(), updated_at = NOW()
    WHERE id = ${inviteId} AND email_sent_at IS NULL
  `;
};

/** Send succeeded: stamp email_sent_at (metadata only, no body). */
export const markHumanEmailInviteSent = async (
  inviteId: string,
): Promise<Record<string, unknown> | null> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE project_human_invites
      SET email_sent_at = NOW(), updated_at = NOW()
      WHERE id = ${inviteId}
      RETURNING *
    `,
  );
  return rows[0] ?? null;
};
