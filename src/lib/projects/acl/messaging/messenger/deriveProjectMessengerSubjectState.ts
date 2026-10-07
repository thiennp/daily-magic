import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { ProjectMessageWindowKind } from "@/lib/projects/acl/messaging/messenger/projectMessageWindowKind.constant";
import type {
  ProjectMessengerMessageState,
  ProjectMessengerStateChip,
  ProjectMessengerTimelineEntry,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import type { ProjectMessengerSubjectState } from "@/lib/projects/acl/messaging/messenger/projectMessengerWindowFields.type";
import {
  PROJECT_MESSAGE_KIND_TASK_BLOCKED,
  PROJECT_MESSAGE_KIND_TASK_DONE,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

/** Lower = reported first when recipients disagree (attention before progress). */
const STATE_RANK: Record<ProjectMessengerMessageState, number> = {
  blocked: 0,
  no_answer: 1,
  waiting: 2,
  checks_on_demand: 3,
  working: 4,
  got_it: 5,
  received: 6,
  done: 7,
};

const NEEDS_YOU_STATES: ReadonlySet<string> = new Set(["blocked", "no_answer"]);

const fromDeliveries = (
  states: readonly ProjectMessengerStateChip[],
): ProjectMessengerSubjectState | null => {
  if (states.length === 0) return null;
  const lead = [...states].sort(
    (a, b) => STATE_RANK[a.state] - STATE_RANK[b.state],
  )[0];
  return {
    source: "deliveries",
    status: lead.state,
    done: states.filter((chip) => chip.state === "done").length,
    of: states.length,
    needsYou: NEEDS_YOU_STATES.has(lead.state),
    awaitingApproval: false,
  };
};

const fromAgentRun = (status: string): ProjectMessengerSubjectState => {
  const awaitingApproval =
    status.trim().toLowerCase() === AgentRunStatus.PENDING_APPROVAL;
  return {
    source: "agent_run",
    status,
    needsYou: awaitingApproval,
    awaitingApproval,
  };
};

const fromReplyKind = (kind: string): ProjectMessengerSubjectState | null => {
  if (
    kind !== PROJECT_MESSAGE_KIND_TASK_DONE &&
    kind !== PROJECT_MESSAGE_KIND_TASK_BLOCKED
  ) {
    return null;
  }
  const blocked = kind === PROJECT_MESSAGE_KIND_TASK_BLOCKED;
  return {
    source: "reply_kind",
    status: blocked ? "blocked" : "done",
    needsYou: blocked,
    awaitingApproval: false,
  };
};

/**
 * Live subject state for `task` / `task_update` rows, read at query time from
 * fields the row already carries. It is never stored (DESIGN L6):
 * - AI session row: agent_runs.status (pending_approval = awaitingApproval)
 * - task row: PD delivery chips, worst state first, done/of = recipients
 * - task_update row: task.done / task.blocked only
 * Codes only (UI owns copy). No bodies.
 */
export const deriveProjectMessengerSubjectState = (
  entry: ProjectMessengerTimelineEntry,
  windowKind: ProjectMessageWindowKind,
): ProjectMessengerSubjectState | null => {
  if (entry.session !== undefined) return fromAgentRun(entry.session.status);
  if (windowKind === "task") return fromDeliveries(entry.states);
  if (windowKind === "task_update") return fromReplyKind(entry.kind);
  return null;
};
