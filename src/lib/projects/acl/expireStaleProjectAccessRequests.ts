import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getSql } from "@/lib/db";

/** Marks pending requests past expires_at so new requests are not blocked. */
export const expireStaleProjectAccessRequestsForRequester = async (input: {
  readonly projectId: string;
  readonly requesterUserId: string;
}): Promise<void> => {
  await ensureProjectAclSchema();
  const sql = getSql();
  await sql`
    UPDATE project_access_requests
    SET status = 'expired',
        decided_at = COALESCE(decided_at, NOW())
    WHERE project_id = ${input.projectId}
      AND requester_user_id = ${input.requesterUserId}
      AND status = 'pending'
      AND expires_at <= NOW()
  `;
};
