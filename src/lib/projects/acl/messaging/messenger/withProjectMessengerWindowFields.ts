import { projectMessengerApprovalOf } from "@/lib/projects/acl/messaging/messenger/projectMessengerApprovalOf";
import { classifyProjectMessageWindowKind } from "@/lib/projects/acl/messaging/messenger/classifyProjectMessageWindowKind";
import { deriveProjectMessengerSubjectState } from "@/lib/projects/acl/messaging/messenger/deriveProjectMessengerSubjectState";
import type {
  ProjectMessengerTimelineEntryInput,
  ProjectMessengerWindowTimelineEntry,
} from "@/lib/projects/acl/messaging/messenger/projectMessengerWindowFields.type";

/**
 * OW9: add server `windowKind` + live `subjectState` to one timeline row
 * (Neon message, Neon AI session, or a local AWL page row).
 * A row that already carries windowKind keeps it.
 * A DF-023 `peer` row (owner view) is bot↔bot by construction → bot_to_bot.
 * Approval rows (run waiting / denied / expired, reserved approval.* kinds)
 * → approval_request / approval_result + `approvalId` (agent_runs.id).
 * Other rows classify with recipientKind "none" (human↔bot or notice).
 */
export const withProjectMessengerWindowFields = (
  entry: ProjectMessengerTimelineEntryInput,
): ProjectMessengerWindowTimelineEntry => {
  const approval =
    entry.windowKind === undefined && entry.peer === undefined
      ? projectMessengerApprovalOf(entry)
      : null;
  const windowKind =
    entry.windowKind ??
    (entry.peer !== undefined ? "bot_to_bot" : undefined) ??
    approval?.windowKind ??
    classifyProjectMessageWindowKind({
      kind: entry.kind,
      senderKind: entry.author.kind,
      recipientKind: "none",
    });
  return {
    ...entry,
    windowKind,
    subjectState: deriveProjectMessengerSubjectState(entry, windowKind),
    ...(approval !== null ? { approvalId: approval.approvalId } : {}),
  };
};
