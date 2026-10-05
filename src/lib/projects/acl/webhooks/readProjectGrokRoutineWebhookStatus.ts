import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { toWebhookUrlHost } from "@/lib/projects/acl/webhooks/toWebhookUrlHost";

export type ProjectGrokRoutineWebhookStatus = {
  readonly grokWebhookRegistered: boolean;
  readonly grokWebhookUrl: string | null;
  readonly grokWebhookUrlHost: string | null;
  readonly lastGrokWakeResult: string | null;
};

/** Read shape: URL, host, last wake result. Never selects bearer_retained. */
export const readProjectGrokRoutineWebhookStatus = async (input: {
  readonly membershipId: string;
}): Promise<ProjectGrokRoutineWebhookStatus> => {
  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT
        w.webhook_url,
        (
          SELECT a.result
          FROM project_grok_routine_wake_attempts a
          WHERE a.membership_id = ${input.membershipId}
          ORDER BY a.created_at DESC
          LIMIT 1
        ) AS last_wake_result
      FROM (SELECT 1) AS one
      LEFT JOIN project_membership_grok_routine_webhooks w
        ON w.membership_id = ${input.membershipId}
    `,
  );
  const row = rows[0] ?? {};
  const url =
    typeof row.webhook_url === "string" && row.webhook_url.length > 0
      ? row.webhook_url
      : null;
  const last =
    typeof row.last_wake_result === "string" ? row.last_wake_result : null;
  return {
    grokWebhookRegistered: url !== null,
    grokWebhookUrl: url,
    grokWebhookUrlHost: url === null ? null : toWebhookUrlHost(url),
    lastGrokWakeResult: last,
  };
};
