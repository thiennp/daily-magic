import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { isAgentUserId } from "@/lib/projects/acl/isAgentUser";
import { assertSafeProjectWebhookUrl } from "@/lib/projects/acl/webhooks/assertSafeProjectWebhookUrl";

const MAX_BEARER_LENGTH = 2000;

export type WritePendingRequestGrokWebhookResult =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly code:
        | "not_found"
        | "not_pending"
        | "invalid_url"
        | "https_only"
        | "blocked_host"
        | "invalid_bearer";
    };

/**
 * Owner pre-registers the wake link of a still-pending assistant request.
 * Grants no access and is never read by wake dispatch (it reads memberships
 * only); Approve carries it over. The caller has already proved ownership.
 */
export const writePendingRequestGrokWebhook = async (input: {
  readonly projectId: string;
  readonly requestId: string;
  readonly grokWebhookUrl: unknown;
  readonly grokWebhookBearer: unknown;
}): Promise<WritePendingRequestGrokWebhookResult> => {
  const bearer =
    typeof input.grokWebhookBearer === "string"
      ? input.grokWebhookBearer.trim()
      : "";
  if (bearer.length === 0 || bearer.length > MAX_BEARER_LENGTH) {
    return { ok: false, code: "invalid_bearer" };
  }
  const safe = await assertSafeProjectWebhookUrl(input.grokWebhookUrl);
  if (!safe.ok) return { ok: false, code: safe.code };
  await ensureProjectAclSchema();
  const sql = getSql();
  const found = asRowArray(
    await sql`
      SELECT requester_user_id FROM project_access_requests
      WHERE id = ${input.requestId} AND project_id = ${input.projectId}
        AND status = 'pending' AND expires_at > NOW()
      LIMIT 1
    `,
  );
  if (found.length === 0) return { ok: false, code: "not_pending" };
  if (!(await isAgentUserId(String(found[0].requester_user_id)))) {
    return { ok: false, code: "not_found" };
  }
  await sql`
    INSERT INTO project_access_request_grok_webhooks (
      request_id, project_id, webhook_url, bearer_retained
    )
    VALUES (${input.requestId}, ${input.projectId}, ${safe.url.toString()}, ${bearer})
    ON CONFLICT (request_id) DO UPDATE SET
      webhook_url = EXCLUDED.webhook_url,
      bearer_retained = EXCLUDED.bearer_retained,
      updated_at = NOW()
  `;
  return { ok: true };
};
