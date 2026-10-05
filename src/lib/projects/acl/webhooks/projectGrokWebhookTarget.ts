/**
 * Which membership row a Grok webhook read/write may touch. Always scoped to
 * projectId + status 'active' inside the SQL itself.
 * - member_row: owner path, one role='member' row by id (caller already proved project ownership).
 * - own_membership: bot path, the caller's own active row.
 */
export type ProjectGrokWebhookTarget =
  | {
      readonly projectId: string;
      readonly by: "member_row";
      readonly membershipId: string;
    }
  | {
      readonly projectId: string;
      readonly by: "own_membership";
      readonly userId: string;
    };

/** The id the SQL condition matches on (m.id for member_row, m.user_id for own_membership). */
export const projectGrokWebhookTargetId = (
  target: ProjectGrokWebhookTarget,
): string => (target.by === "member_row" ? target.membershipId : target.userId);
