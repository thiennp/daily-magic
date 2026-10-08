import { hashTaskSyncFields } from "@/lib/projects/taskSync/hashTaskSyncFields";
import { linearTaskSyncProvider } from "@/lib/projects/taskSync/linearTaskSyncProvider";
import {
  loadLinkByTask,
  upsertTaskLink,
} from "@/lib/projects/taskSync/taskExternalLinkQueries";
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

/**
 * AW -> Linear for one task. Best effort: never throws (callers sit inside a
 * task write); failures are logged without secrets and stored as last_error.
 */
export const pushTaskToLinear = async (
  task: ProjectTaskRecord,
): Promise<PushTaskOutcome> => {
  try {
    const settings = await loadTaskSyncSettings(task.projectId, PROVIDER);
    if (
      settings === null ||
      !settings.enabled ||
      settings.externalTeamId === null
    ) {
      return "skipped";
    }
    const fields = taskSyncFieldsOf(task);
    const hash = hashTaskSyncFields(fields);
    const link = await loadLinkByTask(task.id, PROVIDER);
    if (link !== null && link.lastSyncedHash === hash) return "unchanged";
    try {
      const ref = await linearTaskSyncProvider.pushTask({
        projectId: task.projectId,
        teamId: settings.externalTeamId,
        fields,
        existing: link,
      });
      await upsertTaskLink({
        projectId: task.projectId,
        provider: PROVIDER,
        taskId: task.id,
        externalId: ref.externalId,
        identifier: ref.identifier,
        url: ref.url,
        hash,
      });
      await recordTaskSyncResult({
        projectId: task.projectId,
        provider: PROVIDER,
        error: null,
      });
      return "pushed";
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "push_failed";
      console.error("task sync push failed", { taskId: task.id, message });
      await recordTaskSyncResult({
        projectId: task.projectId,
        provider: PROVIDER,
        error: message.slice(0, 200),
      });
      return "failed";
    }
  } catch (error: unknown) {
    console.error("task sync push failed", {
      taskId: task.id,
      message: error instanceof Error ? error.message : "push_failed",
    });
    return "failed";
  }
};
