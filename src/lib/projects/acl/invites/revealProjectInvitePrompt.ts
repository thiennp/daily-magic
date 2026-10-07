import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { buildProjectInviteUrl } from "@/lib/projects/acl/invites/buildProjectInviteUrl";
import { clearUnusableProjectInviteCiphertexts } from "@/lib/projects/acl/invites/clearUnusableProjectInviteCiphertexts";
import {
  decryptProjectInviteToken,
  resolveProjectInviteTokenSecret,
} from "@/lib/projects/acl/invites/projectInviteTokenCipher";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type RevealProjectInvitePromptResult =
  | { readonly ok: true; readonly url: string }
  | {
      readonly ok: false;
      readonly code:
        | "not_found"
        | "forbidden"
        /** Used, revoked, or expired. */
        | "invite_not_usable"
        /** No stored copy (pre-107 invite) or it cannot be decrypted. */
        | "invite_prompt_unavailable";
    };

const nonEmpty = (value: unknown): value is string =>
  typeof value === "string" && value.length > 0;

/**
 * Owner-only: rebuild the invite URL for a still-usable (never redeemed,
 * unexpired, unrevoked) assistant invite from its encrypted token (107).
 * Never logs the token. Unusable invites also lose their stored copy.
 */
export const revealProjectInvitePrompt = async (input: {
  readonly projectId: string;
  readonly inviteId: string;
  readonly ownerUserId: string;
}): Promise<RevealProjectInvitePromptResult> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }
  if (project.ownerUserId !== input.ownerUserId) {
    return { ok: false, code: "forbidden" };
  }
  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT
        token_ciphertext,
        token_iv,
        (
          revoked_at IS NULL
          AND expires_at > NOW()
          AND uses_remaining > 0
          AND uses_remaining = max_uses
        ) AS usable
      FROM project_invites
      WHERE id = ${input.inviteId}
        AND project_id = ${input.projectId}
      LIMIT 1
    `,
  );
  if (rows.length === 0) {
    return { ok: false, code: "not_found" };
  }
  const row = rows[0];
  if (row.usable !== true) {
    await clearUnusableProjectInviteCiphertexts(input.projectId);
    return { ok: false, code: "invite_not_usable" };
  }
  const secret = resolveProjectInviteTokenSecret();
  if (
    !nonEmpty(row.token_ciphertext) ||
    !nonEmpty(row.token_iv) ||
    secret === null
  ) {
    return { ok: false, code: "invite_prompt_unavailable" };
  }
  try {
    const token = decryptProjectInviteToken(
      { ciphertext: row.token_ciphertext, iv: row.token_iv },
      secret,
    );
    return { ok: true, url: buildProjectInviteUrl(token) };
  } catch {
    // Wrong/rotated AUTH_SECRET or tampered row: no detail, no logging.
    return { ok: false, code: "invite_prompt_unavailable" };
  }
};
