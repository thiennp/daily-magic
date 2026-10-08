import {
  PROJECT_TASK_RECORD_STAGE_LABEL as STAGE,
  PROJECT_TASK_RECORDS_COPY as C,
} from "@/features/projects/tasks/projectTaskRecordsCopy.constant";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";
import { PROJECT_TASK_STAGES } from "@/lib/projects/tasks/projectTaskTools.constant";

export type ProjectTaskRecordTimelineEntry = {
  readonly label: string;
  readonly at: string;
};

/** Dated moments of a record, oldest first (missing times are skipped). */
export const buildProjectTaskRecordTimeline = (
  task: ProjectTaskRecord,
): readonly ProjectTaskRecordTimelineEntry[] => {
  const stages = PROJECT_TASK_STAGES.map((stage) => ({
    label: `Stage: ${STAGE[stage]}`,
    at: task.stageTimes[stage] ?? null,
  }));
  return [
    { label: C.timelineCreated, at: task.createdAt },
    { label: C.timelineStarted, at: task.startedAt },
    { label: C.timelineBlocked, at: task.blockedAt },
    ...stages,
    { label: C.timelineDone, at: task.doneAt },
    { label: C.timelineUpdated, at: task.updatedAt },
  ]
    .flatMap((e) => (e.at === null ? [] : [{ label: e.label, at: e.at }]))
    .sort((a, b) => Date.parse(a.at) - Date.parse(b.at));
};
