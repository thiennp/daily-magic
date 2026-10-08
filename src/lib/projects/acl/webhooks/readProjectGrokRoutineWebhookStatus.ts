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
  /** ISO time of that same latest non-skipped attempt; null when none. */
  readonly lastGrokWakeAt: string | null;
};

const toIsoOrNull = (value: unknown): string | null => {
  if (!(value instanceof Date) && typeof value !== "string") {
    return null;
  }
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

/**
 * One SELECT scoped like the save step. null = no such membership.
 * lastGrokWakeResult / lastGrokWakeAt ignore skipped_by_policy (status kinds
 * are never woken) and come from the same latest attempt row.
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
        lw.result AS last_wake_result,
        lw.created_at AS last_wake_at
      FROM project_memberships m
      LEFT JOIN project_membership_grok_routine_webhooks w
        ON w.membership_id = m.id
      LEFT JOIN LATERAL (
        SELECT a.result, a.created_at
        FROM project_grok_routine_wake_attempts a
        WHERE a.membership_id = m.id
          AND a.result <> ${GROK_WAKE_RESULT_SKIPPED_BY_POLICY}
          AND (w.updated_at IS NULL OR a.created_at >= w.updated_at)
        ORDER BY a.created_at DESC
        LIMIT 1
      ) lw ON TRUE
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
  const lastGrokWakeResult =
    typeof last === "string" && STORED_GROK_WAKE_RESULT.test(last)
      ? last
      : null;
  return {
    grokWebhookUrl: url,
    lastGrokWakeResult,
    lastGrokWakeAt:
      lastGrokWakeResult === null ? null : toIsoOrNull(row.last_wake_at),
  };
};
