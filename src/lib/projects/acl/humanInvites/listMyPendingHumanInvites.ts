import { loadUserEmailVerified } from "@/lib/projects/acl/humanInvites/loadUserEmailVerified";
import { parseHumanInviteEmail } from "@/lib/projects/acl/humanInvites/clampHumanInviteParams";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { asRowArray, getSql } from "@/lib/db";

export type MyPendingHumanInvite = {
  readonly id: string;
  readonly projectName: string;
  readonly inviterName: string;
  readonly role: "member" | "viewer";
  readonly expiresAt: string;
};

/** Open invites addressed to the signed-in, email-verified user (by email). */
export const listMyPendingHumanInvites = async (input: {
  readonly userId: string;
  readonly email: string;
}): Promise<readonly MyPendingHumanInvite[]> => {
  const email = parseHumanInviteEmail(input.email);
  if (email === null || !(await loadUserEmailVerified(input.userId))) return [];
  await ensureProjectAclSchema();
  const rows = asRowArray(
    await getSql()`
      SELECT i.id, i.role, i.expires_at,
             p.name AS project_name,
             COALESCE(NULLIF(u.name, ''), u.email, 'Someone') AS inviter_name
      FROM project_human_invites i
      JOIN user_projects p ON p.id = i.project_id
      LEFT JOIN users u ON u.id = i.created_by_user_id
      WHERE lower(trim(i.email)) = ${email}
        AND i.status = 'pending'
        AND i.uses_remaining = i.max_uses
        AND i.revoked_at IS NULL
        AND i.expires_at > NOW()
        AND i.uses_remaining > 0
      ORDER BY i.created_at DESC
      LIMIT 20
    `,
  );
  return rows.map((row) => ({
    id: String(row.id),
    projectName: String(row.project_name),
    inviterName: String(row.inviter_name),
    role: row.role === "viewer" ? "viewer" : "member",
    expiresAt: new Date(String(row.expires_at)).toISOString(),
  }));
};
