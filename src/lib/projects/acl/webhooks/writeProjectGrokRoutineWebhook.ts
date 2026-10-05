import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { assertSafeProjectWebhookUrl } from "@/lib/projects/acl/webhooks/assertSafeProjectWebhookUrl";
import { explainProjectGrokWebhookWriteMiss } from "@/lib/projects/acl/webhooks/explainProjectGrokWebhookWriteMiss";
import {
  projectGrokWebhookOwnerUserId,
  projectGrokWebhookTargetId,
  type ProjectGrokWebhookTarget,
} from "@/lib/projects/acl/webhooks/projectGrokWebhookTarget";
import { toPublicGrokRoutineWebhook } from "@/lib/projects/acl/webhooks/projectGrokRoutineWebhookPublic";

const MAX_GROK_WEBHOOK_BEARER_LENGTH = 2000;

export type WriteProjectGrokRoutineWebhookResult =
  | { readonly ok: true; readonly grokWebhookUrl: string }
  | {
      readonly ok: false;
      readonly code:
        | "not_found"
        | "naming_required"
        | "invalid_url"
        | "https_only"
        | "blocked_host"
        | "invalid_bearer";
    };

/**
 * Shared save step (owner form + register_project_webhook + owned-bot form).
 * ONE guarded INSERT … SELECT. Bearer stored, never returned.
 */
export const writeProjectGrokRoutineWebhook = async (input: {
  readonly target: ProjectGrokWebhookTarget;
  readonly grokWebhookUrl: unknown;
  readonly grokWebhookBearer: unknown;
}): Promise<WriteProjectGrokRoutineWebhookResult> => {
  const bearer =
    typeof input.grokWebhookBearer === "string"
      ? input.grokWebhookBearer.trim()
      : "";
  if (bearer.length === 0 || bearer.length > MAX_GROK_WEBHOOK_BEARER_LENGTH) {
    return { ok: false, code: "invalid_bearer" };
  }
  const safe = await assertSafeProjectWebhookUrl(input.grokWebhookUrl);
  if (!safe.ok) {
    return { ok: false, code: safe.code };
  }
  const { target } = input;
  const targetId = projectGrokWebhookTargetId(target);
  const ownerUserId = projectGrokWebhookOwnerUserId(target);
  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      INSERT INTO project_membership_grok_routine_webhooks (
        project_id, membership_id, user_id, webhook_url, bearer_retained
      )
      SELECT m.project_id, m.id, m.user_id, ${safe.url.toString()}::text, ${bearer}::text
      FROM project_memberships m
      WHERE m.project_id = ${target.projectId}::text
        AND m.status = 'active'
        AND m.project_display_name IS NOT NULL
        AND btrim(m.project_display_name) <> ''
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
      ON CONFLICT (membership_id) DO UPDATE SET
        webhook_url = EXCLUDED.webhook_url,
        bearer_retained = EXCLUDED.bearer_retained,
        project_id = EXCLUDED.project_id,
        user_id = EXCLUDED.user_id,
        updated_at = NOW()
      RETURNING webhook_url
    `,
  );
  const row = rows[0];
  const pub = row === undefined ? null : toPublicGrokRoutineWebhook(row);
  if (pub === null) {
    return {
      ok: false,
      code: await explainProjectGrokWebhookWriteMiss(target),
    };
  }
  return { ok: true, grokWebhookUrl: pub.grokWebhookUrl };
};
