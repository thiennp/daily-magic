import { randomUUID } from "node:crypto";

import { asRowArray, getSql } from "@/lib/db";
import { HUMAN_INVITE_DEFAULT_EXPIRES_DAYS } from "@/lib/projects/acl/humanInvites/humanInvite.constants";
import { HUMAN_INVITE_OPEN_EMAIL_UNIQUE_IDX } from "@/lib/projects/acl/humanInvites/humanInviteEmail.constant";

const isOpenEmailDuplicate = (error: unknown): boolean => {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes(HUMAN_INVITE_OPEN_EMAIL_UNIQUE_IDX);
};

/** Insert a pending email invite (token HASH only); "duplicate" on open-email dedupe. */
export const insertHumanEmailInviteRow = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly tokenHash: string;
  readonly email: string;
  readonly role: string;
  readonly requireEmailMatch: boolean;
  readonly requiresApproval: boolean;
}): Promise<Record<string, unknown> | "duplicate" | null> => {
  const sql = getSql();
  const expiresAt = new Date(
    Date.now() + HUMAN_INVITE_DEFAULT_EXPIRES_DAYS * 24 * 60 * 60 * 1000,
  ).toISOString();
  try {
    const rows = asRowArray(
      await sql`
        INSERT INTO project_human_invites (
          id, project_id, created_by_user_id, token_hash, email,
          require_email_match, role, max_uses, uses_remaining, expires_at,
          status, delivery, requires_approval
        )
        VALUES (
          ${randomUUID()}, ${input.projectId}, ${input.ownerUserId},
          ${input.tokenHash}, ${input.email}, ${input.requireEmailMatch},
          ${input.role}, 1, 1, ${expiresAt}::timestamptz,
          'pending', 'email', ${input.requiresApproval}
        )
        RETURNING *
      `,
    );
    return rows[0] ?? null;
  } catch (error) {
    if (isOpenEmailDuplicate(error)) return "duplicate";
    throw error;
  }
};
