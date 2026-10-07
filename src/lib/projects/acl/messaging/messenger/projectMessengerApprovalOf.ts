import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import {
  PROJECT_MESSAGE_KIND_APPROVAL_REQUEST,
  PROJECT_MESSAGE_KIND_APPROVAL_RESULT,
} from "@/lib/projects/acl/messaging/messenger/projectMessageWindowKind.constant";
import type { ProjectMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

export type ProjectMessengerApproval = {
  readonly windowKind: "approval_request" | "approval_result";
  /** agent_runs.id: POST …/access/run-approvals/:runId/approve | decline. */
  readonly approvalId: string;
};

const APPROVAL_KINDS: Readonly<
  Record<string, ProjectMessengerApproval["windowKind"] | undefined>
> = {
  [PROJECT_MESSAGE_KIND_APPROVAL_REQUEST]: "approval_request",
  [PROJECT_MESSAGE_KIND_APPROVAL_RESULT]: "approval_result",
};

const RESULT_RUN_STATUSES: ReadonlySet<string> = new Set([
  AgentRunStatus.DENIED,
  AgentRunStatus.EXPIRED,
]);

/**
 * Approval row + record id, read from what the row already carries:
 * - AI session row: run pending_approval → approval_request; denied /
 *   expired (only reachable through an approval) → approval_result. An
 *   approved run is plain `task` again (running / completed).
 * - reserved approval.* message kinds: the run id is the first id in the
 *   summary (reply convention → inReplyTo).
 * null = not an approval row.
 */
export const projectMessengerApprovalOf = (
  entry: ProjectMessengerTimelineEntry,
): ProjectMessengerApproval | null => {
  if (entry.session !== undefined) {
    const status = entry.session.status.trim().toLowerCase();
    if (status === AgentRunStatus.PENDING_APPROVAL) {
      return {
        windowKind: "approval_request",
        approvalId: entry.session.agentRunId,
      };
    }
    return RESULT_RUN_STATUSES.has(status)
      ? { windowKind: "approval_result", approvalId: entry.session.agentRunId }
      : null;
  }
  const windowKind = APPROVAL_KINDS[entry.kind];
  return windowKind !== undefined && entry.inReplyTo !== null
    ? { windowKind, approvalId: entry.inReplyTo }
    : null;
};
