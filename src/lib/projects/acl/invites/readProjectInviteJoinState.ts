import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { hashProjectInviteToken } from "@/lib/projects/acl/invites/hashProjectInviteToken";
import { asRowArray, getSql } from "@/lib/db";

export type ProjectInviteJoinState =
  | { readonly kind: "unknown" }
  | { readonly kind: "gone" }
  | {
      readonly kind: "usable";
      readonly projectId: string;
      readonly projectName: string | null;
      /** Per-invite auto-approve when the column exists (S0); null when unknown. */
      readonly autoApprove: boolean | null;
    };

/**
 * Read-only lookup for the public /join page. One SELECT by token hash; never
 * claims, redeems, or updates the invite (safe for link unfurlers). Usable uses
 * the same rules as claimProjectInviteToken: not revoked, not expired, uses left.
 */
export const readProjectInviteJoinState = async (
  token: string,
): Promise<ProjectInviteJoinState> => {
  const trimmed = token.trim();
  if (trimmed.length < 16) {
    return { kind: "unknown" };
  }
  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT
        i.*,
        p.name AS join_project_name,
        (i.revoked_at IS NULL AND i.expires_at > NOW() AND i.uses_remaining > 0) AS join_usable
      FROM project_invites i
      LEFT JOIN user_projects p ON p.id = i.project_id
      WHERE i.token_hash = ${hashProjectInviteToken(trimmed)}
      LIMIT 1
    `,
  );
  const row = rows[0];
  if (!row) {
    return { kind: "unknown" };
  }
  if (row.join_usable !== true) {
    return { kind: "gone" };
  }
  const name =
    typeof row.join_project_name === "string"
      ? row.join_project_name.trim()
      : "";
  return {
    kind: "usable",
    projectId: String(row.project_id),
    projectName: name.length > 0 ? name : null,
    autoApprove:
      typeof row.auto_approve === "boolean" ? row.auto_approve : null,
  };
};
