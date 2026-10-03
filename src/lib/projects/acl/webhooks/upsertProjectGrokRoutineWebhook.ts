import { asRowArray, getSql } from "@/lib/db";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { assertSafeProjectWebhookUrl } from "@/lib/projects/acl/webhooks/assertSafeProjectWebhookUrl";
import { toPublicGrokRoutineWebhook } from "@/lib/projects/acl/webhooks/projectGrokRoutineWebhookPublic";

const MAX_GROK_WEBHOOK_BEARER_LENGTH = 2000;

export type UpsertProjectGrokRoutineWebhookResult =
  | { readonly ok: true; readonly grokWebhookUrl: string }
  | {
      readonly ok: false;
      readonly code:
        | "forbidden"
        | "invalid_url"
        | "https_only"
        | "blocked_host"
        | "naming_required"
        | "invalid_bearer";
    };

export const upsertProjectGrokRoutineWebhook = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly grokWebhookUrl: unknown;
  readonly grokWebhookBearer: unknown;
}): Promise<UpsertProjectGrokRoutineWebhookResult> => {
  const bearer =
    typeof input.grokWebhookBearer === "string"
      ? input.grokWebhookBearer.trim()
      : "";
  if (bearer.length === 0 || bearer.length > MAX_GROK_WEBHOOK_BEARER_LENGTH) {
    return { ok: false, code: "invalid_bearer" };
  }
  const membership = await getActiveProjectMembership(
    input.projectId,
    input.actorUserId,
  );
  if (membership === null) {
    return { ok: false, code: "forbidden" };
  }
  if (!membership.projectDisplayName) {
    return { ok: false, code: "naming_required" };
  }
  const safe = await assertSafeProjectWebhookUrl(input.grokWebhookUrl);
  if (!safe.ok) {
    return { ok: false, code: safe.code };
  }
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      INSERT INTO project_membership_grok_routine_webhooks (
        project_id, membership_id, user_id, webhook_url, bearer_retained
      )
      VALUES (
        ${input.projectId},
        ${membership.id},
        ${input.actorUserId},
        ${safe.url.toString()},
        ${bearer}
      )
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
    return { ok: false, code: "forbidden" };
  }
  return { ok: true, grokWebhookUrl: pub.grokWebhookUrl };
};
