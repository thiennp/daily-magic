import { getSql } from "@/lib/db";

/**
 * Drop the stored invite token copy (107) for this project's invites that can
 * no longer be copied: revoked, expired, or redeemed at least once (same
 * "usable" rule as the owner list). Redeem/claim SQL stays unchanged; this
 * runs on owner create and reveal instead. Never throws.
 */
export const clearUnusableProjectInviteCiphertexts = async (
  projectId: string,
): Promise<void> => {
  try {
    const sql = getSql();
    await sql`
      UPDATE project_invites
      SET token_ciphertext = NULL, token_iv = NULL
      WHERE project_id = ${projectId}
        AND token_ciphertext IS NOT NULL
        AND (
          revoked_at IS NOT NULL
          OR expires_at <= NOW()
          OR uses_remaining <= 0
          OR uses_remaining <> max_uses
        )
    `;
  } catch {
    // Best-effort hygiene; reveal still refuses unusable invites.
  }
};
