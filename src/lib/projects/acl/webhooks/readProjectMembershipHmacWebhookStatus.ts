import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import {
  projectGrokWebhookTargetId,
  type ProjectGrokWebhookTarget,
} from "@/lib/projects/acl/webhooks/projectGrokWebhookTarget";

export type ProjectMembershipHmacWebhookStatus = {
  readonly hmacWebhookUrl: string | null;
  readonly secretSet: boolean;
};

/**
 * HMAC webhook status for one in-scope active membership.
 * null = no such membership. Selects URL + secret_set flag only — never secret_retained.
 */
export const readProjectMembershipHmacWebhookStatus = async (
  target: ProjectGrokWebhookTarget,
): Promise<ProjectMembershipHmacWebhookStatus | null> => {
  const targetId = projectGrokWebhookTargetId(target);
  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT
        w.webhook_url,
        (
          w.secret_retained IS NOT NULL
          AND length(w.secret_retained) > 0
        ) AS secret_set
      FROM project_memberships m
      LEFT JOIN project_membership_webhooks w
        ON w.membership_id = m.id
        AND w.enabled = TRUE
      WHERE m.project_id = ${target.projectId}::text
        AND m.status = 'active'
        AND (
          (${target.by}::text = 'member_row' AND m.id = ${targetId}::text AND m.role = 'member')
          OR (${target.by}::text = 'own_membership' AND m.user_id = ${targetId}::text)
        )
      LIMIT 1
    `,
  );
  const row = rows[0];
  if (row === undefined) {
    return null;
  }
  const url =
    typeof row.webhook_url === "string" && row.webhook_url.length > 0
      ? row.webhook_url
      : null;
  return {
    hmacWebhookUrl: url,
    secretSet: row.secret_set === true || row.secret_set === "t",
  };
};
