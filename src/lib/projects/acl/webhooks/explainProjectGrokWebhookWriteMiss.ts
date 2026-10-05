import { asRowArray, getSql } from "@/lib/db";
import {
  projectGrokWebhookOwnerUserId,
  projectGrokWebhookTargetId,
  type ProjectGrokWebhookTarget,
} from "@/lib/projects/acl/webhooks/projectGrokWebhookTarget";

/**
 * After a guarded write wrote nothing: say why, for the error message only.
 * Read-only; nothing is written after it, so it cannot widen access.
 */
export const explainProjectGrokWebhookWriteMiss = async (
  target: ProjectGrokWebhookTarget,
): Promise<"not_found" | "naming_required"> => {
  const targetId = projectGrokWebhookTargetId(target);
  const ownerUserId = projectGrokWebhookOwnerUserId(target);
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT 1 AS present
      FROM project_memberships m
      WHERE m.project_id = ${target.projectId}::text
        AND m.status = 'active'
        AND (
          (${target.by}::text = 'member_row' AND m.id = ${targetId}::text AND m.role = 'member')
          OR (${target.by}::text = 'own_membership' AND m.user_id = ${targetId}::text)
          OR (
            ${target.by}::text = 'owned_bot_row'
            AND m.id = ${targetId}::text
            AND EXISTS (
              SELECT 1 FROM agent_access_tokens t
              WHERE t.user_id = m.user_id
                AND t.owner_user_id = ${ownerUserId}::text
            )
          )
        )
      LIMIT 1
    `,
  );
  return rows.length > 0 ? "naming_required" : "not_found";
};
