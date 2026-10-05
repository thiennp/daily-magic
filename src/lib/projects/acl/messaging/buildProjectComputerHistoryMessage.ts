import { mapProjectMessageLogRow } from "@/lib/projects/acl/messaging/mapProjectMessageLogRow";
import type { ProjectMessageLogEntry } from "@/lib/projects/acl/messaging/projectMessageLog.types";

/**
 * Thin message the project computer saves locally. Builds the same row shape
 * the backlog query selects and runs it through mapProjectMessageLogRow, so
 * the live push and the backlog GET share one mapper and one sender-name rule
 * (owner and system notices included). Protocol metadata only; never a credential.
 */
export const buildProjectComputerHistoryMessage = (input: {
  readonly messageId: string;
  readonly createdAt: string;
  readonly refs: Readonly<Record<string, string>>;
  readonly kind: string;
  readonly summary: string;
  readonly senderMembershipId: string | null;
  readonly senderProjectDisplayName?: string | null;
  readonly toMembershipId: string | null;
  readonly toUserId: string | null;
  readonly toTeamLabel: string | null;
  readonly toProjectDisplayName: string | null;
}): ProjectMessageLogEntry =>
  mapProjectMessageLogRow({
    id: input.messageId,
    kind: input.kind,
    summary: input.summary,
    refs: input.refs,
    sender_membership_id: input.senderMembershipId,
    sender_display_name: input.senderProjectDisplayName ?? null,
    to_membership_id: input.toMembershipId,
    to_user_id: input.toUserId,
    to_team_label: input.toTeamLabel,
    to_project_display_name: input.toProjectDisplayName,
    created_at: input.createdAt,
    acked_at: null,
  });
