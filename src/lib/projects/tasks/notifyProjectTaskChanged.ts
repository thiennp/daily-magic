import { insertProjectMessageWithDeliveries } from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries";
import { PROJECT_MESSAGE_KIND_TASK_UPDATED } from "@/lib/projects/acl/messaging/projectTaskMessageKind.constant";
import { buildProjectTaskChangeNotices } from "@/lib/projects/tasks/buildProjectTaskChangeNotices";
import {
  listProjectTaskDependents,
  loadActiveProjectTaskNoticeSeats,
} from "@/lib/projects/tasks/projectTaskNoticeQueries";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

/**
 * After a task changed (status / owner / priority), tell the agents and bots
 * it affects with a task.updated message (stored + woken like any normal kind).
 * Best effort: never throws into the task write. Returns how many were told.
 */
export const notifyProjectTaskChanged = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly actorMembershipId: string | null;
  readonly actorLabel: string;
  readonly before: ProjectTaskRecord;
  readonly after: ProjectTaskRecord;
}): Promise<number> => {
  try {
    const finished =
      input.before.status !== input.after.status &&
      (input.after.status === "done" || input.after.status === "blocked");
    const dependents = finished
      ? await listProjectTaskDependents({
          projectId: input.projectId,
          taskId: input.after.id,
        })
      : [];
    const notices = buildProjectTaskChangeNotices({
      before: input.before,
      after: input.after,
      actorLabel: input.actorLabel,
      actorMembershipId: input.actorMembershipId,
      dependents,
    });
    const seats = await loadActiveProjectTaskNoticeSeats({
      projectId: input.projectId,
      ids: notices.map((n) => n.membershipId),
    });
    const told: string[] = [];
    for (const notice of notices) {
      const seat = seats.get(notice.membershipId);
      if (seat === undefined) continue;
      await insertProjectMessageWithDeliveries({
        projectId: input.projectId,
        senderMembershipId: input.actorMembershipId,
        senderProjectDisplayName: input.actorLabel,
        senderUserId: input.actorUserId,
        toMembershipId: seat.id,
        toUserId: seat.userId,
        toTeamLabel: null,
        toProjectDisplayName: seat.projectDisplayName,
        kind: PROJECT_MESSAGE_KIND_TASK_UPDATED,
        summary: notice.summary,
        refsJson: "{}",
        recipients: [{ id: seat.id, user_id: seat.userId }],
      });
      told.push(seat.id);
    }
    return told.length;
  } catch (error: unknown) {
    console.error("project task change notify failed", {
      taskId: input.after.id,
      error: error instanceof Error ? error.message : "notify_failed",
    });
    return 0;
  }
};
