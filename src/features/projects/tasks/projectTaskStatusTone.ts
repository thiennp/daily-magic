import type { ProjectTaskUiStatus } from "@/features/projects/sync/projectSync.types";

/** Sand-safe chip tones — awc status soft tokens only (no purple / rogue hex). */
export type ProjectTaskChipTone = "ok" | "info" | "warn" | "err" | "muted";

export const projectTaskStatusTone = (
  status: ProjectTaskUiStatus,
): ProjectTaskChipTone => {
  if (status === "done") return "ok";
  if (status === "running") return "info";
  if (status === "queued") return "warn";
  if (status === "failed") return "err";
  return "muted";
};

export const PROJECT_TASK_TONE_CLASS: Record<ProjectTaskChipTone, string> = {
  ok: "border-awc-border bg-awc-ok-soft text-awc-fg dark:border-gray-700 dark:bg-white/10 dark:text-gray-100",
  info: "border-awc-border bg-awc-info-soft text-awc-fg dark:border-gray-700 dark:bg-white/10 dark:text-gray-100",
  warn: "border-awc-border bg-awc-warn-soft text-awc-fg dark:border-gray-700 dark:bg-white/10 dark:text-gray-100",
  err: "border-awc-border bg-awc-bad-soft text-awc-fg dark:border-gray-700 dark:bg-white/10 dark:text-gray-100",
  muted:
    "border-awc-border bg-awc-tile-2 text-awc-fg-muted dark:border-gray-700 dark:bg-white/5 dark:text-gray-300",
};
