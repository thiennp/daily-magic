import type { ProjectTaskChipTone } from "@/features/projects/tasks/projectTaskStatusTone";
import type { ProjectTaskStatus } from "@/lib/projects/tasks/projectTaskTools.constant";

/** Record status → existing sand chip tones (no new palette). */
export const projectTaskRecordTone = (
  status: ProjectTaskStatus,
): ProjectTaskChipTone => {
  if (status === "done") return "ok";
  if (status === "in_progress") return "info";
  if (status === "blocked") return "err";
  if (status === "queued") return "warn";
  return "muted";
};
