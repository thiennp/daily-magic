import type { ProjectTaskDisplayStatus } from "@/features/projects/tasks/projectTaskDisplayStatus";

const ENDED_WITH_REPORT: ReadonlySet<ProjectTaskDisplayStatus> = new Set([
  "done",
  "failed",
  "stopped",
  "timed_out",
  "stalled",
]);

/** 7bd7b9ae: every ended run has a report, not only Done ones. */
export const shouldShowTaskOpenReport = (
  status: ProjectTaskDisplayStatus,
): boolean => ENDED_WITH_REPORT.has(status);
