import { toPostgresTimestamptz } from "@/lib/projects/acl/messaging/toPostgresTimestamptz";
import { getSql } from "@/lib/db";

export type ProjectMessageDeletedReason = "ack" | "delete_on_read";

export type WriteProjectMessageOutcomeInput = {
  readonly messageId: string;
  readonly projectId: string;
  readonly recipientUserId: string | null;
  readonly recipientMembershipId: string | null;
  readonly finalB2bState: string | null;
  readonly grokWakeResult: string | null;
  readonly deletedReason: ProjectMessageDeletedReason;
  readonly messageCreatedAt: string | Date | null;
  readonly readAt: string | Date | null;
};

/**
 * Thin outcome retained after the message row is gone. No FK to project_messages.
 * Caller runs ensureProjectAclSchema first (creates project_message_outcomes).
 */
export const writeProjectMessageOutcome = async (
  input: WriteProjectMessageOutcomeInput,
): Promise<void> => {
  const sql = getSql();
  const createdAt = toPostgresTimestamptz(input.messageCreatedAt);
  const readAt = toPostgresTimestamptz(input.readAt);
  await sql`
    INSERT INTO project_message_outcomes (
      message_id, project_id, recipient_user_id, recipient_membership_id,
      final_b2b_state, grok_wake_result, deleted_reason,
      message_created_at, read_at
    ) VALUES (
      ${input.messageId},
      ${input.projectId},
      ${input.recipientUserId},
      ${input.recipientMembershipId},
      ${input.finalB2bState},
      ${input.grokWakeResult},
      ${input.deletedReason},
      ${createdAt}::timestamptz,
      ${readAt}::timestamptz
    )
    ON CONFLICT (message_id) DO UPDATE SET
      final_b2b_state = EXCLUDED.final_b2b_state,
      grok_wake_result = COALESCE(
        EXCLUDED.grok_wake_result,
        project_message_outcomes.grok_wake_result
      ),
      deleted_reason = EXCLUDED.deleted_reason,
      read_at = COALESCE(EXCLUDED.read_at, project_message_outcomes.read_at),
      deleted_at = NOW()
  `;
};
