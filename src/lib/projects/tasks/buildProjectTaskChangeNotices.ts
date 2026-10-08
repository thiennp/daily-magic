import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";
import { PROJECT_TASK_RECORD_STATUS_LABEL as STATUS } from "@/lib/projects/tasks/projectTaskRecordLabels";
import { PROJECT_MESSAGE_SUMMARY_MAX_CHARS } from "@/lib/projects/acl/messaging/projectMessage.constants";

export type ProjectTaskDependent = {
  readonly title: string;
  readonly status: ProjectTaskRecord["status"];
  readonly ownerMembershipId: string | null;
};

export type ProjectTaskChangeNotice = {
  readonly membershipId: string;
  readonly summary: string;
};

const STOP_STATUSES: readonly ProjectTaskRecord["status"][] = [
  "queued",
  "planned",
  "cancelled",
];

const clip = (text: string): string =>
  text.length <= PROJECT_MESSAGE_SUMMARY_MAX_CHARS
    ? text
    : `${text.slice(0, PROJECT_MESSAGE_SUMMARY_MAX_CHARS - 1)}…`;

const label = (t: ProjectTaskRecord): string =>
  `"${t.title.slice(0, 60)}" [${t.id.slice(0, 8)}]`;

/**
 * Who must hear about a task change, and what they should do. The actor is
 * never told. Old owner: stop when work is pulled back or reassigned. New
 * owner: pick it up (by priority). Current owner: status / priority changed
 * under them. Owners of waiting tasks: this dependency finished or blocked.
 * Title/description-only edits notify nobody.
 */
export const buildProjectTaskChangeNotices = (input: {
  readonly before: ProjectTaskRecord;
  readonly after: ProjectTaskRecord;
  readonly actorLabel: string;
  readonly actorMembershipId: string | null;
  readonly dependents: readonly ProjectTaskDependent[];
}): readonly ProjectTaskChangeNotice[] => {
  const { before: b, after: a, actorLabel: by } = input;
  const statusChanged = b.status !== a.status;
  const ownerChanged = b.ownerMembershipId !== a.ownerMembershipId;
  const priorityChanged = b.priority !== a.priority;
  if (!statusChanged && !ownerChanged && !priorityChanged) return [];

  const notices = new Map<string, string>();
  const tell = (id: string | null, text: string): void => {
    if (id === null || id === input.actorMembershipId || notices.has(id))
      return;
    notices.set(id, clip(text));
  };
  const pulledBack =
    statusChanged &&
    (b.status === "in_progress" || b.status === "blocked") &&
    STOP_STATUSES.includes(a.status);
  const prio = a.priority === null ? "no priority" : a.priority;

  if (ownerChanged) {
    tell(
      b.ownerMembershipId,
      `${label(a)} was given to ${a.ownerDisplayName ?? "someone else"} by ${by}. Stop work on it.`,
    );
    tell(
      a.ownerMembershipId,
      `${label(a)} is assigned to you by ${by} (${prio}, ${STATUS[a.status]}).${
        a.status === "queued" ? " Start it in priority order." : ""
      }`,
    );
  } else if (pulledBack) {
    tell(
      a.ownerMembershipId,
      `${label(a)} moved back to ${STATUS[a.status]} by ${by}. Stop work on it.`,
    );
  } else if (statusChanged) {
    tell(
      a.ownerMembershipId,
      `${label(a)} is now ${STATUS[a.status]} (was ${STATUS[b.status]}), changed by ${by}.`,
    );
  } else {
    tell(
      a.ownerMembershipId,
      `${label(a)} priority is now ${prio}, changed by ${by}.`,
    );
  }

  if (
    statusChanged &&
    (a.status === "done" || a.status === "blocked" || a.status === "cancelled")
  ) {
    for (const d of input.dependents) {
      if (d.status === "done" || d.status === "cancelled") continue;
      tell(
        d.ownerMembershipId,
        `Dependency ${label(a)} is now ${STATUS[a.status]}; your task "${d.title.slice(0, 50)}" waits on it.`,
      );
    }
  }
  return [...notices].map(([membershipId, summary]) => ({
    membershipId,
    summary,
  }));
};
