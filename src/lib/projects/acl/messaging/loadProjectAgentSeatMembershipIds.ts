import { asRowArray, getSql } from "@/lib/db";
import { AGENT_WAKE_JOIN_PLATFORMS } from "@/lib/projects/acl/messaging/agentWakeJoinPlatforms.constant";
import { PROJECT_MEMBERSHIP_DELIVERY_MODE_POLL } from "@/lib/projects/acl/membershipDeliveryMode.constant";

/**
 * Which of these seats are local CLI agents: active, delivery_mode=poll, and
 * the approved join request for the same user carried a CLI join platform.
 * Derived only (no new column). Throws on read errors; callers are best effort.
 */
export const loadProjectAgentSeatMembershipIds = async (input: {
  readonly projectId: string;
  readonly membershipIds: readonly string[];
}): Promise<readonly string[]> => {
  if (input.membershipIds.length === 0) {
    return [];
  }
  const rows = asRowArray(
    await getSql()`
      SELECT m.id
      FROM project_memberships m
      WHERE m.project_id = ${input.projectId}::text
        AND m.id = ANY(${[...input.membershipIds]}::text[])
        AND m.status = 'active'
        AND m.delivery_mode = ${PROJECT_MEMBERSHIP_DELIVERY_MODE_POLL}
        AND EXISTS (
          SELECT 1 FROM project_access_requests r
          WHERE r.project_id = m.project_id
            AND r.requester_user_id = m.user_id
            AND r.status = 'approved'
            AND r.join_platform = ANY(${[...AGENT_WAKE_JOIN_PLATFORMS]}::text[])
        )
    `,
  );
  return rows.map((row) => String(row.id));
};
