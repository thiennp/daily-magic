import { asRowArray, getSql } from "@/lib/db";
import { flipProjectMembershipToWebhookOnWakeLink } from "@/lib/projects/acl/setProjectMembershipDeliveryMode";

/**
 * On Approve: move the wake link pre-registered on the join request onto the
 * new membership, then drop the pending copy. True when one was carried over.
 */
export const carryOverPendingRequestGrokWebhook = async (input: {
  readonly projectId: string;
  readonly requestId: string;
  readonly membershipId: string;
  readonly userId: string;
}): Promise<boolean> => {
  const sql = getSql();
  const moved = asRowArray(
    await sql`
      INSERT INTO project_membership_grok_routine_webhooks (
        membership_id, project_id, user_id, webhook_url, bearer_retained
      )
      SELECT ${input.membershipId}::text, p.project_id, ${input.userId}::text,
             p.webhook_url, p.bearer_retained
      FROM project_access_request_grok_webhooks p
      WHERE p.request_id = ${input.requestId}::text
        AND p.project_id = ${input.projectId}::text
      ON CONFLICT (membership_id) DO NOTHING
      RETURNING membership_id
    `,
  );
  await sql`
    DELETE FROM project_access_request_grok_webhooks
    WHERE request_id = ${input.requestId}::text
  `;
  if (moved.length === 0) return false;
  await flipProjectMembershipToWebhookOnWakeLink({
    projectId: input.projectId,
    membershipId: input.membershipId,
  });
  return true;
};
