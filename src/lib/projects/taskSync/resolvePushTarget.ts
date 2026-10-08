import { randomUUID } from "node:crypto";

import { loadLinkByTask } from "@/lib/projects/taskSync/taskExternalLinkQueries";
import { reserveTaskLink } from "@/lib/projects/taskSync/taskExternalLinkReservation";
import type { TaskExternalLink } from "@/lib/projects/taskSync/taskSync.types";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

export type PushTarget = {
  readonly link: TaskExternalLink | null;
  readonly createId: string;
  /** This call reserved the link row (delete it if issueCreate fails). */
  readonly reserved: boolean;
};

/** Existing link, or a fresh client-generated id with its link row reserved. */
export const resolvePushTarget = async (
  task: ProjectTaskRecord,
): Promise<PushTarget | null> => {
  const link = await loadLinkByTask(task.id, "linear");
  if (link !== null) {
    return { link, createId: link.externalId, reserved: false };
  }
  const createId = randomUUID();
  const reserved = await reserveTaskLink({
    projectId: task.projectId,
    provider: "linear",
    taskId: task.id,
    externalId: createId,
  });
  return reserved ? { link: null, createId, reserved: true } : null;
};
