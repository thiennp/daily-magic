import { decideLinearPull } from "@/lib/projects/taskSync/decideLinearPull";
import { hashTaskSyncFields } from "@/lib/projects/taskSync/hashTaskSyncFields";
import { setLinkHash } from "@/lib/projects/taskSync/taskExternalLinkQueries";
import { recordTaskSyncResult } from "@/lib/projects/taskSync/taskSyncSettingsQueries";
import type {
  TaskExternalLink,
  TaskSyncFields,
} from "@/lib/projects/taskSync/taskSync.types";
import { applyExternalProjectTaskChange } from "@/lib/projects/tasks/applyExternalProjectTaskChange";
import { loadProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecordReadQueries";

/** Linked issue changed in Linear: loop guard, then apply to the AW task. */
export const applyLinearPull = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly link: TaskExternalLink;
  readonly pulled: TaskSyncFields;
  readonly labelsKnown: boolean;
}): Promise<string> => {
  const { projectId, link } = input;
  const current = await loadProjectTaskRecord({
    projectId,
    taskId: link.taskId,
  });
  if (current === null) return "task_missing";
  const decision = decideLinearPull({
    pulled: input.pulled,
    labelsKnown: input.labelsKnown,
    current,
    lastSyncedHash: link.lastSyncedHash,
  });
  if (!decision.apply) return "unchanged";
  const applied = await applyExternalProjectTaskChange({
    projectId,
    taskId: link.taskId,
    actorUserId: input.ownerUserId,
    actorLabel: "Linear",
    change: decision.fields,
  });
  const error = applied.ok ? null : `pull_${applied.code}`;
  if (applied.ok) {
    await setLinkHash(
      link.taskId,
      "linear",
      hashTaskSyncFields(decision.fields),
    );
  }
  await recordTaskSyncResult({ projectId, provider: "linear", error });
  return applied.ok ? "applied" : applied.code;
};
