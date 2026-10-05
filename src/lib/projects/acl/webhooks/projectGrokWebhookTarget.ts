/**
 * Which membership row a Grok webhook read/write may touch. Always scoped to
 * projectId + status 'active' inside the SQL itself.
 * - member_row: owner path, one role='member' row by id (caller already proved project ownership).
 * - own_membership: bot path, the caller's own active row.
 * - owned_bot_row: human bot-owner path; membership whose agent_access_tokens.owner_user_id is the caller.
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
    }
  | {
      readonly projectId: string;
      readonly by: "owned_bot_row";
      readonly membershipId: string;
      readonly ownerUserId: string;
    };

/** The id the SQL condition matches on (m.id for member_row/owned_bot_row, m.user_id for own_membership). */
export const projectGrokWebhookTargetId = (
  target: ProjectGrokWebhookTarget,
): string =>
  target.by === "own_membership" ? target.userId : target.membershipId;

/** ownerUserId only for owned_bot_row; empty string otherwise (SQL OR short-circuits). */
export const projectGrokWebhookOwnerUserId = (
  target: ProjectGrokWebhookTarget,
): string => (target.by === "owned_bot_row" ? target.ownerUserId : "");
