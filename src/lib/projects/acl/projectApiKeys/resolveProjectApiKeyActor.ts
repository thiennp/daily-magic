import { GlobalRole } from "@/lib/auth/roles";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import type { ProjectAclScope } from "@/lib/projects/acl/projectAclScopes.constant";
import { hashProjectApiKey } from "@/lib/projects/acl/projectApiKeys/hashProjectApiKey";
import { isProjectAclScopeArray } from "@/lib/projects/acl/projectApiKeys/resolveProjectApiKeyActor.helpers";

export type ProjectApiKeyAuth = {
  readonly actor: AgentAccessActor;
  readonly keyId: string;
  readonly projectId: string;
  readonly membershipId: string;
  readonly scopes: readonly ProjectAclScope[];
};

export const resolveProjectApiKeyActor = async (
  token: string,
): Promise<ProjectApiKeyAuth | null> => {
  await ensureProjectAclSchema();
  const sql = getSql();
  const tokenHash = hashProjectApiKey(token);
  const rows = asRowArray(
    await sql`
      SELECT k.id AS key_id, k.project_id, k.membership_id, k.scopes,
             u.id AS user_id, u.email, u.name, m.status AS membership_status
      FROM project_api_keys k
      JOIN users u ON u.id = k.user_id
      JOIN project_memberships m ON m.id = k.membership_id
      WHERE k.token_hash = ${tokenHash}
        AND k.revoked_at IS NULL
      LIMIT 1
    `,
  );
  const row = rows[0];
  if (
    row === undefined ||
    typeof row.key_id !== "string" ||
    typeof row.project_id !== "string" ||
    typeof row.membership_id !== "string" ||
    typeof row.user_id !== "string" ||
    typeof row.email !== "string" ||
    row.membership_status !== "active"
  ) {
    return null;
  }
  const scopes = isProjectAclScopeArray(row.scopes) ? row.scopes : [];
  await sql`
    UPDATE project_api_keys
    SET last_used_at = NOW()
    WHERE id = ${row.key_id}
  `;
  return {
    keyId: row.key_id,
    projectId: row.project_id,
    membershipId: row.membership_id,
    scopes,
    actor: {
      id: row.user_id,
      email: row.email,
      name: typeof row.name === "string" ? row.name : null,
      globalRole: GlobalRole.USER,
      registrationMethod: "none",
    },
  };
};
