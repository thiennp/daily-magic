import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import {
  GROK_WAKE_RESULT_SKIPPED_BY_POLICY,
  STORED_GROK_WAKE_RESULT,
} from "@/lib/projects/acl/messaging/storedGrokWakeResult.constant";
import {
  projectGrokWebhookOwnerUserId,
  projectGrokWebhookTargetId,
  type ProjectGrokWebhookTarget,
} from "@/lib/projects/acl/webhooks/projectGrokWebhookTarget";

export type ProjectGrokRoutineWebhookStatus = {
  readonly grokWebhookUrl: string | null;
  readonly lastGrokWakeResult: string | null;
};

/**
 * One SELECT scoped like the save step. null = no such membership.
 * lastGrokWakeResult ignores skipped_by_policy (status kinds are never woken).
 * Never selects bearer_retained.
 */
export const readProjectGrokRoutineWebhookStatus = async (
  target: ProjectGrokWebhookTarget,
): Promise<ProjectGrokRoutineWebhookStatus | null> => {
  const targetId = projectGrokWebhookTargetId(target);
  const ownerUserId = projectGrokWebhookOwnerUserId(target);
  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT
        w.webhook_url,
        (
          SELECT a.result
          FROM project_grok_routine_wake_attempts a
          WHERE a.membership_id = m.id
            AND a.result <> ${GROK_WAKE_RESULT_SKIPPED_BY_POLICY}
          ORDER BY a.created_at DESC
          LIMIT 1
        ) AS last_wake_result
      FROM project_memberships m
      LEFT JOIN project_membership_grok_routine_webhooks w
        ON w.membership_id = m.id
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
  const row = rows[0];
  if (row === undefined) {
    return null;
  }
  const url =
    typeof row.webhook_url === "string" && row.webhook_url.length > 0
      ? row.webhook_url
      : null;
  const last = row.last_wake_result;
  return {
    grokWebhookUrl: url,
    lastGrokWakeResult:
      typeof last === "string" && STORED_GROK_WAKE_RESULT.test(last)
        ? last
        : null,
  };
};
