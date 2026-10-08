import { decideDescriptionPush } from "@/lib/projects/taskSync/decideDescriptionPush";
import { hashTaskSyncFields } from "@/lib/projects/taskSync/hashTaskSyncFields";
import { linearTaskSyncProvider } from "@/lib/projects/taskSync/linearTaskSyncProvider";
import { upsertTaskLink } from "@/lib/projects/taskSync/taskExternalLinkQueries";
import { resolvePushTarget } from "@/lib/projects/taskSync/resolvePushTarget";
import { deleteReservedLink } from "@/lib/projects/taskSync/taskExternalLinkReservation";
import {
  loadTaskSyncSettings,
  recordTaskSyncResult,
} from "@/lib/projects/taskSync/taskSyncSettingsQueries";
import type { TaskSyncFields } from "@/lib/projects/taskSync/taskSync.types";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

const PROVIDER = "linear" as const;

export const taskSyncFieldsOf = (task: ProjectTaskRecord): TaskSyncFields => ({
  title: task.title,
  status: task.status,
  priority: task.priority,
  description: task.description,
});

export type PushTaskOutcome = "pushed" | "unchanged" | "skipped" | "failed";

const errorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : "push_failed";

/**
 * AW -> Linear for one task. Best effort: never throws (callers sit inside a
 * task write); failures are logged without secrets and stored as last_error.
 * A new issue gets a client-generated id and its link row is reserved BEFORE
 * issueCreate, so the webhook for it always finds the link; a failed create
 * deletes the reservation.
 */
export const pushTaskToLinear = async (
  task: ProjectTaskRecord,
): Promise<PushTaskOutcome> => {
  const projectId = task.projectId;
  const fail = async (message: string): Promise<PushTaskOutcome> => {
    console.error("task sync push failed", { taskId: task.id, message });
    await recordTaskSyncResult({
      projectId,
      provider: PROVIDER,
      error: message.slice(0, 200),
    }).catch(() => undefined);
    return "failed";
  };
  try {
    const settings = await loadTaskSyncSettings(projectId, PROVIDER);
    if (
      settings === null ||
      !settings.enabled ||
      settings.externalTeamId === null
    ) {
      return "skipped";
    }
    const fields = taskSyncFieldsOf(task);
    const hash = hashTaskSyncFields(fields);
    const target = await resolvePushTarget(task);
    if (target === null) return "skipped";
    const { link } = target;
    if (link !== null && link.lastSyncedHash === hash) return "unchanged";
    try {
      // An empty identifier marks a reserved link whose issue is not created yet.
      const existing = link !== null && link.identifier !== "" ? link : null;
      const description = decideDescriptionPush({
        clippedDescriptionHash: existing?.clippedDescriptionHash ?? null,
        description: task.description,
      });
      const ref = await linearTaskSyncProvider.pushTask({
        projectId,
        teamId: settings.externalTeamId,
        fields,
        existing,
        createId: target.createId,
        sendDescription: description.send,
      });
      await upsertTaskLink({
        projectId,
        provider: PROVIDER,
        taskId: task.id,
        externalId: ref.externalId,
        identifier: ref.identifier,
        url: ref.url,
        hash,
        clippedDescriptionHash: description.nextClippedHash,
      });
      await recordTaskSyncResult({
        projectId,
        provider: PROVIDER,
        error: null,
      });
      return "pushed";
    } catch (error: unknown) {
      if (target.reserved) {
        await deleteReservedLink(task.id, PROVIDER, target.createId).catch(
          () => undefined,
        );
      }
      return await fail(errorMessage(error));
    }
  } catch (error: unknown) {
    return fail(errorMessage(error));
  }
};
