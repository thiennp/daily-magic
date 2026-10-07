import type { ProjectMessageWindowKind } from "@/lib/projects/acl/messaging/messenger/projectMessageWindowKind.constant";
import type { ProjectMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import {
  projectMessengerSubjectStateFromAgentRun,
  projectMessengerSubjectStateFromDeliveries,
} from "@/lib/projects/acl/messaging/messenger/projectMessengerSubjectStateRules";
import { projectMessengerSubjectStateFromReplyKind } from "@/lib/projects/acl/messaging/messenger/projectMessengerSubjectStateFromReplyKind";
import type { ProjectMessengerSubjectState } from "@/lib/projects/acl/messaging/messenger/projectMessengerWindowFields.type";

/**
 * Live subject state for `task` / `task_update` rows, read at query time from
 * fields the row already carries. It is never stored (DESIGN L6):
 * - AI session row: agent_runs.status (pending_approval = awaitingApproval)
 * - task row: PD delivery chips, worst state first, done/of = recipients
 * - task_update row: received → queued, processing → running, status →
 *   running (+ done/of progress read from the summary), done, blocked
 * Codes only (UI owns copy). No bodies. Rules: projectMessengerSubjectStateRules
 * (shared with the One window client).
 */
export const deriveProjectMessengerSubjectState = (
  entry: ProjectMessengerTimelineEntry,
  windowKind: ProjectMessageWindowKind,
): ProjectMessengerSubjectState | null => {
  if (entry.session !== undefined) {
    return projectMessengerSubjectStateFromAgentRun(entry.session.status);
  }
  if (windowKind === "task") {
    return projectMessengerSubjectStateFromDeliveries(entry.states);
  }
  if (windowKind === "task_update") {
    return projectMessengerSubjectStateFromReplyKind(entry.kind, entry.text);
  }
  return null;
};
