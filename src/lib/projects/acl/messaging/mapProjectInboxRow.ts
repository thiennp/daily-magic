import { STORED_GROK_WAKE_RESULT } from "@/lib/projects/acl/messaging/storedGrokWakeResult.constant";
import { projectMessageSenderDisplayName } from "@/lib/projects/acl/messaging/projectMessageSenderDisplayName";

export type ProjectInboxMessage = {
  readonly messageId: string;
  readonly kind: string;
  readonly summary: string;
  readonly refs: Readonly<Record<string, unknown>>;
  readonly fromProjectDisplayName: string | null;
  readonly fromMembershipId: string | null;
  readonly createdAt: string;
  readonly ackedAt: string | null;
  /** Caller's membership only. Null when no attempt. Never a URL or bearer. */
  readonly grokWakeResult: string | null;
};

export const mapProjectInboxRow = (
  row: Record<string, unknown>,
): ProjectInboxMessage => {
  const wakeResult = row.grok_wake_result;
  return {
    messageId: String(row.id),
    kind: String(row.kind),
    summary: String(row.summary),
    refs:
      row.refs !== null && typeof row.refs === "object"
        ? (row.refs as Record<string, unknown>)
        : {},
    fromProjectDisplayName: projectMessageSenderDisplayName(row),
    fromMembershipId: row.sender_membership_id
      ? String(row.sender_membership_id)
      : null,
    createdAt: String(row.created_at),
    ackedAt: row.acked_at ? String(row.acked_at) : null,
    grokWakeResult:
      typeof wakeResult === "string" && STORED_GROK_WAKE_RESULT.test(wakeResult)
        ? wakeResult
        : null,
  };
};
