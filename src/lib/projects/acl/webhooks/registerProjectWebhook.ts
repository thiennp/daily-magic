import { randomUUID } from "node:crypto";

import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { assertSafeProjectWebhookUrl } from "@/lib/projects/acl/webhooks/assertSafeProjectWebhookUrl";
import {
  createProjectWebhookSecret,
  hashProjectWebhookSecret,
  PROJECT_WEBHOOK_SECRET_PREFIX,
} from "@/lib/projects/acl/webhooks/projectWebhookSecret";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { asRowArray, getSql } from "@/lib/db";

export type RegisterProjectWebhookResult =
  | {
      readonly ok: true;
      readonly webhookId: string;
      readonly webhookUrl: string;
      readonly secret: string;
    }
  | {
      readonly ok: false;
      readonly code:
        | "forbidden"
        | "invalid_url"
        | "https_only"
        | "blocked_host"
        | "naming_required";
    };

export const registerProjectWebhook = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly webhookUrl: unknown;
}): Promise<RegisterProjectWebhookResult> => {
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
  const safe = await assertSafeProjectWebhookUrl(input.webhookUrl);
  if (!safe.ok) {
    return { ok: false, code: safe.code };
  }
  // A3.2: ignore/reject client-supplied secrets — AWC generates.
  const secret = createProjectWebhookSecret();
  const secretHash = hashProjectWebhookSecret(secret);
  const webhookId = randomUUID();

  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      INSERT INTO project_membership_webhooks (
        id, project_id, membership_id, user_id, webhook_url,
        secret_hash, secret_prefix, secret_retained, enabled, revoke_generation
      )
      VALUES (
        ${webhookId},
        ${input.projectId},
        ${membership.id},
        ${input.actorUserId},
        ${safe.url.toString()},
        ${secretHash},
        ${PROJECT_WEBHOOK_SECRET_PREFIX},
        ${secret},
        TRUE,
        0
      )
      ON CONFLICT (membership_id) DO UPDATE SET
        webhook_url = EXCLUDED.webhook_url,
        secret_hash = EXCLUDED.secret_hash,
        secret_prefix = EXCLUDED.secret_prefix,
        secret_retained = EXCLUDED.secret_retained,
        enabled = TRUE,
        updated_at = NOW(),
        id = EXCLUDED.id
      RETURNING id, webhook_url
    `,
  );
  if (rows.length === 0) {
    return { ok: false, code: "forbidden" };
  }
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    action: "webhook.register",
    targetUserId: input.actorUserId,
    detail: {
      webhookId: String(rows[0].id),
      membershipId: membership.id,
      prefix: PROJECT_WEBHOOK_SECRET_PREFIX,
    },
  });
  return {
    ok: true,
    webhookId: String(rows[0].id),
    webhookUrl: String(rows[0].webhook_url),
    secret,
  };
};
