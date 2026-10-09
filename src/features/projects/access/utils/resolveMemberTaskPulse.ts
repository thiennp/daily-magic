import { PROJECT_B2B_SILENCE_NOTIFY_MS } from "@/lib/projects/acl/messaging/projectMessage.constants";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

const OPEN_STATUSES: ReadonlySet<ProjectTaskRecord["status"]> = new Set([
  "queued",
  "planned",
  "in_progress",
  "blocked",
]);

export type AwcMemberTaskPulse =
  | { readonly kind: "idle" }
  | {
      readonly kind: "working";
      readonly openCount: number;
      readonly lastUpdateMs: number;
    }
  | {
      readonly kind: "quiet";
      readonly taskId: string;
      readonly taskTitle: string;
      readonly quietMinutes: number;
    };

/** A live run's heartbeat counts as activity; updated_at alone would not. */
const lastActivityMs = (task: ProjectTaskRecord): number =>
  Math.max(
    Date.parse(task.updatedAt),
    task.runHeartbeatAt ? Date.parse(task.runHeartbeatAt) : 0,
  );

/**
 * What the owner sees under a bot: quiet = an in-progress task with no update
 * past the server's silence window (the seat may be busy and miss wakes).
 */
export const resolveMemberTaskPulse = (
  records: readonly ProjectTaskRecord[],
  membershipId: string,
  nowMs: number,
  quietMs: number = PROJECT_B2B_SILENCE_NOTIFY_MS,
): AwcMemberTaskPulse => {
  const open = records.filter(
    (task) =>
      task.ownerMembershipId === membershipId && OPEN_STATUSES.has(task.status),
  );
  if (open.length === 0) return { kind: "idle" };

  const stale = open
    .filter((task) => task.status === "in_progress")
    .filter((task) => nowMs - lastActivityMs(task) >= quietMs)
    .sort((a, b) => lastActivityMs(a) - lastActivityMs(b))[0];
  if (stale !== undefined) {
    return {
      kind: "quiet",
      taskId: stale.id,
      taskTitle: stale.title,
      quietMinutes: Math.floor((nowMs - lastActivityMs(stale)) / 60_000),
    };
  }
  return {
    kind: "working",
    openCount: open.length,
    lastUpdateMs: Math.max(...open.map(lastActivityMs)),
  };
};

export type AwcTaskOwnerPulse = {
  readonly membershipId: string;
  readonly name: string;
  readonly pulse: AwcMemberTaskPulse;
};

/** Read-only team view: every seat that owns an open task, quiet ones first. */
export const summarizeTaskOwnerPulses = (
  records: readonly ProjectTaskRecord[],
  nowMs: number,
): readonly AwcTaskOwnerPulse[] => {
  const names = new Map<string, string>();
  for (const task of records) {
    if (task.ownerMembershipId !== null && OPEN_STATUSES.has(task.status)) {
      names.set(task.ownerMembershipId, task.ownerDisplayName ?? "Assistant");
    }
  }
  return [...names]
    .map(([membershipId, name]) => ({
      membershipId,
      name,
      pulse: resolveMemberTaskPulse(records, membershipId, nowMs),
    }))
    .sort(
      (a, b) =>
        Number(b.pulse.kind === "quiet") - Number(a.pulse.kind === "quiet"),
    );
};
