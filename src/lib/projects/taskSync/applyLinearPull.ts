import { decideLinearPull } from "@/lib/projects/taskSync/decideLinearPull";
import {
  hashDescription,
  hashTaskSyncFields,
} from "@/lib/projects/taskSync/hashTaskSyncFields";
import { setLinkHash } from "@/lib/projects/taskSync/taskExternalLinkQueries";
import { setLinkClippedDescriptionHash } from "@/lib/projects/taskSync/taskExternalLinkReservation";
import { recordTaskSyncResult } from "@/lib/projects/taskSync/taskSyncSettingsQueries";
import type {
  TaskExternalLink,
  TaskSyncFields,
} from "@/lib/projects/taskSync/taskSync.types";
import { applyExternalProjectTaskChange } from "@/lib/projects/tasks/applyExternalProjectTaskChange";
import { loadProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecordReadQueries";

/** Linear issue changed: loop guard, then apply to the linked AW task. */
export const applyLinearPull = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly link: TaskExternalLink;
  readonly pulled: TaskSyncFields;
  readonly labelsKnown: boolean;
  readonly descriptionClipped: boolean;
}): Promise<string> => {
  const { projectId, link } = input;
  // issueCreate still in flight: the push itself carries these fields.
  if (link.identifier === "") return "pending";
  const current = await loadProjectTaskRecord({
    projectId,
    taskId: link.taskId,
  });
  if (current === null) return "task_missing";
  // Clipped baseline = AW text when first seen; kept while an AW edit is unpushed.
  const clippedHash = input.descriptionClipped
    ? (link.clippedDescriptionHash ?? hashDescription(current.description))
    : null;
  if (clippedHash !== link.clippedDescriptionHash) {
    await setLinkClippedDescriptionHash(link.taskId, "linear", clippedHash);
  }
  const decision = decideLinearPull({
    pulled: input.pulled,
    labelsKnown: input.labelsKnown,
    descriptionClipped: input.descriptionClipped,
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
